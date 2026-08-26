type AddToCartButtonProps = {
  onClick: () => void;
};

const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="h-[64px] cursor-pointer rounded-lg border border-black px-8 font-medium"
    >
      Add To Cart
    </button>
  );
};

export default AddToCartButton;
