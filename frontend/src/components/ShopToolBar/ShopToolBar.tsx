import Filter from "./Filter";
import ShowProduct from "./ShowProduct";
import SortBy from "./SortBy";

interface ShopToolbarProps {
  category: string;
  onCategoryChange: (category: string) => void;

  sort: string;
  onSortChange: (sort: string) => void;

  limit: number;
  onLimitChange: (limit: number) => void;

  resultText: string;
  disabled: boolean;
}

function ShopToolBar({
  category,
  onCategoryChange,
  sort,
  onSortChange,
  limit,
  onLimitChange,
  resultText,
  disabled,
}: ShopToolbarProps) {
  return (
    <section className="w-full bg-[#FAF3EA]">
      <div className="flex min-h-[100px] w-full flex-wrap items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Filter
            disabled={disabled}
            category={category}
            onChange={onCategoryChange}
          />

          <div className="flex items-center gap-6">
            <button type="button">
              <img src="/IconsShopTool/grid.svg" alt="Grid" />
            </button>

            <button type="button">
              <img src="/IconsShopTool/list.svg" alt="List" />
            </button>
          </div>

          <img
            src="/IconsShopTool/Line.svg"
            alt="Line"
            className="ml-2 hidden sm:block"
          />

          <span className="hidden font-poppins text-[16px] text-black lg:block">
            {resultText}
          </span>
        </div>

        <div className="mr-2 flex items-center gap-4 sm:mr-0 sm:gap-6">
          <ShowProduct
            disabled={disabled}
            limit={limit}
            onLimitChange={onLimitChange}
          />
          <SortBy disabled={disabled} sort={sort} onSortChange={onSortChange} />
        </div>
      </div>
    </section>
  );
}

export default ShopToolBar;
