import { PartialType } from '@nestjs/swagger';
import {
  CreateSettingDto,
  CreateSettingMissedTrainingDto,
  CreateSettingShelfTemplateDto,
  CreateSettingTimeSleepDto,
} from './create-setting.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}

export class UpdateSettingMissedTrainingDto extends PartialType(
  CreateSettingMissedTrainingDto,
) {}

export class UpdateSettingShelfTemplateDto extends PartialType(
  CreateSettingShelfTemplateDto,
) {}

export class UpdateSettingTimeSleepDto extends PartialType(
  CreateSettingTimeSleepDto,
) {}
// export class UpdateSettingTimeSleepDto extends PartialType(
//   CreateSettingTimeSleepDto,
// ) {}
