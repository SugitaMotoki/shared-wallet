import { Module } from "@nestjs/common";
import { SampleResourcesService } from "./sample-resources.service";
import { SampleResourcesController } from "./sample-resources.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SampleResource } from "./entities/sample-resource.entity";

/**
 * サンプルリソースに関するモジュール
 */
@Module({
  imports: [TypeOrmModule.forFeature([SampleResource])],
  controllers: [SampleResourcesController],
  providers: [SampleResourcesService],
  exports: [SampleResourcesService],
})
export class SampleResourcesModule {}
