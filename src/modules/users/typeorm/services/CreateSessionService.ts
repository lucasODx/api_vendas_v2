import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password', 401);
    }

    const confirmedPassword = await compare(password, user.password);

    if (!confirmedPassword) {
      throw new AppError('Incorrect email/password', 401);
    }
    const token = sign({}, authConfig.jwt.secret,
      {
        subject: `${user.id}`,
        expiresIn: authConfig.jwt.expiresIn,
      }
    );

    return { user, token };
  }
}
