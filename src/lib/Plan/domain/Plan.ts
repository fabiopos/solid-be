export class Plan {
  id: string;
  createdAt: Date;
  name: string;
  active: boolean;
  price: number;
  description: string;
  currency: string;
  interval: string;
  intervalCount: number;

  static create(dto: any) {
    const plan = new Plan();
    plan.id = dto.id;
    plan.createdAt = dto.createdAt;
    plan.name = dto.name;
    plan.active = dto.active;
    plan.price = dto.price;
    plan.description = dto.description;
    plan.currency = dto.currency;
    plan.interval = dto.interval;
    plan.intervalCount = dto.intervalCount;
    return plan;
  }
}
