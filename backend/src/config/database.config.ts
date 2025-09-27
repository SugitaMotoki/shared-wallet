import { registerAs } from "@nestjs/config";
import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

/**
 * データベース設定を提供する関数
 * 環境変数からデータベース接続情報を取得し、TypeORMの設定オブジェクトを返す
 * @returns TypeORMの設定オブジェクト
 */
export default registerAs(
  "database",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "expense_sharing_app",
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
  }),
);
