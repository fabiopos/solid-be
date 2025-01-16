import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionCreate } from '../../application/subscription-create/SubscriptionCreate';
import { SubscriptionCreatePayload, SubscriptionParams } from './validations';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionGetAll } from '../../application/subscription-getall/subscription.getall';
import { SubscriptionFind } from '../../application/subscription-find/subscription.find';
import { JwtAuthGuard } from '@/lib/auth/infraestructure/nestjs/jwt-auth.guard';

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

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findSubscription(@Param() params: SubscriptionParams) {
    const { id } = params;
    const result = await this.subscriptionFind.run(id);
    if (!result) throw new NotFoundException();
    return result;
  }
  @ApiCreatedResponse({
    status: '2XX',
    description: 'Creates a new subscription',
  })
  @ApiBadRequestResponse({ description: 'Payload validation errors' })
  @ApiInternalServerErrorResponse({ description: 'Other errors' })
  @ApiNotFoundResponse({
    description: 'Returns if a resource cannot be found i.e: planId ',
  })
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
      throw error;
    }
  }
}
