import { SORT_OPTIONS } from "@/constants/shop";
import clsx from "clsx";

interface SortByProps {
  sort: string;
  disabled: boolean;
  onSortChange: (sort: string) => void;
}

function SortBy({ sort, onSortChange, disabled }: SortByProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span className="font-poppins text-[16px] sm:text-[20px]">Sort by</span>

      <select
        value={sort}
        disabled={disabled}
        onChange={(event) => onSortChange(event.target.value)}
        className={clsx(
          `h-[55px] w-[150px] rounded-[10px] bg-white px-3 font-poppins text-[14px] outline-none sm:w-[188px] sm:px-4 sm:text-[16px]`,
          sort === "default" ? "text-[#9F9F9F]" : "text-black",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
