import Benefits from "../components/Benefits/Benefits";
import { CartHeaders } from "../components/Cart/CartHeaders";
import { CartList } from "../components/Cart/CartList";
import { CartTotals } from "../components/Cart/CartTotals";
import PageBanner from "../components/Shop/PageBanner";

export const Cart = () => {
  return (
    <div className="mb-2">
      <PageBanner breadcrumbCurrent="Cart" breadcrumbHome="Home" title="Cart" />

      <div className="mx-auto mt-18 mb-21.25 grid max-w-310 grid-cols-1 gap-y-7 px-4 lg:grid-cols-3 lg:gap-7">
        <div className="col-span-2 overflow-x-auto md:overflow-x-visible">
          <CartHeaders />
          <CartList />
        </div>
        <CartTotals />
      </div>

      <Benefits />
    </div>
  );
};
