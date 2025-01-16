import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FieldPositionGetAll } from '../../application/field-position-getall/field-position.getall';

@ApiTags('field-position')
@Controller('field-position')
export class FieldPositionController {
  constructor(
    @Inject('FieldPositionGetAll')
    private readonly fieldPositionGetAll: FieldPositionGetAll,
  ) {}

  @Get()
  async getAll() {
    return this.fieldPositionGetAll.run();
  }
}
