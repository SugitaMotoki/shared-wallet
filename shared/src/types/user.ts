/**
 * ユーザー関連の型定義
 */

/**
 * ユーザー情報を表すインターフェース
 */
export interface User {
  /** ユーザーID */
  id: number;
  /** ユーザー名（一意） */
  username: string;
  /** メールアドレス */
  email?: string;
  /** 表示名 */
  displayName?: string;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * ユーザー作成時のリクエストデータ
 */
export interface CreateUserRequest {
  /** ユーザー名 */
  username: string;
  /** パスワード */
  password: string;
  /** メールアドレス */
  email?: string;
  /** 表示名 */
  displayName?: string;
}

/**
 * ユーザー更新時のリクエストデータ
 */
export interface UpdateUserRequest {
  /** メールアドレス */
  email?: string;
  /** 表示名 */
  displayName?: string;
}

/**
 * ログイン時のリクエストデータ
 */
export interface LoginRequest {
  /** ユーザー名 */
  username: string;
  /** パスワード */
  password: string;
}

/**
 * ログイン時のレスポンスデータ
 */
export interface LoginResponse {
  /** JWTアクセストークン */
  accessToken: string;
  /** ユーザー情報 */
  user: User;
}
