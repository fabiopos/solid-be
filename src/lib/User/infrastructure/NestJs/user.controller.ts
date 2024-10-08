import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserValidate } from '../../application/UserValidate';
import {
  NewUserValidatePayload,
  UpdateUserFindParams,
  UpdateUserPayload,
} from './UserRequestPayload';
import { CreateUserPayload } from './CreateUserPayload';
import { UserCreate } from '../../application/UserCreate';
import { UserAlreadyExistsError } from '../../domain/UserAlreadyExistsError';
import { UserUpdate } from '../../application/UserUpdate';
import { UserUpdateInput } from '../../domain/UserSchema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    // @Inject('SubscriptionGetAll') private readonly subscriptionGetAll: SubscriptionGetAll,
    // @Inject('SubscriptionGetOneById') private readonly subscriptionGetOneById: SubscriptionGetOneById,
    // @Inject('SubscriptionEdit') private readonly subscriptionEdit: SubscriptionEdit,
    // @Inject('SubscriptionDelete') private readonly subscriptionDelete: SubscriptionDelete,
    @Inject('UserValidate')
    private readonly userValidate: UserValidate,
    @Inject('UserCreate')
    private readonly userCreate: UserCreate,
    @Inject('UserUpdate')
    private readonly userUpdate: UserUpdate,
  ) {}

  @Post('/validate')
  async validate(@Body() payload: NewUserValidatePayload) {
    try {
      const result = await this.userValidate.run({ email: payload.email });
      return {
        isValid: result,
        message: result
          ? `Email ${payload.email} is valid for new account`
          : `Email ${payload.email} is not valid for new account`,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiCreatedResponse({ status: '3XX', description: 'Creates a new user' })
  @Post()
  async create(@Body() payload: CreateUserPayload) {
    try {
      return this.userCreate.run({ ...payload });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError)
        throw new NotFoundException(error.message);
      return error;
    }
  }

  @ApiCreatedResponse({ status: '3XX', description: 'Creates a new user' })
  @Patch(':id')
  async updateUser(
    @Param() params: UpdateUserFindParams,
    @Body() payload: UpdateUserPayload,
  ) {
    const { id } = params;

    const input = UserUpdateInput.make(payload);

    return this.userUpdate.run(id, input);
  }
}
