import clsx from "clsx";
import { Link } from "react-router";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/">
      <div className={clsx("flex items-center gap-1.25", className)}>
        <img
          src="/Logo/Logo.svg"
          alt="Logo furniro"
          className={clsx("h-8 w-12.5")}
        />
        <h1 className={clsx("font-montserrat text-[34px] font-bold")}>
          Furniro
        </h1>
      </div>
    </Link>
  );
};
export default Logo;
