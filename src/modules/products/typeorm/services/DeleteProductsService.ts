import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProductsRepositories from "../repositories/ProductsRepositories";

interface IRequest {
  id: number;
}

export default class DeleteProductsService {

  public async execute({ id }: IRequest): Promise<void> {

    const productsRepository = getCustomRepository(ProductsRepositories);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('No product found');
    }

    await productsRepository.remove(product)
  }
}
