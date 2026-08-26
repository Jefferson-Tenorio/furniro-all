import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../../stores/cart.store";
import { memo, useCallback } from "react";

export const RemoveItem = memo(({ id }: { id: string }) => {
  const removeItem = useCartStore((s) => s.removeItem);

  const handleRemove = useCallback(() => {
    removeItem(id);
  }, [id, removeItem]);

  return (
    <button className="w-fit" onClick={handleRemove}>
      <FaTrash className="h-5 w-5 cursor-pointer text-over-secundary transition hover:scale-110" />
    </button>
  );
});

RemoveItem.displayName = "RemoveItem";
