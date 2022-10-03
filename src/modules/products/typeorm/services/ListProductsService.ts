import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../entities/Products";
import ProductsRepositories from "../repositories/ProductsRepositories";


export default class ListProductsService {

  public async execute(): Promise<Products[]> {

    const productsRepository = getCustomRepository(ProductsRepositories);
    const products = await productsRepository.find();

    return products;
  }

}
