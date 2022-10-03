import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../entities/Products";
import ProductsRepositories from "../repositories/ProductsRepositories";

interface IRequest {
  id: number;
}

export default class ShowProductsService {

  public async execute({ id }: IRequest): Promise<Products> {

    const productsRepository = getCustomRepository(ProductsRepositories);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('No product found');
    }

    return product;
  }

}
