import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { SubscriptionCreatePayload } from './Validations';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';
import { UserAlreadyExistsError } from '@/lib/User/domain/UserAlreadyExistsError';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionGetAll } from '../../application/SubscriptionGetAll/SubscriptionGetAll';

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
  ) {}

  @Get()
  async getAllSubscriptions() {
    return this.subscriptionGetAll.run();
  }

  @Patch()
  async createFull(@Body() subscription: SubscriptionCreatePayload) {
    try {
      const result = await this.subscriptionCreate.run({
        paymentId: subscription.paymentId,
        planId: subscription.planId,
        teams: [subscription.team],
        user: subscription.user,
      });
      return result;
    } catch (error) {
      if (error instanceof PlanNotFoundError)
        throw new NotFoundException(error.message);

      if (error instanceof UserAlreadyExistsError)
        throw new NotFoundException(error.message);

      throw error;
    }
  }
}
