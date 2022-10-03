import Customer from "@modules/customers/typeorm/entities/Customer";
import Products from "@modules/products/typeorm/entities/Products";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

interface IProduct {
  product_id: number;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export default class OrdersRepositories extends Repository<Order> {

  public async findById(id: number): Promise<Order | undefined> {

    const order = await this.findOne(id, {
      relations: ['order_products', 'customer']
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {

    const order = this.create({
      customer,
      orders_products: products
    })

    await this.save(order);

    return order;
  }
}
