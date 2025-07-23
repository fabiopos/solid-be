import { SubscriptionCreate } from './SubscriptionCreate';
import { add, format } from 'date-fns';

import { TeamRepository } from '../../../../lib/team/domain/TeamRepository';
import { SubscriptionRepository } from '../../domain/subscription.repository';
import { PlanRepository } from '../../../../lib/plan/domain/plan.repository';
import { UserRepository } from '../../../../lib/user/domain/UserRepository';
import { DocumentType } from '../../../../shared/enums/player.enum';
import { Plan } from '../../../../lib/plan/domain/plan';
import { PlanRepositoryMock } from '../../../../mocks/PlanRepositoryMock';
import { UserRepositoryMock } from '../../../../mocks/UserRepositoryMock';
import { TeamRepositoryMock } from '../../../../mocks/TeamRepositoryMock';
import { SubscriptionRepositoryMock } from '../../../../mocks/SubscriptionRepositoryMock';
import { SubscriptionCreateResponse } from '../../domain/subscription.schema';
import { CreateSubscriptionDto } from '../../../../shared/dto/create-subscription.dto';
import { SubscriptionFeatureRepository } from '../../../../lib/subscription-feature/domain/subscription-feature-repository';
import { SubscriptionFeatureRepositoryMock } from '../../../../mocks/SubscriptionFeatureRepository';
import { FeatureRepository } from '../../../../lib/feature/domain/feature.repository';
import { FeatureRepositoryMock } from '../../../../mocks/FeatureRepository';
import { RoleEnum } from '../../../../shared/enums/role.enum';

describe('SubscriptionCreate tests', () => {
  let subscriptionRepository: SubscriptionRepository;
  let teamRepository: TeamRepository;
  let planRepository: PlanRepository;
  let userRepository: UserRepository;
  let subscriptionFeatureRepository: SubscriptionFeatureRepository;
  let featureRepository: FeatureRepository;

  let createdSubscriptionDto: CreateSubscriptionDto;

  const freePlanInstance: Plan = Plan.create({
    id: '123456',
    createdAt: new Date(),
    name: 'FREE',
    active: true,
    price: 0,
    description: 'description',
    currency: 'COP',
    interval: 'month',
    intervalCount: 12,
  });

  beforeEach(() => {
    subscriptionRepository = new SubscriptionRepositoryMock();
    teamRepository = new TeamRepositoryMock();
    planRepository = new PlanRepositoryMock();
    userRepository = new UserRepositoryMock();
    subscriptionFeatureRepository = new SubscriptionFeatureRepositoryMock();
    featureRepository = new FeatureRepositoryMock();
    createdSubscriptionDto = {
      paymentId: '',
      planId: 'FREE',
      teams: [
        {
          active: true,
          name: 'team',
          logoUrl: 'logoUrl',
          hasSubscription: true,
        },
      ],
      user: {
        email: 'email@email.com',
        active: true,
        password: '123456',
        firstName: 'Jonh',
        lastName: 'Doe',
        roleId: RoleEnum.USER,
        documentNumber: '',
        documentType: DocumentType.CC,
        policy: true,
      },
    };
  });

  it('should be return an Instance of SubscriptionCreateResponse', async () => {
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    jest.spyOn(userRepository, 'getOneByEmail').mockResolvedValue(null);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    const result = await subService.run(createdSubscriptionDto);

    const expectedStartDate = format(new Date(), 'yyyy-MM-dd');
    const expectedEndDate = format(
      add(new Date(), {
        [freePlanInstance.interval]: freePlanInstance.intervalCount,
      }),
      'yyyy-MM-dd',
    );
    expect(format(result.startDate, 'yyyy-MM-dd')).toBe(expectedStartDate);
    expect(format(result.endDate, 'yyyy-MM-dd')).toBe(expectedEndDate);
    expect(result.users.length).toBe(1);
    expect(result.teams.length).toBe(1);
    expect(result instanceof SubscriptionCreateResponse).toBe(true);
  });

  it('should throw if no-user-policy', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    jest.spyOn(userRepository, 'getOneByEmail').mockResolvedValue(null);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    createdSubscriptionDto.user.policy = false;

    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });

  it('should throw if user exists', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });

  it('should throw if user has no email', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    createdSubscriptionDto.user.email = '';
    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });

  it('should throw if user has no firstName', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    createdSubscriptionDto.user.firstName = '';
    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });

  it('should throw if user has no lastName', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    createdSubscriptionDto.user.lastName = '';
    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });

  it('should throw if user has no password', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    createdSubscriptionDto.user.password = '';
    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });

  it('should throw if no-plan-id', () => {
    // Test code here
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
      subscriptionFeatureRepository,
      featureRepository,
    );

    createdSubscriptionDto.planId = '';
    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });
});
