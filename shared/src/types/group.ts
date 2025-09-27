/**
 * グループ関連の型定義
 */

import type { User } from './user';

/**
 * グループ情報を表すインターフェース
 */
export interface Group {
  /** グループID */
  id: number;
  /** グループ名 */
  name: string;
  /** グループの説明 */
  description?: string;
  /** 作成者のユーザーID */
  createdBy: number;
  /** グループメンバー一覧 */
  members: GroupMember[];
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
}

/**
 * グループメンバー情報を表すインターフェース
 */
export interface GroupMember {
  /** メンバーID */
  id: number;
  /** グループID */
  groupId: number;
  /** ユーザーID */
  userId: number;
  /** ユーザー情報 */
  user: User;
  /** メンバーの役割 */
  role: 'admin' | 'member';
  /** 参加日時 */
  joinedAt: Date;
}

/**
 * グループ作成時のリクエストデータ
 */
export interface CreateGroupRequest {
  /** グループ名 */
  name: string;
  /** グループの説明 */
  description?: string;
}

/**
 * グループ更新時のリクエストデータ
 */
export interface UpdateGroupRequest {
  /** グループ名 */
  name?: string;
  /** グループの説明 */
  description?: string;
}

/**
 * グループメンバー招待時のリクエストデータ
 */
export interface InviteMemberRequest {
  /** 招待するユーザー名 */
  username: string;
  /** メンバーの役割 */
  role?: 'admin' | 'member';
}
