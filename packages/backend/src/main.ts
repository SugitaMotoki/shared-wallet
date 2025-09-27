import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined || value == "") {
    throw new Error(`Environment variable "${key}" is not set`);
  }
  return value;
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const HOSTNAME: string = getEnv("HOSTNAME");
  const FRONT_PORT: string = getEnv("FRONT_PORT");
  const BACK_PORT: string = getEnv("BACK_PORT");

  app.enableCors({
    origin: [
      `http://${HOSTNAME}:${FRONT_PORT}`,
      `https://${HOSTNAME}:${FRONT_PORT}`,
    ],
  });

  await app.listen(BACK_PORT);
}
bootstrap().catch((error) => console.error(error));
