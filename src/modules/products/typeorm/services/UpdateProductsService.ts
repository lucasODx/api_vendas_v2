import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../entities/Products";
import ProductsRepositories from "../repositories/ProductsRepositories";

interface IRequest {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductsService {

  public async execute({ id, name, price, quantity }: IRequest): Promise<Products> {

    const productsRepository = getCustomRepository(ProductsRepositories);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('No product found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product)

    return product;

  }
}
