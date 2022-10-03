import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import UserTokensRepository from "../repositories/UserTokensRepository";
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {

  public async execute({ email }: IRequest): Promise<void> {

    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }
    const { token } = await userTokensRepository.generateToken(user.id);

    const forgotPasswordEmailTemplate = path.resolve(__dirname, '..', '..', 'view', 'forgot_password.hbs');

    await EtherealMail.sendMail(
      {
        to: {
          name: user.name,
          email: user.email
        },
        subject: 'Recuperacao de senha',
        templateData: {
          file: forgotPasswordEmailTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3333/reset_password?token=${token}`
          }
        }
      }
    );
  }
}
