import clsx from "clsx";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NavMenu from "./NavMenu";
import RightMenu from "./RigthMenu";

const Header = () => {
  return (
    <header
      className={clsx(
        "flex items-center justify-center bg-white",
        "h-25 w-full",
        "sticky top-0 z-50",
        "bg-primary",
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between",
          "w-full max-w-[1280px] px-2",
          "md:px-4",
          "lg:px-12.5",
        )}
      >
        <Logo />
        <NavMenu className={clsx("hidden", "md:flex")} />
        <RightMenu className={clsx("hidden", "md:flex")} />
        <MobileMenu className={clsx("flex", "md:hidden")} />
      </div>
    </header>
  );
};
export default Header;
