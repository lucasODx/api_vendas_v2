import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomerRepository";

interface IRequest {
  id: number
  name: string;
  email: string;
}

export default class UpdateCustomerService {

  public async execute({ id, name, email }: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const userUpdateEmail = await customerRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('Another customer is using this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }

}
