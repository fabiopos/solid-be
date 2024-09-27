import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { SubscriptionCreate } from './SubscriptionCreate';
import { PlanRepository } from '@/lib/Plan/domain/PlanRepository';
import { UserRepository } from '@/lib/User/domain/UserRepository';
import { DocumentType } from '@/shared/enums/playerEnums';
import { Plan } from '@/lib/Plan/domain/Plan';
import { PlanRepositoryMock } from '@/mocks/PlanRepositoryMock';
import { UserRepositoryMock } from '@/mocks/UserRepositoryMock';
import { TeamRepositoryMock } from '@/mocks/TeamRepositoryMock';
import { SubscriptionRepositoryMock } from '@/mocks/SubscriptionRepositoryMock';
import { add, format } from 'date-fns';
import { FulfilledSubscription } from '../../domain/SubscriptionSchema';
import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';

describe('SubscriptionCreate tests', () => {
  let subscriptionRepository: SubscriptionRepository;
  let teamRepository: TeamRepository;
  let planRepository: PlanRepository;
  let userRepository: UserRepository;

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
        roleId: '',
        documentNumber: '',
        documentType: DocumentType.CC,
        policy: true,
      },
    };
  });

  it('should be return an Instance of Subscription', async () => {
    jest
      .spyOn(planRepository, 'getOneById')
      .mockResolvedValue(freePlanInstance);

    jest.spyOn(userRepository, 'getOneByEmail').mockResolvedValue(null);

    const subService = new SubscriptionCreate(
      subscriptionRepository,
      teamRepository,
      planRepository,
      userRepository,
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
    expect(result instanceof FulfilledSubscription).toBe(true);
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
    );

    createdSubscriptionDto.planId = '';
    expect(
      async () => await subService.run(createdSubscriptionDto),
    ).rejects.toThrow();
  });
});
