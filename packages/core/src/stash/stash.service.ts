import crypto from "crypto";
import { join, resolve } from "path";
import { Injectable } from "@nestjs/common";
import fs from "fs-extra";
import { Entry } from "../entities/entry/entry.entity";
import { EntryService } from "../entities/entry/entry.service";

@Injectable()
export class StashService {
  constructor(private entrySvc: EntryService) {}

  async consume() {
    const root = resolve(process.env.STASH_DIR ?? "sample");
    const dropoff = join(root, "dropoff");
    const stashed = join(root, "stashed");
    const files = await fs.readdir(dropoff);
    const success: Entry[] = [];
    const failure: [string, unknown][] = [];
    await Promise.all(
      files.map(async (name) => {
        try {
          const path = join(dropoff, name);
          const hash = crypto
            .createHash("sha256")
            .update(await fs.readFile(path))
            .digest("hex");
          const ext = name.split(".").pop();
          const arr = [...hash];
          const rename =
            `${arr.splice(0, 2).join("")}/` +
            `${arr.splice(0, 2).join("")}/` +
            `${arr.splice(0, 2).join("")}/` +
            `${arr.splice(0, 2).join("")}/` +
            `${arr.join("")}` +
            (ext ? `.${ext}` : "");
          const dest = join(stashed, rename);
          await fs.move(path, dest);
          success.push(new Entry(hash, rename, ext));
        } catch (err: any) {
          failure.push([name, err?.code ?? err]);
        }
      })
    );
    if (success.length) await this.entrySvc.write(success);
    if (failure.length) console.warn("Imports failed:", failure);
    return success;
  }
}
