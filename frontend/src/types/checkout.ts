import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  companyName: z.string().optional(),
  zipCode: z.string().min(8, "ZIP code must be valid"),
  country: z.string().min(1, "Country / Region is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town / City is required"),
  province: z.string().min(1, "Province is required"),
  addOnAddress: z.string().optional(),
  email: z.string().email("Invalid email address"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
