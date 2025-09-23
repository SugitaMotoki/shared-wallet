# 設計ドキュメント

## 概要

割り勘+家計簿アプリケーションは、モノレポ構成でフロントエンド（Nuxt.js）、バックエンド（NestJS）、データベース（PostgreSQL）を組み合わせたフルスタックWebアプリケーションです。複数ユーザーでの支払い管理と精算機能を提供します。

## アーキテクチャ

### 全体構成

```
shared-wallet/
├── frontend/          # Nuxt.js アプリケーション (ポート: 3000)
├── backend/           # NestJS API サーバー (ポート: 4000)
├── shared/            # 共通型定義・インターフェース
├── package.json       # ルートレベルのpnpm workspace設定
└── README.md（既存）
```

### 技術スタック

**フロントエンド:**
- Nuxt.js 3 (Vue.js 3ベース)
- NuxtUI (UIコンポーネントライブラリ)
- TypeScript
- Biome (リンター・フォーマッター)

**バックエンド:**
- NestJS (Node.js フレームワーク)
- TypeORM (ORM)
- PostgreSQL (データベース)
- Docker & Docker Compose
- TypeScript
- Biome (リンター・フォーマッター)

**共通:**
- pnpm (パッケージマネージャー)
- TypeScript型定義の共有

## コンポーネントとインターフェース

### データベース設計

