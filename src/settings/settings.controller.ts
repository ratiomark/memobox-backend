import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import {
  UpdateSettingDto,
  UpdateSettingMissedTrainingDto,
  UpdateSettingShelfTemplateDto,
} from './dto/update-setting.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '@/common/decorators';
import { MissedTrainingValue, Prisma, User } from '@prisma/client';

@ApiTags('Settings')
@Controller({
  path: 'settings',
  version: '1',
})
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  getAllSettings(@GetCurrentUser('id') userId: User['id']) {
    return this.settingsService.getAllSettings(userId);
  }
  @Patch('missed-training')
  updateMissedTraining(
    @GetCurrentUser('id') userId: User['id'],
    @Body() missedTrainingValue: UpdateSettingMissedTrainingDto,
  ) {
    console.log('missedTrainingValue', missedTrainingValue);
    return this.settingsService.updateMissedTrainingValue(
      userId,
      missedTrainingValue.missedTraining!,
    );
  }

  @Patch('shelf-template')
  updateShelfTemplate(
    @GetCurrentUser('id') userId: User['id'],
    @Body() shelfTemplate: UpdateSettingShelfTemplateDto,
  ) {
    console.log('missedTrainingValue', shelfTemplate);
    return this.settingsService.updateShelfTemplate(
      userId,
      shelfTemplate.shelfTemplate as unknown as Prisma.InputJsonArray,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    // return this.settingsService.update(+id, updateSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.settingsService.remove(+id);
  }
}
