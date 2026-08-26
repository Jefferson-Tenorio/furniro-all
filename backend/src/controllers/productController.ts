import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  Product,
  ProductCreateDTO,
  ProductQueryParams,
  ProductUpdateDTO,
} from "../model/product";
import Service from "../services/iService";
import Controller from "./iController";

export default class ProductController implements Controller {
  constructor(
    private productService: Service<
      Product,
      ProductCreateDTO,
      ProductUpdateDTO
    >,
  ) {}

  private getIdentifierFromParams(req: Request): string {
    const identifier = req.params.slug ?? req.params.id;
    return Array.isArray(identifier) ? identifier[0] : identifier;
  }

  private getQueryValue(value: unknown): string | undefined {
    if (typeof value === "string") return value;
    if (Array.isArray(value) && value.length > 0) return value[0] as string;
    return undefined;
  }

  async getAll(req: Request, res: Response) {
    const pageValue = this.getQueryValue(req.query._page ?? req.query.page);
    const limitValue = this.getQueryValue(req.query._limit ?? req.query.limit);
    const sortValue = this.getQueryValue(
      req.query._sort ?? req.query.sortBy ?? req.query.sort,
    );
    const orderValue = this.getQueryValue(req.query._order ?? req.query.order);

    let sortBy: "price_asc" | "price_desc" | undefined;
    if (
      sortValue === "price_asc" ||
      (sortValue === "price" && orderValue === "asc")
    ) {
      sortBy = "price_asc";
    } else if (
      sortValue === "price_desc" ||
      (sortValue === "price" && orderValue === "desc")
    ) {
      sortBy = "price_desc";
    }

    const query: ProductQueryParams = {
      category: this.getQueryValue(req.query.category),
      page: pageValue ? Number(pageValue) : undefined,
      limit: limitValue ? Number(limitValue) : undefined,
      sortBy,
    };

    const result = await this.productService.getAll(query);
    res.status(StatusCodes.OK).send(result);
  }

  async findById(req: Request, res: Response) {
    const identifier = this.getIdentifierFromParams(req);
    const product = await this.productService.findById(identifier);
    res.status(StatusCodes.OK).send(product);
  }

  async create(req: Request, res: Response) {
    const item = req.body as ProductCreateDTO;
    const product = await this.productService.create(item);
    res.status(StatusCodes.CREATED).send(product);
  }

  async update(req: Request, res: Response) {
    const id = this.getIdentifierFromParams(req);
    const item = req.body as ProductUpdateDTO;
    const product = await this.productService.update(id, item);
    res.status(StatusCodes.OK).send(product);
  }

  async delete(req: Request, res: Response) {
    const id = this.getIdentifierFromParams(req);
    await this.productService.delete(id);
    res.status(StatusCodes.NO_CONTENT).send();
  }

  async findBySlug(req: Request, res: Response) {
    const slug = this.getIdentifierFromParams(req);
    const product = await this.productService.findBySlug(slug);
    res.status(StatusCodes.OK).send(product);
  }
}
