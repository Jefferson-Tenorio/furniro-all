import clsx from "clsx";
import { Link } from "react-router";

type BreadcrumbProps = {
  category: string;
  productName: string;
  className?: string;
};

const Breadcrumb = ({ category, productName, className }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        "flex h-[100px] w-full items-center px-4 font-poppins sm:px-8 lg:px-[100px]",
        className,
      )}
      style={{ backgroundColor: "#F9F1E7" }}
    >
      <ol className="flex flex-wrap items-center gap-6 text-base font-medium">
        <Link
          to="/"
          className={"font-medium text-[#9F9F9F] transition hover:text-black"}
        >
          Home
        </Link>

        <li className="text-primary-black font-bold">
          <img src={`/Icons/breadcrumbarrow.svg`} alt="Arrow Pointing Right" />
        </li>

        <Link
          to={`/shop/${category.toLowerCase()}`}
          className={"text-[#9F9F9F] transition hover:text-black"}
        >
          {category}
        </Link>

        <li className="text-primary-black font-bold">
          <img src={`/Icons/breadcrumbarrow.svg`} alt="Arrow Pointing Right" />
        </li>

        <li className="h-[37px] w-[2px] bg-primary-text-100/40" />

        <li className="text-primary-text-200">{productName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
