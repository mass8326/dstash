import { Migration } from "@mikro-orm/migrations";

export class Migration20220401022108 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `tag` (`namespace` text not null, `name` text not null, primary key (`namespace`, `name`));"
    );

    this.addSql(
      "create table `entry` (`id` integer not null primary key autoincrement, `hash` text not null, `path` text not null, `ext` text null);"
    );
    this.addSql("create unique index `entry_hash_unique` on `entry` (`hash`);");
    this.addSql("create unique index `entry_path_unique` on `entry` (`path`);");

    this.addSql(
      "create table `entry_tags` (`entry_id` integer not null, `tag_namespace` text not null, `tag_name` text not null, constraint `entry_tags_entry_id_foreign` foreign key(`entry_id`) references `entry`(`id`) on delete cascade on update cascade, constraint `entry_tags_tag_namespace_tag_name_foreign` foreign key(`tag_namespace`, `tag_name`) references `tag`(`namespace`, `name`) on delete cascade on update cascade, primary key (`entry_id`, `tag_namespace`, `tag_name`));"
    );
    this.addSql(
      "create index `entry_tags_entry_id_index` on `entry_tags` (`entry_id`);"
    );
    this.addSql(
      "create index `entry_tags_tag_namespace_tag_name_index` on `entry_tags` (`tag_namespace`, `tag_name`);"
    );
  }
}
