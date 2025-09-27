import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleResourceDto } from './create-sample-resource.dto';

/**
 * サンプルリソース更新用DTO
 */
export class UpdateSampleResourceDto extends PartialType(CreateSampleResourceDto) {}
