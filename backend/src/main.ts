import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

/**
 * アプリケーションのブートストラップ関数
 * NestJSアプリケーションを作成し、設定されたポートでリスニングを開始する
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS設定
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("app.port") || 4000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
