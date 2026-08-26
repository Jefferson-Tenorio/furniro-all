import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
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
  variant?: "outside" | "floating";
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
  variant = "outside",
  onChangeInterceptor,
  onBlurInterceptor,
}: FormFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();
  const [focused, setFocused] = useState(false);
  const widthClass = width === "half" ? "sm:col-span-1" : "sm:col-span-2";
  const errorMessage = errors[name]?.message;
  const isFloating = variant === "floating";
  const wrapperClass = isFloating ? "relative mt-[22px]" : undefined;

  return (
    <div className={`col-span-2 ${widthClass}`}>
      {!isFloating && (
        <label
          htmlFor={name}
          className="font-poppins mb-[22px] block text-[16px] font-medium leading-[100%] text-neutral-800"
        >
          {label}
          {optional && (
            <span className="ml-1 font-normal text-neutral-400">
              (Optional)
            </span>
          )}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const hasValue = field.value !== undefined && field.value !== "";
          const shrink = isFloating && (focused || hasValue);

          const fieldClass = `h-[75px] w-full rounded-[10px] border bg-white
                     text-neutral-800 outline-none
                     ${isFloating ? "px-4 pt-[22px] pb-[6px]" : "px-4"}
                     ${errorMessage ? "border-red-500" : "border-[#9F9F9F]"}
                     focus:ring-1 focus:ring-neutral-800`;

          return (
            <div className={wrapperClass}>
              {isFloating && (
                <label
                  htmlFor={name}
                  className={`font-poppins pointer-events-none absolute left-4 font-medium text-neutral-400
                              ${
                                shrink
                                  ? "top-[10px] text-[12px] leading-[100%]"
                                  : "top-1/2 -translate-y-1/2 text-[16px] leading-[100%]"
                              }`}
                >
                  {label}
                  {optional && (
                    <span className="ml-1 font-normal text-neutral-400">
                      (Optional)
                    </span>
                  )}
                </label>
              )}

              {options ? (
                <select
                  {...field}
                  id={name}
                  onFocus={() => setFocused(true)}
                  onBlur={() => {
                    setFocused(false);
                    field.onBlur();
                  }}
                  className={fieldClass}
                >
                  <option value="" disabled hidden={isFloating}>
                    {isFloating ? "" : "Select..."}
                  </option>
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
                  onFocus={() => setFocused(true)}
                  onChange={(e) => {
                    field.onChange(e);
                    if (onChangeInterceptor) onChangeInterceptor(e);
                  }}
                  onBlur={(e) => {
                    setFocused(false);
                    field.onBlur();
                    if (onBlurInterceptor) onBlurInterceptor(e);
                  }}
                  className={fieldClass}
                />
              )}
            </div>
          );
        }}
      />

      {errorMessage && (
        <span className="mt-1 block text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}

const FIELDS: Omit<
  FormFieldProps,
  "onChangeInterceptor" | "onBlurInterceptor"
>[] = [
  { name: "firstName", label: "First Name", width: "half" },
  { name: "lastName", label: "Last Name", width: "half" },
  { name: "companyName", label: "Company Name", optional: true },
  { name: "zipCode", label: "ZIP code" },
  {
    name: "country",
    label: "Country / Region",
  },
  { name: "streetAddress", label: "Street address" },
  { name: "townCity", label: "Town / City" },
  { name: "province", label: "Province" },
  { name: "email", label: "Email address", type: "email" },
  {
    name: "addOnAddress",
    label: "Additional information",
    variant: "floating",
  },
];

export default function BillingDetails() {
  const { setValue, clearErrors } = useFormContext<CheckoutFormValues>();

  const handleZipCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );
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
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-poppins mb-[36px] flex h-[54px] w-[245px] items-center text-[36px] font-semibold leading-[100%] tracking-[0%] text-neutral-900">
        Billing details
      </h1>

      <div className="grid grid-cols-2 gap-x-[32px] gap-y-[32px]">
        {FIELDS.map((field) => (
          <FormField
            key={field.name}
            {...field}
            onBlurInterceptor={
              field.name === "zipCode" ? handleZipCodeBlur : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
