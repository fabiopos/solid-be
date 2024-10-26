import { comparePassword } from '@/utils/encription';
import { AuthSchemaType } from '../../domain/AuthLoginSchema';
import { JwtService } from '@nestjs/jwt';
import { UserFindBy } from '@/lib/User/application/UserFindBy';
import { InvalidCredentialsError } from '../../domain/InvalidCredentialsError';

export class AuthLogin {
  constructor(
    private userService: UserFindBy,
    private jwtService: JwtService,
  ) {}
  async run(credentials: AuthSchemaType) {
    const { password, email } = credentials;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new InvalidCredentialsError('Invalid credentials');
    const dbPassword = user.password;
    const isValidPwd = comparePassword(dbPassword, password);

    if (!isValidPwd) return new InvalidCredentialsError('Invalid credentials');

    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionId: user.subscriptionId,
    };
    const token = this.jwtService.sign(payload);

    console.log(payload);

    const data = {
      user: payload,
      token,
    };

    return data;
  }
}
