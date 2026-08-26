export interface PaymentMethod {
  id: string;
  label: string;
  description?: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bank-transfer",
    label: "Direct Bank Transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  },
  {
    id: "cash-on-delivery",
    label: "Cash On Delivery",
    description: "Pay with cash upon delivery.",
  },
];
