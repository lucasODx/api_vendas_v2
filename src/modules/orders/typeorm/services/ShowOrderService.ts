import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../entities/Order";
import OrdersRepositories from "../repositories/OrdersRepository";


interface IRequest {
  id: number;
}

export default class ShowOrderService {

  public async execute({ id }: IRequest): Promise<Order> {

    const ordersRepository = getCustomRepository(OrdersRepositories);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;

  }

}
