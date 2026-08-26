import clsx from "clsx";
import { getImage } from "../../lib/assets";
import { Link } from "react-router";

type PageBannerProps = {
  image?: string;
  title: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  className?: string;
};

const PageBanner = ({
  title,
  className,
  image,
  breadcrumbHome,
  breadcrumbCurrent,
}: PageBannerProps) => {
  return (
    <div className={clsx("relative", className)}>
      <img
        src={image ? getImage(image) : getImage("shop-banner.png")}
        alt=""
        className="h-29 w-full object-cover sm:h-54 md:h-79"
      />

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-0 sm:bottom-16 md:bottom-32">
        <h1 className="font-poppins text-5xl font-medium text-primary-text-200 sm:text-[36px] md:text-[42px]">
          {title}
        </h1>

        <div className="mt-2 flex items-center gap-2 font-poppins text-sm text-primary-text-200/70 sm:text-base">
          <Link to="/" className={"font-medium transition hover:text-gray-600"}>
            {breadcrumbHome}
          </Link>
          <span>
            <img
              src={`/Icons/breadcrumbarrow.svg`}
              alt="Arrow Pointing Right"
            />
          </span>
          <span className="font-light text-primary-text-200">
            {breadcrumbCurrent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
