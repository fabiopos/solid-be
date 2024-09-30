import { comparePassword } from '@/utils/encription';
import { AuthSchemaType } from '../../domain/AuthLoginSchema';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import { UserFindBy } from '@/lib/User/application/UserFindBy';

export class AuthLogin {
  constructor(
    private userService: UserFindBy,
    private jwtService: JwtService,
  ) {}
  async run(credentials: AuthSchemaType) {
    const { password, email } = credentials;
    const user = await this.userService.findByEmail(email);
    const dbPassword = user.password;
    const isValidPwd = comparePassword(dbPassword, password);

    if (!isValidPwd) return new ForbiddenException();

    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionId: user.subscriptionId,
    };
    const token = this.jwtService.sign(payload);

    const data = {
      user: payload,
      token,
    };

    return data;
  }
}
