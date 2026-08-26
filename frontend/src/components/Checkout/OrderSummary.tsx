import { useFormContext, Controller } from "react-hook-form";
import type { CheckoutFormValues } from "@/types/checkout";
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/utils/price";
import { PaymentOption } from "@/components/Checkout/PaymentOption";
import { PAYMENT_METHODS } from "@/constants/checkout";
import { memo, useMemo } from "react";

const OrderLineItem = memo(
  ({
    name,
    qty,
    price,
  }: {
    name: string;
    qty: number;
    price: string;
  }) => {
    return (
      <div className="flex items-baseline justify-between py-2 ">
        <div className="flex items-center">
          <span className="font-poppins flex h-[24px] w-[108px] items-center text-[16px] font-normal leading-[100%] tracking-[0%] text-[#9F9F9F]">
            {name}
          </span>

          <span className="font-poppins ml-[11px] flex h-[18px] w-[8px] items-center text-[12px] font-medium leading-[100%] tracking-[0%]">
            x
          </span>

          <span className="font-poppins ml-[10px] flex h-[18px] w-[5px] items-center text-[12px] font-medium leading-[100%] tracking-[0%]">
            {qty}
          </span>
        </div>

<span className="font-poppins flex min-w-[109px] h-[24px] items-center whitespace-nowrap text-[16px] font-light leading-[100%] tracking-[0%]">
  {price}
</span>
      </div>
    );
  },
);

OrderLineItem.displayName = "OrderLineItem";

const SummaryRow = memo(({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) => {
  return (
    <div className="flex items-center justify-between mt-[22px]">
  <span
    className={
      emphasize
        ? "font-poppins flex h-[24px] min-w-[40px] whitespace-nowrap items-center text-[16px] font-normal leading-[100%] tracking-[0%] text-neutral-900"
        : "font-poppins flex h-[24px] min-w-[40px] whitespace-nowrap items-center text-[16px] font-normal leading-[100%] tracking-[0%] text-neutral-900"
    }
  >
    {label}
  </span>

  <span
    className={
      emphasize
        ? "font-poppins flex h-[36px] min-w-[178px] items-center text-[24px] font-bold leading-[100%] tracking-[0%] text-[#B88E2F]"
        : "font-poppins flex h-[24px] min-w-[109px] items-center text-[16px] font-light leading-[100%] tracking-[0%]"
    }
  >
    {value}
  </span>
</div>
  );
});

SummaryRow.displayName = "SummaryRow";

export default function OrderSummary() {
  const { control, formState: { errors } } = useFormContext<CheckoutFormValues>();
  const cartItems = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const subtotal = useMemo(() => formatPrice(getSubtotal()), [getSubtotal]);
  const total = useMemo(() => subtotal, [subtotal]);

  const renderedItems = useMemo(() =>
    cartItems.map((item) => (
      <OrderLineItem
        key={item.id}
        name={item.name}
        qty={item.quantity}
        price={formatPrice(item.price * item.quantity)}
      />
    )),
    [cartItems]
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex items-center justify-between mt-[50px]">
        <span className="font-poppins flex h-[36px] w-[94px] items-center text-[24px] font-medium leading-[100%] tracking-[0%] text-neutral-900">
  Product
</span>
        <span className="font-poppins flex h-[36px] w-[103px] items-center text-[24px] font-medium leading-[100%] tracking-[0%] text-neutral-900">
  Subtotal
</span>
      </div>

      <div className="mt-4">
        {cartItems.length > 0 ? (
          renderedItems
        ) : (
          <p className="text-sm">Your cart is empty.</p>
        )}
      </div>

      <div className="">
        <SummaryRow label="Subtotal" value={subtotal} />
        <div className="">
          <SummaryRow label="Total" value={total} emphasize />
        </div>
      </div>

<div className="w-full h-0 border-t border-[#D9D9D9] mt-[30px] mb-[22px]" />



      <div className="">
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <>
              {PAYMENT_METHODS.map((method) => (
                <PaymentOption
                  key={method.id}
                  id={method.id}
                  label={method.label}
                  description={method.description}
                  selected={field.value === method.id}
                  onSelect={field.onChange}
                />
              ))}
              {errors.paymentMethod && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.paymentMethod.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <p className="text-[16px] font-light  text-justify leading-[100%] tracking-[0%] font-poppins mt-6 leading-relaxed text-neutral-900 text-justify">
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other
        purposes described in our{" "}
        <a href="#" className="font-poppins font-bold text-neutral-900 text-[16px]">
          privacy policy.
        </a>
      </p>
<div className="mt-[39px] flex w-full justify-center">
  <button
    type="submit"
    className="flex h-[64px] w-[318px] items-center justify-center
               rounded-[15px] border border-neutral-900
               transition hover:bg-neutral-900 hover:text-white"
  >
    <span className="flex h-[30px] w-[114px] items-center justify-center
                     font-poppins text-[20px] font-normal leading-[100%] tracking-[0%]
                     text-neutral-900">
      Place order
    </span>
  </button>
</div>
    </div>
  );
}
