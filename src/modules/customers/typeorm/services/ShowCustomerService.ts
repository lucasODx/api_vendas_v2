import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomerRepository";

interface IRequest {
  id: number;
}

export default class ShowCustomerService {

  public async execute({ id }: IRequest): Promise<Customer> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }

}
