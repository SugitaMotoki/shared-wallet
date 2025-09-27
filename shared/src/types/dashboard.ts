/**
 * ダッシュボード関連の型定義
 */

/**
 * ダッシュボードサマリー情報を表すインターフェース
 */
export interface DashboardSummary {
  /** 総収入額 */
  totalIncome: number;
  /** 総支出額 */
  totalExpense: number;
  /** 純額（収入 - 支出） */
  netAmount: number;
  /** 未精算金額 */
  unsettledAmount: number;
  /** カテゴリ別収支内訳 */
  categoryBreakdown: CategorySummary[];
  /** ユーザー別収支内訳 */
  userBreakdown: UserSummary[];
}

/**
 * カテゴリ別サマリー情報を表すインターフェース
 */
export interface CategorySummary {
  /** カテゴリID */
  categoryId: number;
  /** カテゴリ名 */
  categoryName: string;
  /** カテゴリの色 */
  categoryColor?: string;
  /** 金額 */
  amount: number;
  /** 全体に占める割合（%） */
  percentage: number;
}

/**
 * ユーザー別サマリー情報を表すインターフェース
 */
export interface UserSummary {
  /** ユーザーID */
  userId: number;
  /** ユーザー名 */
  username: string;
  /** 表示名 */
  displayName?: string;
  /** 実際に支払った総額 */
  totalPaid: number;
  /** 支払うべき総額 */
  totalOwed: number;
  /** 収支バランス（支払った額 - 支払うべき額） */
  balance: number;
}

/**
 * トレンド分析データを表すインターフェース
 */
export interface TrendData {
  /** 期間（YYYY-MM-DD形式） */
  period: string;
  /** 収入額 */
  income: number;
  /** 支出額 */
  expense: number;
  /** 純額 */
  netAmount: number;
}

/**
 * ダッシュボード取得時のクエリパラメータ
 */
export interface DashboardQuery {
  /** 開始日 */
  startDate?: string;
  /** 終了日 */
  endDate?: string;
  /** 期間の粒度 */
  granularity?: 'daily' | 'monthly' | 'yearly';
}
