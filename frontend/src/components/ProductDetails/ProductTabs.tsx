import { useRef } from "react";
import type { ProductDetailsTab } from "./types";

type ProductTabsProps = {
  tabs: ProductDetailsTab[];
  activeId: string;
  onSelect: (id: string) => void;
};

const ProductTabs = ({ tabs, activeId, onSelect }: ProductTabsProps) => {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeId);
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    onSelect(nextTab.id);
    tabRefs.current.get(nextTab.id)?.focus();
  };

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className="flex flex-wrap justify-center gap-6 pt-[49px] sm:gap-16"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            ref={(element) => {
              if (element) {
                tabRefs.current.set(tab.id, element);
              } else {
                tabRefs.current.delete(tab.id);
              }
            }}
            type="button"
            role="tab"
            id={`product-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`product-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            onFocus={() => onSelect(tab.id)}
            className={`pb-2 font-poppins text-[24px] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text-200 ${
              isActive
                ? "border-primary-text-200 text-primary-text-200"
                : "border-transparent text-[#9F9F9F]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProductTabs;
