import { useFormContext } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import type { CheckoutFormValues } from "@/types/checkout";
import { FormField } from "./../shared/ui/Formfield";

type FieldConfig = {
  name: keyof CheckoutFormValues;
  label: string;
  optional?: boolean;
  type?: string;
  width?: "full" | "half";
  options?: string[];
  labelVariant?: "outside" | "floating";
};

const FIELDS: FieldConfig[] = [
  { name: "firstName", label: "First Name", width: "half" },
  { name: "lastName", label: "Last Name", width: "half" },
  { name: "companyName", label: "Company Name", optional: true },
  { name: "zipCode", label: "ZIP code" },
  { name: "country", label: "Country / Region" },
  { name: "streetAddress", label: "Street address" },
  { name: "townCity", label: "Town / City" },
  { name: "province", label: "Province" },
  { name: "email", label: "Email address", type: "email" },
  {
    name: "addOnAddress",
    label: "Additional information",
    labelVariant: "floating",
  },
];

export default function BillingDetails() {
  const { setValue, clearErrors } = useFormContext<CheckoutFormValues>();

  const handleZipCodeBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data && !response.data.erro) {
        setValue("streetAddress", response.data.logradouro || "");
        setValue("townCity", response.data.localidade || "");
        setValue("province", response.data.uf || "");
        setValue("country", "Brasil");
        clearErrors(["streetAddress", "townCity", "province", "country"]);
      } else {
        toast.error("CEP not found");
      }
    } catch {
      toast.error("Failed to fetch CEP data");
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-[36px] flex h-[54px] w-[245px] items-center font-poppins text-[36px] leading-[100%] font-semibold tracking-[0%] text-neutral-900">
        Billing details
      </h1>

      <div className="grid grid-cols-2 gap-x-[32px] gap-y-[32px]">
        {FIELDS.map((field) => (
          <FormField<CheckoutFormValues>
            key={field.name}
            {...field}
            // control não é passado: FormField pega via useFormContext
            onBlurInterceptor={
              field.name === "zipCode" ? handleZipCodeBlur : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
