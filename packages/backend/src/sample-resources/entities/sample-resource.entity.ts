import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { SampleResource as ISampleResource} from "@interface/sample-resource";

/**
 * サンプルリソースを表すクラス
 */
@Entity()
export class SampleResource implements ISampleResource {
    /**
     * ID
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 名前
     */
    @Column()
    name: string;

    /**
     * 作成日（ORMが自動生成）
     */
    @CreateDateColumn({
        update: false,
    })
    createdAt: Date;

    /**
     * 更新日（ORMが自動生成）
     */
    @UpdateDateColumn()
    updatedAt: Date;

    /**
     * コンストラクタ
     * @param partial 部分型
     */
    constructor(partial?: Partial<SampleResource>) {
        Object.assign(this, partial);
    }
}
