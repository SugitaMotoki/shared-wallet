/**
 * 支払い関連の型定義
 */

import type { User } from './user';
import type { Category } from './category';

/**
 * 支払い情報を表すインターフェース
 */
export interface Payment {
  /** 支払いID */
  id: number;
  /** グループID */
  groupId: number;
  /** 支払いタイトル */
  title: string;
  /** 支払い金額 */
  amount: number;
  /** 支払い日 */
  paymentDate: Date;
  /** カテゴリID */
  categoryId?: number;
  /** カテゴリ情報 */
  category?: Category;
  /** 支払いタイプ（収入・支出） */
  type: 'income' | 'expense';
  /** 作成者のユーザーID */
  createdBy: number;
  /** 精算済みフラグ */
  isSettled: boolean;
  /** 支払い配分一覧 */
  allocations: PaymentAllocation[];
  /** 実際の支払い一覧 */
  actuals: PaymentActual[];
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * 支払い配分情報を表すインターフェース（誰がどれだけ支払うべきか）
 */
export interface PaymentAllocation {
  /** 配分ID */
  id: number;
  /** 支払いID */
  paymentId: number;
  /** ユーザーID */
  userId: number;
  /** ユーザー情報 */
  user: User;
  /** 配分金額 */
  amount: number;
  /** 配分割合（%） */
  percentage?: number;
}

/**
 * 実際の支払い情報を表すインターフェース（実際に誰がどれだけ支払ったか）
 */
export interface PaymentActual {
  /** 実際の支払いID */
  id: number;
  /** 支払いID */
  paymentId: number;
  /** ユーザーID */
  userId: number;
  /** ユーザー情報 */
  user: User;
  /** 実際の支払い金額 */
  amount: number;
}

/**
 * 支払い作成時のリクエストデータ
 */
export interface CreatePaymentRequest {
  /** 支払いタイトル */
  title: string;
  /** 支払い金額 */
  amount: number;
  /** 支払い日 */
  paymentDate: string; // ISO 8601 format
  /** カテゴリID */
  categoryId?: number;
  /** 支払いタイプ */
  type: 'income' | 'expense';
  /** 支払い配分一覧 */
  allocations: CreatePaymentAllocationRequest[];
  /** 実際の支払い一覧 */
  actuals: CreatePaymentActualRequest[];
}

/**
 * 支払い配分作成時のリクエストデータ
 */
export interface CreatePaymentAllocationRequest {
  /** ユーザーID */
  userId: number;
  /** 配分金額 */
  amount: number;
  /** 配分割合（%） */
  percentage?: number;
}

/**
 * 実際の支払い作成時のリクエストデータ
 */
export interface CreatePaymentActualRequest {
  /** ユーザーID */
  userId: number;
  /** 実際の支払い金額 */
  amount: number;
}

/**
 * 支払い更新時のリクエストデータ
 */
export interface UpdatePaymentRequest {
  /** 支払いタイトル */
  title?: string;
  /** 支払い金額 */
  amount?: number;
  /** 支払い日 */
  paymentDate?: string; // ISO 8601 format
  /** カテゴリID */
  categoryId?: number;
  /** 支払いタイプ */
  type?: 'income' | 'expense';
  /** 支払い配分一覧 */
  allocations?: CreatePaymentAllocationRequest[];
  /** 実際の支払い一覧 */
  actuals?: CreatePaymentActualRequest[];
}

/**
 * 支払い一覧取得時のクエリパラメータ
 */
export interface PaymentListQuery {
  /** 開始日 */
  startDate?: string;
  /** 終了日 */
  endDate?: string;
  /** カテゴリID */
  categoryId?: number;
  /** 支払いタイプ */
  type?: 'income' | 'expense';
  /** 精算状況フィルタ */
  settled?: boolean;
  /** ページ番号 */
  page?: number;
  /** 1ページあたりの件数 */
  limit?: number;
}
