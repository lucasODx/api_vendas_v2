import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomerRepository";

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {

  public async execute({ name, email }: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exists');
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);
    return customer;
  }
}
