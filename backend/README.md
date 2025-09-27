# 割り勘+家計簿アプリ - バックエンド

NestJSを使用した割り勘+家計簿アプリケーションのバックエンドAPIサーバーです。

## 技術スタック

- **フレームワーク**: NestJS
- **データベース**: PostgreSQL
- **ORM**: TypeORM
- **認証**: JWT
- **言語**: TypeScript
- **リンター/フォーマッター**: Biome

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーして、必要に応じて値を変更してください。

```bash
cp .env.example .env
```

### 3. データベースの起動

Docker Composeを使用してPostgreSQLを起動します：

```bash
# ルートディレクトリから実行
pnpm run db:up

# または直接実行
docker compose up -d postgres
```

### 4. アプリケーションの起動

```bash
# 開発モード（ホットリロード）
pnpm run start:dev

# 通常モード
pnpm run start

# 本番モード
pnpm run start:prod
```

## 利用可能なスクリプト

### 開発用

```bash
# アプリケーション起動
pnpm run start:dev

# ビルド
pnpm run build

# リント
pnpm run lint

# フォーマット
pnpm run format
```

### テスト

```bash
# 単体テスト
pnpm run test

# テスト（ウォッチモード）
pnpm run test:watch

# E2Eテスト（データベースが必要）
pnpm run test:e2e

# カバレッジ
pnpm run test:cov
```

### データベース

```bash
# PostgreSQL起動
pnpm run db:up

# PostgreSQL停止
pnpm run db:down

# PostgreSQLログ確認
pnpm run db:logs
```

## プロジェクト構成

```
src/
├── config/           # 設定ファイル
│   ├── app.config.ts
│   └── database.config.ts
├── app.controller.ts # メインコントローラー
├── app.module.ts     # メインモジュール
├── app.service.ts    # メインサービス
└── main.ts          # エントリーポイント
```

## API エンドポイント

現在利用可能なエンドポイント：

- `GET /` - ヘルスチェック

## 環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| `PORT` | アプリケーションポート | `4000` |
| `NODE_ENV` | 実行環境 | `development` |
| `DB_HOST` | データベースホスト | `localhost` |
| `DB_PORT` | データベースポート | `5432` |
| `DB_USERNAME` | データベースユーザー名 | `postgres` |
| `DB_PASSWORD` | データベースパスワード | `password` |
| `DB_DATABASE` | データベース名 | `expense_sharing_app` |
| `JWT_SECRET` | JWT署名用シークレット | `your-secret-key-change-in-production` |
| `JWT_EXPIRES_IN` | JWTの有効期限 | `24h` |

## 開発ガイドライン

### コード品質

- タスク完了前に必ず以下を実行してください：
  - `pnpm run lint`
  - `pnpm run format`
  - `pnpm run build`
  - `pnpm run test`

### コメント

- JSDocに準拠したコメントを記述してください
- 関数・メソッドには必ずコメントを作成してください

### リソース作成

- NestJSのリソースを作成する際は `nest g resource <リソース名>` を使用してください
- リソース名には必ず英単語の複数形を使用してください

## トラブルシューティング

### データベース接続エラー

1. PostgreSQLが起動していることを確認してください：
   ```bash
   pnpm run db:logs
   ```

2. 環境変数が正しく設定されていることを確認してください

3. データベースが作成されていることを確認してください

### ポートが使用中のエラー

`.env`ファイルの`PORT`を変更するか、使用中のプロセスを停止してください。