import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UserValidate } from '../../application/UserValidate';
import {
  DeleteUserFindParams,
  NewUserValidatePayload,
  UpdateUserFindParams,
  UpdateUserPayload,
} from './UserRequestPayload';
import { CreateUserPayload } from './CreateUserPayload';
import { UserCreate } from '../../application/UserCreate';
import { UserAlreadyExistsError } from '../../domain/UserAlreadyExistsError';
import { UserUpdate } from '../../application/UserUpdate';
import { UserUpdateInput } from '../../domain/UserSchema';
import { UserDelete } from '../../application/UserDelete';
import { UserGetAll } from '../../application/UserGetAll';
import { Token } from '../../../../lib/auth/domain/auth-login.schema';
import { JwtAuthGuard } from '../../../../lib/auth/infraestructure/nestjs/jwt-auth.guard';

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
    @Inject('UserDelete')
    private readonly userDelete: UserDelete,
    @Inject('UserGetAll')
    private readonly userGetAll: UserGetAll,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() request: Request & { user: Token }) {
    // implement user get all by sub
    const { user } = request;
    return this.userGetAll.run(user.subscriptionId);
  }

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

  @Delete(':id')
  async deleteUser(@Param() params: DeleteUserFindParams) {
    // validate current user is admin
    // validate user to delete belongs to current subscription
    return this.userDelete.run(params.id);
  }
}
