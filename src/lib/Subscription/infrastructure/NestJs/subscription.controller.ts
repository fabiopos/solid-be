import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { SubscriptionCreatePayload } from './Validations';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';
import { UserAlreadyExistsError } from '@/lib/User/domain/UserAlreadyExistsError';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    // @Inject('SubscriptionGetAll') private readonly subscriptionGetAll: SubscriptionGetAll,
    // @Inject('SubscriptionGetOneById') private readonly subscriptionGetOneById: SubscriptionGetOneById,
    // @Inject('SubscriptionEdit') private readonly subscriptionEdit: SubscriptionEdit,
    // @Inject('SubscriptionDelete') private readonly subscriptionDelete: SubscriptionDelete,
    @Inject('SubscriptionCreate')
    private readonly subscriptionCreate: SubscriptionCreate,
  ) {}

  @Post()
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
