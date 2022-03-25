import { Migration } from "@mikro-orm/migrations";

export class Migration20220324063757 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `node` add column `path` text not null;");
    this.addSql("alter table `node` add column `ext` text null;");
    this.addSql("create unique index `node_path_unique` on `node` (`path`);");
  }
}
