import {
  PaginatedResult,
  Product,
  ProductCreateDTO,
  ProductQueryParams,
  ProductUpdateDTO,
} from "../model/product";
import { PrismaClient } from "@prisma/client";
import Repository from "./iRepository";

export class PrismaProductRepository implements Repository<
  Product,
  ProductCreateDTO,
  ProductUpdateDTO
> {
  constructor(private prisma: PrismaClient) {}

  create(item: ProductCreateDTO): Promise<Product> {
    return this.prisma.product.create({ data: item });
  }
  async findAll(query: ProductQueryParams): Promise<PaginatedResult<Product>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const skip = (page - 1) * limit;

    const categoryFilter =
      query.category && query.category.toLowerCase() !== "all"
        ? query.category.charAt(0).toUpperCase() +
          query.category.slice(1).toLowerCase()
        : undefined;

    const where = categoryFilter ? { category: categoryFilter } : {};

    const orderBy =
      query.sortBy === "price_asc"
        ? { price: "asc" as const }
        : query.sortBy === "price_desc"
          ? { price: "desc" as const }
          : undefined;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, orderBy, skip, take: limit }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
  findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const products = await this.prisma.product.findMany();
    return (
      products.find(
        (product) => product.slug.toLowerCase() === slug.toLowerCase(),
      ) ?? null
    );
  }

  update(id: string, item: ProductUpdateDTO): Promise<Product | null> {
    return this.prisma.product.update({ where: { id }, data: item });
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
