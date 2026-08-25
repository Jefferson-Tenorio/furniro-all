import { useFormContext, Controller } from "react-hook-form";
import type { CheckoutFormValues } from "@/types/checkout";
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/utils/price";
import { PaymentOption } from "@/components/Checkout/PaymentOption";
import { PAYMENT_METHODS } from "@/constants/checkout";
import { memo, useMemo } from "react";

const OrderLineItem = memo(({ name, qty, price }: { name: string; qty: number; price: string }) => {
  return (
    <div className="flex items-baseline justify-between py-2">
      <span className="text-sm text-neutral-400">
        {name} <span className="ml-1">x {qty}</span>
      </span>
      <span className="text-sm text-neutral-500">{price}</span>
    </div>
  );
});

OrderLineItem.displayName = "OrderLineItem";

const SummaryRow = memo(({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span
        className={
          emphasize
            ? "text-base font-semibold text-neutral-900"
            : "text-sm text-neutral-500"
        }
      >
        {label}
      </span>
      <span
        className={
          emphasize
            ? "text-lg font-bold text-[#B88E2F]"
            : "text-sm text-neutral-500"
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
    <div className="mx-auto w-full max-w-md p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <span className="text-lg font-semibold text-neutral-900">Product</span>
        <span className="text-lg font-semibold text-neutral-900">Subtotal</span>
      </div>

      <div className="mt-4">
        {cartItems.length > 0 ? (
          renderedItems
        ) : (
          <p className="py-2 text-sm text-neutral-400">Your cart is empty.</p>
        )}
      </div>

      <div className="border-t border-neutral-200 mt-4 pt-4">
        <SummaryRow label="Subtotal" value={subtotal} />
        <div className="border-t border-neutral-200">
          <SummaryRow label="Total" value={total} emphasize />
        </div>
      </div>

      <div className="mt-6 pt-4">
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

      <p className="mt-6 text-sm leading-relaxed text-neutral-900 text-justify">
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other
        purposes described in our{" "}
        <a href="#" className="font-semibold text-neutral-900 font-bold">
          privacy policy.
        </a>
      </p>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl border border-neutral-900 py-4
                   text-sm font-medium text-neutral-900 transition
                   hover:bg-neutral-900 hover:text-white"
      >
        Place order
      </button>
    </div>
  );
}
