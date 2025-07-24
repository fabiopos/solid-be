import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../../../utils/encription';
import { AuthSchemaType, Token } from '../../domain/auth-login.schema';
import { UserFindBy } from '../../../../lib/user/application/UserFindBy';
import { InvalidCredentialsError } from '../../domain/invalid-credentials-error';
import { TypeOrmPlayerRepository } from 'src/lib/player/infrastructure/type-orm/type-orm-player.repository';
import * as TW from 'twilio';
import { TypeOrmTwoFactorRepository } from '../../infraestructure/type-orm/twofactor.repository';
//import { QueryTeamInvitePayload } from 'src/lib/team/infrastructure/NestJs/Validations';
import { inviteDataSchema, numberTaken } from '../../domain/invite-data.schema';
import { TypeOrmTeamRepository } from 'src/lib/team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { QueryTeamInvitePayload } from 'src/lib/team/infrastructure/NestJs/Validations';

export class AuthLogin {
  constructor(
    private userService: UserFindBy,
    private jwtService: JwtService,
    private playerRepository: TypeOrmPlayerRepository,
    private twoFactorRepository: TypeOrmTwoFactorRepository,
    private teamRepository: TypeOrmTeamRepository,
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

  async createTwoFactorAuth(email: string, phone: string, teamId: string) {
    try {
      const playerByEmail = await this.playerRepository.getOneByEmail(email);
      const playerByPhone =
        await this.playerRepository.getOneByPhoneNumber(phone);

      // change this flag to true to deploy
      if (playerByEmail || !playerByPhone)
        return { success: false, message: 'Player already exists' };

      const accountSid = process.env.NEXT_TW_ACCOUNT_SID;
      const authToken = process.env.NEXT_TW_AUTH_TOKEN;
      const serviceId = process.env.NEXT_TW_SERVICE_SID;
      const client = TW(accountSid, authToken);

      const response = await client.verify.v2
        .services(serviceId)
        .verifications.create({ to: phone, channel: 'sms' });

      console.log(teamId, 'teamId');
      this.twoFactorRepository.create({
        status: response.status,
        id: response.sid,
        phone,
        teamId,
        email,
      });

      return { sid: response.sid, status: response.status };
    } catch (error: any) {
      console.log('Error creating 2FA', error);
      return { success: false, message: 'Failed to create 2FA verification' };
    }
  }

  async verifyTwoFactorAuth(phone: string, code: string) {
    try {
      const accountSid = process.env.NEXT_TW_ACCOUNT_SID;
      const authToken = process.env.NEXT_TW_AUTH_TOKEN;
      const serviceId = process.env.NEXT_TW_SERVICE_SID;
      const client = TW(accountSid, authToken);

      const response = await client.verify.v2
        .services(serviceId)
        .verificationChecks.create({
          code,
          to: phone,
        });

      this.twoFactorRepository.updateStatus({
        id: response.sid,
        status: response.status,
      });

      if (response.status === 'approved') {
        return { success: true, message: 'Verification successful' };
      } else {
        return { success: false, message: 'Verification failed' };
      }
    } catch (error: any) {
      console.log('Failed to verify 2FA verification', error);
      return { success: false, message: 'Failed to verify 2FA verification' };
    }
  }

  async getTwoFactorDeps(params: QueryTeamInvitePayload) {
    //  Team, email, phone, numbersTaken
    const { sid, tid } = params;
    const twoFactor = await this.twoFactorRepository.getOneById(sid);

    if (!twoFactor) return { success: false, message: 'Two Factor not found' };

    const team = await this.teamRepository.getOneById(tid);

    if (!team) return { success: false, message: 'No team found' };

    const players = await this.playerRepository.getAllByTeam(twoFactor.teamId);

    return inviteDataSchema.make({
      email: twoFactor.email,
      numbersTaken: players.map((x) =>
        numberTaken.make({
          name: `${x.firstName} ${x.lastName}`,
          pid: x.id!,
          shirtNumber: x.shirtNumber,
          shirtName: x.shirtName,
        }),
      ),
      phone: twoFactor.phone,
      team: {
        name: team.name,
        teamId: twoFactor.teamId,
        logoUrl: team.logoUrl,
      },
    });
  }
}
