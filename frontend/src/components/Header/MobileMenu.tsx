import clsx from "clsx";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import NavMenu from "./NavMenu";
import RightMenu from "./RigthMenu";

type MobileMenuProps = {
  className?: string;
};
const MobileMenu = ({ className }: MobileMenuProps) => {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className={clsx("relative", className)}>
      <LuMenu
        size={32}
        className={clsx("transition-all hover:scale-110 hover:cursor-pointer")}
        onClick={() => setAtivo(!ativo)}
      />
      <NavMenu
        className={clsx(
          "h-[calc(100vh-100px)] max-w-[50vw] min-w-62.5",
          "absolute top-16.25 -right-2",
          "flex-col",
          "items-center justify-center gap-5",
          "bg-primary",
          {
            flex: ativo,
            hidden: !ativo,
          },
        )}
      >
        <RightMenu className={clsx("mt-6")} />
      </NavMenu>
    </div>
  );
};
export default MobileMenu;
