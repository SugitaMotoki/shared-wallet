/**
 * カテゴリ関連の型定義
 */

/**
 * カテゴリ情報を表すインターフェース
 */
export interface Category {
  /** カテゴリID */
  id: number;
  /** グループID */
  groupId: number;
  /** カテゴリ名 */
  name: string;
  /** カテゴリの色（HEXカラーコード） */
  color?: string;
  /** 作成日時 */
  createdAt: Date;
}

/**
 * カテゴリ作成時のリクエストデータ
 */
export interface CreateCategoryRequest {
  /** カテゴリ名 */
  name: string;
  /** カテゴリの色（HEXカラーコード） */
  color?: string;
}

/**
 * カテゴリ更新時のリクエストデータ
 */
export interface UpdateCategoryRequest {
  /** カテゴリ名 */
  name?: string;
  /** カテゴリの色（HEXカラーコード） */
  color?: string;
}
