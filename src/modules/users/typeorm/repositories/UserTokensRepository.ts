import { randomUUID } from "crypto";
import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export default class UserTokensRepository extends Repository<UserToken>{

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      }
    })

    return userToken;
  }

  public async generateToken(user_id: number): Promise<UserToken> {
    const userToken = this.create({
      user_id,
      token: await randomUUID()
    })

    await this.save(userToken);

    return userToken;
  }

}
