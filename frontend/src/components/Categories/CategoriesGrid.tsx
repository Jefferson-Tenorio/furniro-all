import clsx from "clsx";
import { getImage } from "../../lib/assets";
import CategoryCard from "./CategoryCard";

export default function CategoriesGrid() {
  return (
    <section
      className={clsx(
        "mt-24 mb-14 flex flex-col items-center justify-center px-4",
        "lg:mt-16",
        "xl:mt-14",
      )}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary-text sm:text-[32px]">
          Browse The Range
        </h1>
        <span className="text-lg text-primary-text-100 sm:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </span>
      </div>

      <div className="mt-15.5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard
          image={getImage("Category1.png")}
          alt="Imagem de interior de sala de jantar"
          title="Dining"
          to="/shop/dining"
        />
        <CategoryCard
          image={getImage("Category2.png")}
          alt="Imagem de interior de sala de estar"
          title="Living"
          to="/shop/living"
        />
        <CategoryCard
          image={getImage("Category3.png")}
          alt="Imagem de interior de quarto"
          title="Bedroom"
          to="/shop/bedroom"
        />
      </div>
    </section>
  );
}
