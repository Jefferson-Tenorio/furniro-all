import { QuantityInput as QuantityInputBase } from "../shared/ui/QuantityInput";
import { useCartStore } from "../../stores/cart.store";
import { memo, useCallback } from "react";

type QuantityInputProps = {
  id: string;
};

export const QuantityInput = memo(({ id }: QuantityInputProps) => {
  const total = useCartStore((s) => s.getItemQuantity(id));
  const increase = useCartStore((s) => s.increaseQuantity);
  const decrease = useCartStore((s) => s.decreaseQuantity);

  const handleDecrease = useCallback(() => {
    decrease(id);
  }, [id, decrease]);

  const handleIncrease = useCallback(() => {
    increase(id);
  }, [id, increase]);

  return (
    <QuantityInputBase
      value={total}
      onDecrease={handleDecrease}
      onIncrease={handleIncrease}
    />
  );
});

QuantityInput.displayName = "QuantityInput";
