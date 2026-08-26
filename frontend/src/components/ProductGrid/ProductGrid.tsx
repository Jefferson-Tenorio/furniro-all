import type { Product } from "@/types/product";
import { Link } from "react-router";
import ProductGridCard from "./ProductGridCard";

type ProductGridProps = {
  products: Product[];
  title?: string;
};

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <section className="flex w-full flex-col items-center px-4 pb-17.25">
      {title && (
        <h2 className="mb-8 font-poppins text-[40px] leading-12 font-bold text-primary-text-200">
          {title}
        </h2>
      )}

      <div className="mb-8 grid w-full max-w-309 grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductGridCard
            key={product.id}
            href={`/product/${product.id}`}
            product={product}
          />
        ))}
      </div>

      {title && (
        <Link to="/shop">
          <button className="cursor-pointer border border-over-secundary px-19.5 py-3 font-bold text-over-secundary transition hover:bg-over-secundary hover:text-white">
            Show More
          </button>
        </Link>
      )}
    </section>
  );
};

export default ProductGrid;
