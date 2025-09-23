# Shared Wallet

複数人での使用を想定した割り勘+家計簿アプリケーション

## プロジェクト構成

このプロジェクトはpnpm workspaceを使用したモノレポ構成になっています。

```
expense-sharing-app/
├── frontend/          # Nuxt.js フロントエンドアプリケーション
├── backend/           # NestJS バックエンドAPIサーバー
├── shared/            # 共通型定義・インターフェース
├── package.json       # ルートレベルのworkspace設定
└── README.md
```

## 技術スタック

- **フロントエンド**: Nuxt.js 3, NuxtUI, TypeScript
- **バックエンド**: NestJS, TypeORM, PostgreSQL, TypeScript
- **共通**: pnpm workspace, Biome (リンター・フォーマッター)

## 開発環境のセットアップ

### 前提条件

- Node.js 18以上
- pnpm 8以上

### インストール

```bash
# 依存関係のインストール
pnpm install

# 共通型定義のビルド
pnpm --filter shared build
```

### 開発用コマンド

```bash
# 全プロジェクトの開発サーバー起動
pnpm dev

# 全プロジェクトのビルド
pnpm build

# 全プロジェクトのテスト実行
pnpm test

# 全プロジェクトのリント実行
pnpm lint

# 全プロジェクトのフォーマット実行
pnpm format
```

## 共通型定義

`shared`パッケージには、フロントエンドとバックエンドで共有する型定義が含まれています：

- **User**: ユーザー関連の型定義
- **Group**: グループ関連の型定義
- **Payment**: 支払い関連の型定義
- **Category**: カテゴリ関連の型定義
- **Dashboard**: ダッシュボード関連の型定義
- **API**: API共通の型定義




