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
import { MatchAparitionCreate } from '../../application/MatchAparitionCreate/MatchAparitionCreate';
import { MatchAparitionGet } from '../../application/MatchAparitionGet/MatchAparitionGet';
import { MatchAparitionUpdate } from '../../application/MatchAparitionUpdate/MatchAparitionUpdate';
import { MatchAparitionDelete } from '../../application/MatchAparitionDelete/MatchAparitionDelete';
import {
  MatchAparitionCreatePayload,
  MatchAparitionDeleteParams,
  MatchAparitionUpdateParams,
  MatchAparitionUpdatePayload,
} from './Validations';
import { EmptyMatchAparition } from '../../domain/matchAparition.schema';

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
