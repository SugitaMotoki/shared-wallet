import { registerAs } from "@nestjs/config";

/**
 * アプリケーション設定を提供する関数
 * 環境変数からアプリケーション設定を取得し、設定オブジェクトを返す
 * @returns アプリケーション設定オブジェクト
 */
export default registerAs("app", () => ({
    port: Number.parseInt(process.env.PORT || "4000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
}));
