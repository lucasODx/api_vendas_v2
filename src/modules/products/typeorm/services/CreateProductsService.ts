import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../entities/Products";
import ProductsRepositories from "../repositories/ProductsRepositories";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductsService {

  public async execute({ name, price, quantity }: IRequest): Promise<Products> {

    const productsRepository = getCustomRepository(ProductsRepositories);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is a product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    await productsRepository.save(product);

    return product;

  }

}
