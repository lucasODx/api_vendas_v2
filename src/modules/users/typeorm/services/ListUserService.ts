import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export default class ListUserService {

  public async execute(): Promise<User[]> {

    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find()

    return users;
  }

}
