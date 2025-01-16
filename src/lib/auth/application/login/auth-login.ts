import { comparePassword } from '@/utils/encription';
import { AuthSchemaType, Token } from '../../domain/auth-login.schema';
import { JwtService } from '@nestjs/jwt';
import { UserFindBy } from '@/lib/User/application/UserFindBy';
import { InvalidCredentialsError } from '../../domain/invalid-credentials-error';

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
      name: `${user.firstName} ${user.lastName}`,
      subscriptionId: user.subscriptionId,
    } as Token;
    const token = this.jwtService.sign(payload);

    const data = {
      user: payload,
      token,
    };

    return data;
  }
}
