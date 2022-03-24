import { Migration } from "@mikro-orm/migrations";

export class Migration20220322051306 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `node` (`hash` text not null, primary key (`hash`));"
    );
  }
}
