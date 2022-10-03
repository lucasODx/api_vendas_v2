import { Request, Response } from "express";
import CreateProductsService from "../services/CreateProductsService";
import DeleteProductsService from "../services/DeleteProductsService";
import ListProductsService from "../services/ListProductsService";
import ShowProductsService from "../services/ShowProductService";
import UpdateProductsService from "../services/UpdateProductsService";

export default class ProductsController {

  public async index(request: Request, response: Response): Promise<Response> {

    const listProducts = new ListProductsService;
    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const id = parseInt(request.params.id);
    const showProduct = new ShowProductsService();
    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductsService();
    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const id = parseInt(request.params.id);
    const { name, price, quantity } = request.body;
    const updateProduct = new UpdateProductsService();
    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {

    const id = parseInt(request.params.id);
    const deleteProduct = new DeleteProductsService();
    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