#### Usersテーブル
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  display_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Groupsテーブル
```sql
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Group_Membersテーブル
```sql
CREATE TABLE group_members (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_id, user_id)
);
```

#### Categoriesテーブル
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Paymentsテーブル
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  type VARCHAR(10) CHECK (type IN ('income', 'expense')),
  created_by INTEGER REFERENCES users(id),
  is_settled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Payment_Allocationsテーブル（誰がどれだけ支払うべきか）
```sql
CREATE TABLE payment_allocations (
  id SERIAL PRIMARY KEY,
  payment_id INTEGER REFERENCES payments(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  percentage DECIMAL(5,2)
);
```

#### Payment_Actualsテーブル（実際に誰がどれだけ支払ったか）
```sql
CREATE TABLE payment_actuals (
  id SERIAL PRIMARY KEY,
  payment_id INTEGER REFERENCES payments(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL
);
```

### API設計

#### 認証エンドポイント
- `POST /auth/login` - ユーザーログイン
- `POST /auth/logout` - ユーザーログアウト
- `GET /auth/profile` - ユーザープロフィール取得

#### ユーザー管理エンドポイント
- `GET /users/me` - 自分のプロフィール取得
- `PUT /users/me` - プロフィール更新

#### グループ管理エンドポイント
- `GET /groups` - 参加グループ一覧取得
- `POST /groups` - グループ作成
- `GET /groups/:groupId` - グループ詳細取得
- `PUT /groups/:groupId` - グループ更新
- `DELETE /groups/:groupId` - グループ削除
- `POST /groups/:groupId/members` - メンバー招待
- `DELETE /groups/:groupId/members/:userId` - メンバー削除

#### 支払い管理エンドポイント
- `GET /groups/:groupId/payments` - 支払い一覧取得
- `POST /groups/:groupId/payments` - 支払い作成
- `GET /groups/:groupId/payments/:paymentId` - 支払い詳細取得
- `PUT /groups/:groupId/payments/:paymentId` - 支払い更新
- `DELETE /groups/:groupId/payments/:paymentId` - 支払い削除
- `PUT /groups/:groupId/payments/:paymentId/settle` - 支払い精算
- `PUT /groups/:groupId/payments/settle-all` - 一括精算

#### カテゴリ管理エンドポイント
- `GET /groups/:groupId/categories` - カテゴリ一覧取得
- `POST /groups/:groupId/categories` - カテゴリ作成
- `PUT /groups/:groupId/categories/:categoryId` - カテゴリ更新
- `DELETE /groups/:groupId/categories/:categoryId` - カテゴリ削除

#### ダッシュボードエンドポイント
- `GET /groups/:groupId/dashboard/summary` - 収支サマリー取得
- `GET /groups/:groupId/dashboard/categories` - カテゴリ別収支取得
- `GET /groups/:groupId/dashboard/trends` - トレンド分析取得

### フロントエンド設計

#### ページ構成
```
pages/
├── index.vue                    # トップページ
├── login.vue                    # ログインページ
├── mypage.vue                   # マイページ
├── groups/
│   ├── index.vue               # グループ一覧
│   ├── create.vue              # グループ作成
│   └── [groupId]/
│       ├── index.vue           # グループ詳細
│       ├── dashboard.vue       # ダッシュボード
│       ├── payments/
│       │   ├── index.vue       # 支払い一覧
│       │   ├── create.vue      # 支払い作成
│       │   ├── [paymentId].vue # 支払い詳細
│       │   ├── [date].vue      # 日毎支払い一覧
│       │   ├── [month].vue     # 月毎支払い一覧
│       │   └── [year].vue      # 年毎支払い一覧
│       └── categories/
│           ├── index.vue       # カテゴリ一覧
│           ├── create.vue      # カテゴリ作成
│           └── [categoryId].vue # カテゴリ詳細
```

#### コンポーネント設計
```
components/
├── layout/
│   ├── Header.vue              # ヘッダーナビゲーション
│   ├── Breadcrumb.vue          # パンくずリスト
│   └── Sidebar.vue             # サイドバー（モバイル用）
├── forms/
│   ├── LoginForm.vue           # ログインフォーム
│   ├── GroupForm.vue           # グループ作成・編集フォーム
│   ├── PaymentForm.vue         # 支払い作成・編集フォーム
│   └── CategoryForm.vue        # カテゴリ作成・編集フォーム
├── lists/
│   ├── GroupList.vue           # グループ一覧
│   ├── PaymentList.vue         # 支払い一覧
│   └── CategoryList.vue        # カテゴリ一覧
├── cards/
│   ├── PaymentCard.vue         # 支払い情報カード
│   ├── GroupCard.vue           # グループ情報カード
│   └── SummaryCard.vue         # サマリー情報カード
└── charts/
    ├── PieChart.vue            # 円グラフ（カテゴリ別）
    ├── BarChart.vue            # 棒グラフ（期間別）
    └── LineChart.vue           # 線グラフ（トレンド）
```

## データモデル

### 共通型定義（shared/types/）

```typescript
// User関連
export interface User {
  id: number;
  username: string;
  email?: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Group関連
export interface Group {
  id: number;
  name: string;
  description?: string;
  createdBy: number;
  members: GroupMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupMember {
  id: number;
  groupId: number;
  userId: number;
  user: User;
  role: 'admin' | 'member';
  joinedAt: Date;
}

// Payment関連
export interface Payment {
  id: number;
  groupId: number;
  title: string;
  amount: number;
  paymentDate: Date;
  categoryId?: number;
  category?: Category;
  type: 'income' | 'expense';
  createdBy: number;
  isSettled: boolean;
  allocations: PaymentAllocation[];
  actuals: PaymentActual[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentAllocation {
  id: number;
  paymentId: number;
  userId: number;
  user: User;
  amount: number;
  percentage?: number;
}

export interface PaymentActual {
  id: number;
  paymentId: number;
  userId: number;
  user: User;
  amount: number;
}

// Category関連
export interface Category {
  id: number;
  groupId: number;
  name: string;
  color?: string;
  createdAt: Date;
}

// Dashboard関連
export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
  unsettledAmount: number;
  categoryBreakdown: CategorySummary[];
  userBreakdown: UserSummary[];
}

export interface CategorySummary {
  categoryId: number;
  categoryName: string;
  amount: number;
  percentage: number;
}

export interface UserSummary {
  userId: number;
  username: string;
  totalPaid: number;
  totalOwed: number;
  balance: number;
}
```

## エラーハンドリング

### バックエンドエラーハンドリング
- カスタム例外フィルターの実装
- HTTP ステータスコードの適切な使用
- エラーレスポンスの標準化

```typescript
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}
```

### フロントエンドエラーハンドリング
- API呼び出し時のエラーキャッチ
- ユーザーフレンドリーなエラーメッセージ表示
- ネットワークエラーの適切な処理

## テスト戦略

### バックエンドテスト
- **単体テスト**: サービス・リポジトリ層のロジックテスト
- **統合テスト**: API エンドポイントのテスト

### フロントエンドテスト
- **コンポーネントテスト**: Vue コンポーネントの単体テスト
- **統合テスト**: ページレベルの機能テスト

### テストツール
- Jest (単体・統合テスト)
- Vitest (フロントエンド単体テスト)

## セキュリティ考慮事項

### 認証・認可
- JWT トークンベースの認証
- パスワードのbcryptハッシュ化
- セッション管理とトークンの有効期限

### データ保護
- 環境変数による機密情報管理
- CORS設定の適切な構成
- SQLインジェクション対策（TypeORM使用）

### アクセス制御
- グループメンバーシップの検証
- リソースレベルの認可チェック
- 管理者権限の適切な管理

## パフォーマンス最適化

### データベース最適化
- 適切なインデックスの設定
- クエリの最適化
- ページネーション実装

### フロントエンド最適化
- コンポーネントの遅延読み込み
- 画像の最適化
- キャッシュ戦略の実装

### API最適化
- レスポンスデータの最小化
- 適切なHTTPキャッシュヘッダー
- データベースクエリの最適化
