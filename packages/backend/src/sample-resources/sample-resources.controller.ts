import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SampleResourcesService } from "./sample-resources.service";
import { CreateSampleResourceDto } from "./dto/create-sample-resource.dto";
import { UpdateSampleResourceDto } from "./dto/update-sample-resource.dto";

/**
 * サンプルリソースに関するコントローラ
 */
@Controller("sample-resources")
export class SampleResourcesController {
  /**
   * コンストラクタ
   * @param sampleResourcesService サンプルリソースに関するサービス
   */
  constructor(
    private readonly sampleResourcesService: SampleResourcesService,
  ) {}

  @Post()
  create(@Body() createSampleResourceDto: CreateSampleResourceDto) {
    return this.sampleResourcesService.create(createSampleResourceDto);
  }

  @Get()
  findAll() {
    return this.sampleResourcesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sampleResourcesService.findByIdOrNull(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSampleResourceDto: UpdateSampleResourceDto,
  ) {
    return this.sampleResourcesService.update(+id, updateSampleResourceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sampleResourcesService.remove(+id);
  }
}
