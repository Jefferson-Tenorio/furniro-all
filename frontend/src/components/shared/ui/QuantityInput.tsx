import clsx from "clsx";

interface QuantityInputProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityInput({
  value,
  onDecrease,
  onIncrease,
  min = 1,
  max,
  className,
}: QuantityInputProps) {
  const canDecrease = value > min;
  const canIncrease = !max || value < max;

  return (
    <div
      className={clsx(
        "inline-flex w-fit overflow-hidden rounded-[10px] border border-footer-gray",
        className,
      )}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={!canDecrease}
        className={clsx(
          "flex cursor-pointer items-center justify-center px-3 py-3.5 transition",
          canDecrease && "hover:bg-footer-gray/10",
          !canDecrease && "cursor-not-allowed opacity-50",
        )}
      >
        -
      </button>

      <input
        value={value}
        type="number"
        readOnly
        className="w-10 text-center outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={onIncrease}
        disabled={!canIncrease}
        className={clsx(
          "flex cursor-pointer items-center justify-center px-3 py-3.5 transition",
          canIncrease && "hover:bg-footer-gray/10",
          !canIncrease && "cursor-not-allowed opacity-50",
        )}
      >
        +
      </button>
    </div>
  );
}
