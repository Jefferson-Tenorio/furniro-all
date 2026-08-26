import clsx from "clsx";

interface ShowProps {
  limit: number;
  onLimitChange: (limit: number) => void;
  disabled: boolean;
}

function ShowProduct({ limit, onLimitChange, disabled }: ShowProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span className="font-poppins text-[16px] sm:text-[20px]">Show</span>

      <input
        type="number"
        min={1}
        disabled={disabled}
        value={limit}
        onChange={(event) => {
          const value = Number(event.target.value);

          if (value > 0) {
            onLimitChange(value);
          }
        }}
        className={clsx(
          `h-[55px] w-[55px] rounded-[10px] bg-white text-center font-poppins text-[16px] text-[#9F9F9F] outline-none`,
          disabled && "cursor-not-allowed opacity-50",
        )}
      />
    </div>
  );
}

export default ShowProduct;
