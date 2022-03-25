import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import config from "../mikro-orm.config";
import { DatabaseService } from "./database.service";

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  providers: [DatabaseService],
})
export class DatabaseModule {}
