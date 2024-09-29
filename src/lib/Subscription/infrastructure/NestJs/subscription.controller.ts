import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { SubscriptionCreatePayload, SubscriptionParams } from './Validations';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';
import { UserAlreadyExistsError } from '@/lib/User/domain/UserAlreadyExistsError';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionGetAll } from '../../application/SubscriptionGetAll/SubscriptionGetAll';
import { SubscriptionFind } from '../../application/SubscriptionFind/SubscriptionFind';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(
    // @Inject('SubscriptionGetOneById') private readonly subscriptionGetOneById: SubscriptionGetOneById,
    // @Inject('SubscriptionEdit') private readonly subscriptionEdit: SubscriptionEdit,
    // @Inject('SubscriptionDelete') private readonly subscriptionDelete: SubscriptionDelete,
    @Inject('SubscriptionGetAll')
    private readonly subscriptionGetAll: SubscriptionGetAll,
    @Inject('SubscriptionCreate')
    private readonly subscriptionCreate: SubscriptionCreate,

    @Inject('SubscriptionFind')
    private readonly subscriptionFind: SubscriptionFind,
  ) {}

  @Get()
  async getAllSubscriptions() {
    return this.subscriptionGetAll.run();
  }

  @Get(':id')
  async findSubscription(@Param() params: SubscriptionParams) {
    const { id } = params;
    const result = await this.subscriptionFind.run(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Post()
  async createFull(@Body() subscription: SubscriptionCreatePayload) {
    try {
      return await this.subscriptionCreate.run({
        paymentId: subscription.paymentId,
        planId: subscription.planId,
        teams: [subscription.team],
        user: subscription.user,
      });
    } catch (error) {
      if (error instanceof PlanNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof UserAlreadyExistsError)
        throw new NotFoundException(error.message);

      throw error;
    }
  }
}
