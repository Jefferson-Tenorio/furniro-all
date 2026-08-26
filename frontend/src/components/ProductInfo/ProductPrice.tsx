type ProductPriceProps = {
  currentPrice: string;
  oldPrice?: string;
};

const ProductPrice = ({ currentPrice, oldPrice }: ProductPriceProps) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <p className="text-[24px] font-medium text-primary-text-100">
        {currentPrice}
      </p>

      {oldPrice && (
        <p className="text-[24px] text-[#B0B0B0] line-through">{oldPrice}</p>
      )}
    </div>
  );
};

export default ProductPrice;
