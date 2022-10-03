import { EntityRepository, In, Repository } from "typeorm";
import Products from "../entities/Products";

interface IFindProducts {
  id: number;
}

@EntityRepository(Products)
export default class ProductsRepositories extends Repository<Products> {

  public async findByName(name: string): Promise<Products | undefined> {

    const product = this.findOne({
      where: {
        name,
      }
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Products[]> {

    const productIds = products.map(product => product.id);
    const productsExist = await this.find({
      where: {
        id: In(productIds)
      }
    })

    return productsExist;
  }
}
