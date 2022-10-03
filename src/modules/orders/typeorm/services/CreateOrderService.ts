import CustomerRepository from "@modules/customers/typeorm/repositories/CustomerRepository";
import ProductsRepositories from "@modules/products/typeorm/repositories/ProductsRepositories";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../entities/Order";
import OrdersRepositories from "../repositories/OrdersRepository";

interface IProducts {
  id: number;
  quantity: number;
}

interface IRequest {
  customer_id: number;
  products: IProducts[];
}

export default class CreateOrderService {

  public async execute({ customer_id, products }: IRequest): Promise<Order> {

    const ordersRepository = getCustomRepository(OrdersRepositories);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductsRepositories);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer not found');
    }

    const productsExist = await productRepository.findAllByIds(products);

    if (!productsExist.length) {
      throw new AppError('Products not found');
    }

    const productsExistsIds = productsExist.map(productExists => productExists.id);

    const checkInexistentProducts = products.filter(
      product => !productsExistsIds.includes(product.id)
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
    }

    const quantityAvailable = products.filter(
      product => productsExist.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available`);
    }

    const serializedProducts = products.map(
      product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: productsExist.filter(p => p.id === product.id)[0].price
      })
    )

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });

    const { orders_products } = order;

    const updatedProductQuantity = orders_products.map(
      product => ({
        id: product.product_id,
        quantity: productsExist.filter(p => p.id === product.product_id)[0].quantity - product.quantity
      })
    )

    await productRepository.save(updatedProductQuantity);

    return order;

  }

}
