import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
export default class UserRepository extends Repository<User>{

  public async findByName(name: String): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      }
    })

    return user;
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      }
    })

    return user;
  }

  public async findByEmail(email: String): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      }
    })

    return user;
  }

}
