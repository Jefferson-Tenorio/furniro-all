import { useFormContext, Controller } from "react-hook-form";
import type { CheckoutFormValues } from "@/types/checkout";
import axios from "axios";
import toast from "react-hot-toast";

type FormFieldProps = {
  label: string;
  name: keyof CheckoutFormValues;
  optional?: boolean;
  type?: string;
  width?: "full" | "half";
  options?: string[];
  onChangeInterceptor?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurInterceptor?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function FormField({
  label,
  name,
  optional = false,
  type = "text",
  width = "full",
  options,
  onChangeInterceptor,
  onBlurInterceptor,
}: FormFieldProps) {
  const { control, formState: { errors } } = useFormContext<CheckoutFormValues>();
  const widthClass = width === "half" ? "sm:col-span-1" : "sm:col-span-2";
  const errorMessage = errors[name]?.message;

  return (
    <div className={`col-span-2 ${widthClass}`}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-neutral-800"
      >
        {label}
        {optional && (
          <span className="ml-1 font-normal text-neutral-400">
            (Optional)
          </span>
        )}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          options ? (
            <select
              {...field}
              id={name}
              className={`w-full rounded-md border bg-white px-4 py-3 text-neutral-800 outline-none transition focus:ring-1 focus:ring-neutral-800 ${
                errorMessage ? "border-red-500" : "border-neutral-300"
              }`}
            >
              <option value="">Select...</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...field}
              id={name}
              type={type}
              onChange={(e) => {
                field.onChange(e);
                if (onChangeInterceptor) onChangeInterceptor(e);
              }}
              onBlur={(e) => {
                field.onBlur();
                if (onBlurInterceptor) onBlurInterceptor(e);
              }}
              className={`w-full rounded-md border bg-white px-4 py-3 text-neutral-800 outline-none transition focus:ring-1 focus:ring-neutral-800 ${
                errorMessage ? "border-red-500" : "border-neutral-300"
              }`}
            />
          )
        )}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs mt-1 block">{errorMessage}</span>
      )}
    </div>
  );
}

const FIELDS: Omit<FormFieldProps, "onChangeInterceptor" | "onBlurInterceptor">[] = [
  { name: "firstName", label: "First Name", width: "half" },
  { name: "lastName", label: "Last Name", width: "half" },
  { name: "companyName", label: "Company Name", optional: true },
  { name: "zipCode", label: "ZIP code" },
  {
    name: "country",
    label: "Country / Region",
    options: ["Brazil", "Portugal", "United States"],
  },
  { name: "streetAddress", label: "Street address" },
  { name: "townCity", label: "Town / City" },
  { name: "province", label: "Province" },
  { name: "addOnAddress", label: "Add-on address", optional: true },
  { name: "email", label: "Email address", type: "email" },
];

export default function BillingDetails() {
  const { setValue, clearErrors } = useFormContext<CheckoutFormValues>();

  const handleZipCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data && !response.data.erro) {
          setValue("streetAddress", response.data.logradouro || "");
          setValue("townCity", response.data.localidade || "");
          setValue("province", response.data.uf || "");
          setValue("country", "Brazil");
          clearErrors(["streetAddress", "townCity", "province", "country"]);
        } else {
          toast.error("CEP not found");
        }
      } catch {
        toast.error("Failed to fetch CEP data");
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">
        Billing details
      </h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {FIELDS.map((field) => (
          <FormField
            key={field.name}
            {...field}
            onBlurInterceptor={field.name === "zipCode" ? handleZipCodeBlur : undefined}
          />
        ))}
      </div>
    </div>
  );
}
