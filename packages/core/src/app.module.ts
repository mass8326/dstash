import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NodeModule } from "./controllers/node/node.module";
import { StashModule } from "./controllers/stash/stash.module";
import config from "./mikro-orm.config";

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
    }),
    StashModule,
    NodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
