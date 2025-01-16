import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsGetAll } from '../../application/settings.getall';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(
    @Inject('SettingsGetAll')
    private readonly settingsGetAll: SettingsGetAll,
  ) {}

  @Get()
  async getAll() {
    return this.settingsGetAll.getSettings();
  }
}
