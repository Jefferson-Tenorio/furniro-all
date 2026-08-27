import { useCartStore } from "@/stores/cart.store";
import type { Product } from "@/types/product";
import { calculateDiscount, formatPrice } from "@/utils/price";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useCallback } from "react";
import { getImage } from "../../lib/assets";

type ProductGridCardProps = {
  href: string;
  product: Product;
};

const ProductGridCard = ({ href, product }: ProductGridCardProps) => {
  const addItem = useCartStore((s) => s.addItem);

  const badgeClass =
    "absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full font-poppins text-[16px] font-medium leading-6 text-primary";

  const handleOverlayAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleAddToCart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (href) {
        event.preventDefault();
        event.stopPropagation();
      }
      addItem(product);
      toast.success(`${product.name} added to cart!`);
    },
    [href, product, addItem],
  );

  const { image, discount, name, isNew, description } = product;
  const offer = discount > 0;
  const priceWithDiscount = calculateDiscount(product.price, product.discount);
  const priceWithDiscountFormatted = formatPrice(priceWithDiscount);
  const price = formatPrice(product.price);

  const card = (
    <>
      <div
        className="relative h-75.25 w-full cursor-pointer bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${getImage(image)})` }}
      >
        {offer && discount !== undefined && (
          <span className={`${badgeClass} bg-[#E97171]`}>-{discount}%</span>
        )}

        {isNew && <span className={`${badgeClass} bg-[#2EC1AC]`}>New</span>}
      </div>

      <div className="h-36.25 px-4 pt-4">
        <h3 className="font-poppins text-[24px] leading-[28.8px] font-semibold text-primary-text-200">
          {name}
        </h3>

        <p className="mt-2 font-poppins text-[16px] leading-6 font-medium text-over-card-product">
          {description}
        </p>

        <div className="mt-2 flex items-center gap-4">
          <p className="font-poppins leading-6 font-semibold text-primary-text-200">
            {priceWithDiscountFormatted}
          </p>

          {offer && price && (
            <p className="text-[16px] leading-6 text-[#B0B0B0] line-through">
              {price}
            </p>
          )}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/70 opacity-0 transition duration-300 group-hover:opacity-100">
        <button
          onClick={handleAddToCart}
          type="button"
          className="z-10 h-12 w-55.25 cursor-pointer bg-primary font-poppins text-[16px] font-semibold text-over-secundary transition hover:bg-over-secundary hover:text-secundary"
        >
          Add to cart
        </button>

        <div className="z-10 flex w-full items-center justify-between px-4">
          <button
            type="button"
            onClick={handleOverlayAction}
            className="flex gap-px font-poppins text-[16px] font-semibold text-primary transition hover:opacity-80"
          >
            <img src="/Icons/share.svg" alt="" />
            Share
          </button>

          <button
            type="button"
            onClick={handleOverlayAction}
            className="flex gap-px font-poppins text-[16px] font-semibold text-primary transition hover:opacity-80"
          >
            <img src="/Icons/compare.svg" alt="" />
            Compare
          </button>

          <button
            type="button"
            onClick={handleOverlayAction}
            className="flex gap-px font-poppins text-[16px] font-semibold text-primary transition hover:opacity-80"
          >
            <img src="/Icons/like.svg" alt="" />
            Like
          </button>
        </div>
      </div>
    </>
  );

  return (
    <article className="group relative min-w-71.25 overflow-hidden bg-card-product">
      {href ? <Link to={href}>{card}</Link> : card}
    </article>
  );
};

export default ProductGridCard;
