import { TicketDal } from "./ticketDal";
import { TicketEntity } from "./ticketEntity";

export interface TicketBus {
  updateOne(id: string, entity: TicketEntity): Promise<TicketEntity>;
  findOne(id: string): Promise<TicketEntity[]>;
  createOne(entity: TicketEntity): Promise<TicketEntity>;
  deleteOne(id: string): Promise<TicketEntity>;
  findAll(): Promise<TicketEntity[]>;
  findAllByPages(page: number): Promise<any>;
  findAllByGroup(groupId: string): Promise<TicketEntity[]>;
}

export class TicketBusConc implements TicketBus {
  private db: TicketDal;
  constructor(db: TicketDal) {
    this.db = db;
  }

  async findAllByGroup(groupId: string): Promise<TicketEntity[]> {
    const result = await this.db.findAllByGroup(groupId);
    return result;
  }
  async createOne(entity: TicketEntity): Promise<TicketEntity> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<TicketEntity> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<TicketEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
  async findOne(id: string): Promise<TicketEntity[]> {
    const result = await this.db.findOne(id);
    return result;
  }
  async updateOne(id: string, entity: TicketEntity): Promise<TicketEntity> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
  async findAllByPages(page: number): Promise<any> {
    let totalCount = 0;
    const rows = await this.db.findAllByPages(page);
    try {
      if (rows[0].totalCount) {
        totalCount = rows[0].totalCount;
      }
    } catch (ex: any) { }
    return { rows, totalCount, page: page };
  }
}
