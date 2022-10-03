import { getCustomRepository } from "typeorm";
import Customer from "../entities/Customer";
import CustomerRepository from "../repositories/CustomerRepository";

export default class ListCustomerService {

  public async execute(): Promise<Customer[]> {

    const customerRepository = getCustomRepository(CustomerRepository);
    const customers = await customerRepository.find()

    return customers;
  }

}
