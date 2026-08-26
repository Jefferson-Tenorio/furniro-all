import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import BillingDetails from "@/components/Checkout/BillingDetails";
import OrderSummary from "@/components/Checkout/OrderSummary";
import PageBanner from "../components/Shop/PageBanner";
import { useNavigate } from "react-router";
import { useCartStore } from "@/stores/cart.store";
import { checkoutSchema, type CheckoutFormValues } from "@/types/checkout";
import Benefits from "@/components/Benefits/Benefits";

export default function Checkout() {
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      zipCode: "",
      country: "",
      streetAddress: "",
      townCity: "",
      province: "",
      addOnAddress: "",
      email: "",
      paymentMethod: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Order placed:", data);
    toast.success("Order placed successfully!");
    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const onError = (errors: FieldErrors<CheckoutFormValues>) => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      const errorMessage = errors[firstErrorKey as keyof CheckoutFormValues]?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  return (
    <>
      <PageBanner breadcrumbCurrent="Checkout" breadcrumbHome="Home" title="Checkout" />
      <div className="mx-auto flex w-full mb-[123px] mt-[98px] max-w-6xl flex-col items-start gap-[26px] lg:flex-row lg:justify-between">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, onError)}
            className="flex w-full flex-col lg:flex-row gap-10"
          >
            <div className="w-full lg:w-1/2">
              <BillingDetails />
            </div>
            <div className="w-full lg:w-1/2">
              <OrderSummary />
            </div>
          </form>
        </FormProvider>
      </div>
      <Benefits />
    </>
  );
}
