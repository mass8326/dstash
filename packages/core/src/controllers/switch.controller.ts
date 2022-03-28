import { applyDecorators } from "@nestjs/common";
import { Target } from "../config/config.build";
import { Get } from "@nestjs/common";
import { HandleIPCMessageWithResult } from "nestjs-electron-ipc-transport";

export function GetSwitch(path: string) {
  return applyDecorators(
    process.env.BUILD_TARGET === Target.Desktop
      ? HandleIPCMessageWithResult(path + ".get")
      : Get(path)
  );
}
