import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import config from "../mikro-orm.config";
import { DatabaseResolver } from "./database.resolver";
import { DatabaseService } from "./database.service";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      // Entities for production/development
      entities: undefined,
      entitiesTs: undefined,
      autoLoadEntities: true,
    }),
  ],
  providers: [DatabaseService, DatabaseResolver],
  exports: [DatabaseResolver],
})
export class DatabaseModule {}
