
import { UserDal } from "./userDal";
import { UserEntity } from "./userEntity";

export interface UserBus {
  updateOne(id: string, entity: UserEntity): Promise<UserEntity>;
  findOne(id: string): Promise<UserEntity[]>;
  createOne(entity: UserEntity): Promise<UserEntity>;
  deleteOne(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOneByEmail(email: string): Promise<UserEntity[]>;
  findAllByPages(page: number): Promise<any>;
  findAllByGroup(groupId: string): Promise<UserEntity[]>;
}

export class UserBusConc implements UserBus {
  private db: UserDal;
  constructor(db: UserDal) {
    this.db = db;
  }
  findOne(id: string): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }

  async findAllByGroup(groupId: string): Promise<UserEntity[]> {
    const result = await this.db.findAllByGroup(groupId);
    return result;
  }
  async createOne(entity: UserEntity): Promise<UserEntity> {
    
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<UserEntity> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<UserEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
  async findOneByEmail(id: string): Promise<UserEntity[]> {
    const result = await this.db.findOneByEmail(id);
    return result;
  }
  async updateOne(id: string, entity: UserEntity): Promise<UserEntity> {
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
