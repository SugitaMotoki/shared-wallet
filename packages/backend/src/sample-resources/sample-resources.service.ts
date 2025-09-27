import { Injectable } from "@nestjs/common";
import { CreateSampleResourceDto } from "./dto/create-sample-resource.dto";
import { UpdateSampleResourceDto } from "./dto/update-sample-resource.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { SampleResource } from "./entities/sample-resource.entity";
import { InjectRepository } from "@nestjs/typeorm";

/**
 * サンプルリソースに関するサービス
 */
@Injectable()
export class SampleResourcesService {
  /**
   * コンストラクタ
   * @param sampleResourcesRepository
   */
  constructor(
    @InjectRepository(SampleResource)
    private readonly sampleResourcesRepository: Repository<SampleResource>,
  ) {}

  /**
   * サンプルリソースを作成するメソッド
   * @param createSampleResourceDto
   * @returns 作成したサンプルリソース
   */
  async create(
    createSampleResourceDto: CreateSampleResourceDto,
  ): Promise<Readonly<SampleResource>> {
    const sampleResource = new SampleResource({ ...createSampleResourceDto });
    await this.sampleResourcesRepository.save(sampleResource);
    return sampleResource;
  }

  /**
   * 全てのサンプルリソースを取得するメソッド
   * @returns 全てのサンプルリソース
   */
  findAll(): Promise<Readonly<SampleResource[]>> {
    return this.sampleResourcesRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
  }

  /**
   * 指定したIDのサンプルリソースを取得するメソッド
   * @param id
   * @returns 指定したIDのサンプルリソース（なければnull）
   */
  findByIdOrNull(id: number): Promise<Readonly<SampleResource> | null> {
    return this.sampleResourcesRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 指定したIDのサンプルリソースを更新するメソッド
   * @param id
   * @param updateSampleResourceDto
   * @returns 更新結果
   */
  update(
    id: number,
    updateSampleResourceDto: UpdateSampleResourceDto,
  ): Promise<Readonly<UpdateResult>> {
    const sampleResource = new SampleResource({ ...updateSampleResourceDto });
    return this.sampleResourcesRepository.update(id, sampleResource);
  }

  /**
   * 指定したIDのサンプルリソースを削除するメソッド
   * @param id
   * @returns
   */
  remove(id: number): Promise<Readonly<DeleteResult>> {
    return this.sampleResourcesRepository.delete(id);
  }
}
