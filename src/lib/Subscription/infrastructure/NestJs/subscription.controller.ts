import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { SubscriptionCreatePayload } from './Validations';

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
    // throw new Error('Method not implemented.');
    return this.subscriptionCreate.run({
      paymentId: subscription.paymentId,
      planId: subscription.planId,
      teams: [subscription.team],
      user: subscription.user,
    });
  }
}
