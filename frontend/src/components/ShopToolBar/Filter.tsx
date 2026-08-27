import { CATEGORIES_OPTIONS } from "@/constants/shop";
import clsx from "clsx";
import { useState } from "react";

interface FilterProps {
  category: string;
  disabled: boolean;
  onChange: (category: string) => void;
}

function Filter({ category, onChange, disabled }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(value: string) {
    onChange(value);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={clsx(
          "flex items-center gap-3 transition hover:text-gray-600",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        <img src="/IconsShopTool/filter.svg" alt="Filter" />

        <span className="font-poppins text-base sm:text-[20px]">Filter</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-3 w-44 rounded-md bg-white shadow-lg">
          {CATEGORIES_OPTIONS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={`w-full cursor-pointer px-4 py-3 text-left font-poppins transition hover:bg-[#F9F1E7] ${category === item.value ? "bg-[#F9F1E7] font-medium" : ""} `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
