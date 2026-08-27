type QuantitySelectorProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({
  value,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex w-fit overflow-hidden rounded-[10px] border border-footer-gray">
      <button
        type="button"
        onClick={onDecrease}
        className="flex cursor-pointer items-center justify-center px-3 py-3.5 transition hover:bg-footer-gray/10"
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
        className="flex cursor-pointer items-center justify-center px-3 py-3.5 transition hover:bg-footer-gray/10"
      >
        +
      </button>
    </div>
  );
}
