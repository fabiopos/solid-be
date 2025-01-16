import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatchAparitionCreate } from '../../application/match-aparition-create/match-aparition.create';
import { MatchAparitionGet } from '../../application/match-aparition-get/match-aparition.get';
import { MatchAparitionUpdate } from '../../application/match-aparition-update/match-aparition.update';
import { MatchAparitionDelete } from '../../application/match-aparition-delete/match-aparition.delete';
import {
  MatchAparitionCreatePayload,
  MatchAparitionDeleteParams,
  MatchAparitionUpdateParams,
  MatchAparitionUpdatePayload,
} from './validations';
import { EmptyMatchAparition } from '../../domain/match-aparition.schema';

@ApiTags('match-aparition')
@Controller('match-aparition')
export class MatchAparitionController {
  constructor(
    @Inject('MatchAparitionGet')
    private readonly matchAparitionGet: MatchAparitionGet,
    @Inject('MatchAparitionCreate')
    private readonly matchAparitionCreate: MatchAparitionCreate,
    @Inject('MatchAparitionUpdate')
    private readonly matchAparitionUpdate: MatchAparitionUpdate,
    @Inject('MatchAparitionDelete')
    private readonly matchAparitionDelete: MatchAparitionDelete,
  ) {}

  @Get()
  getAll() {
    return this.matchAparitionGet.getAll();
  }

  @Get(':matchId')
  getByMatchId(@Param() params: { matchId: string }) {
    return this.matchAparitionGet.getAllByMatchId(params.matchId);
  }

  @Post()
  createMatchAparition(@Body() payload: MatchAparitionCreatePayload) {
    return this.matchAparitionCreate.run(
      EmptyMatchAparition.make({ ...payload }),
    );
  }

  @Patch(':matchAparitionId')
  updateMatchAparition(
    @Param() params: MatchAparitionUpdateParams,
    @Body() payload: MatchAparitionUpdatePayload,
  ) {
    return this.matchAparitionUpdate.run(
      params.matchAparitionId,
      EmptyMatchAparition.make({ ...payload }),
    );
  }

  @Delete(':matchAparitionId')
  deleteMatchAparition(@Param() params: MatchAparitionDeleteParams) {
    return this.matchAparitionDelete.run(params.matchAparitionId);
  }
}
