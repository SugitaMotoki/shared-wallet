/**
 * API関連の共通型定義
 */

/**
 * APIエラーレスポンスを表すインターフェース
 */
export interface ApiErrorResponse {
  /** HTTPステータスコード */
  statusCode: number;
  /** エラーメッセージ */
  message: string;
  /** エラータイプ */
  error: string;
  /** タイムスタンプ */
  timestamp: string;
  /** リクエストパス */
  path: string;
}

/**
 * ページネーション情報を表すインターフェース
 */
export interface PaginationInfo {
  /** 現在のページ番号 */
  page: number;
  /** 1ページあたりの件数 */
  limit: number;
  /** 総件数 */
  total: number;
  /** 総ページ数 */
  totalPages: number;
  /** 前のページが存在するか */
  hasPrevious: boolean;
  /** 次のページが存在するか */
  hasNext: boolean;
}

/**
 * ページネーション付きレスポンスを表すインターフェース
 */
export interface PaginatedResponse<T> {
  /** データ配列 */
  data: T[];
  /** ページネーション情報 */
  pagination: PaginationInfo;
}

/**
 * 成功レスポンスを表すインターフェース
 */
export interface SuccessResponse<T = any> {
  /** 成功フラグ */
  success: true;
  /** データ */
  data: T;
  /** メッセージ */
  message?: string;
}

/**
 * 基本的なCRUD操作の結果を表すインターフェース
 */
export interface CrudResult {
  /** 操作が成功したか */
  success: boolean;
  /** 影響を受けた行数 */
  affected?: number;
  /** メッセージ */
  message?: string;
}
