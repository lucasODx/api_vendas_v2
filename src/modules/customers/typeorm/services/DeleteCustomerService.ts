import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomerRepository";

interface IRequest {
  id: number;
}

export default class DeleteCustomerService {

  public async execute({ id }: IRequest): Promise<void> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await customerRepository.remove(customer);

  }

}
