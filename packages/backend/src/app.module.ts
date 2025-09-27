import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleResourcesModule } from "./sample-resources/sample-resources.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        ".env", // backend/の.envファイル（優先）
        join("..", "..", ".env"), // ルートの.envファイル
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env["HOSTNAME"],
      port: Number(process.env["DB_PORT"]),
      username: process.env["DB_USER"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_NAME"],
      autoLoadEntities: true,
      synchronize: true,
    }),
    SampleResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
