import AppError from "@shared/errors/AppError";
import path from 'path';
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  userId: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {

  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await userRepository.save(user);

    return user;
  }
}
