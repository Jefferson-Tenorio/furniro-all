import { useFormContext, Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control?: Control<T>;
  optional?: boolean;
  placeholder?: string;
  width?: "full" | "half";
  labelVariant?: "outside" | "floating";
  as?: "input" | "textarea" | "select";
  type?: string;
  options?: string[];
  onChangeInterceptor?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlurInterceptor?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export function FormField<T extends FieldValues>({
  label,
  name,
  control: controlProp,
  optional = false,
  placeholder,
  width = "full",
  labelVariant = "outside",
  as = "input",
  type = "text",
  options,
  onChangeInterceptor,
  onBlurInterceptor,
}: FormFieldProps<T>) {
  const context = useFormContext<T>();
  const control = controlProp ?? context?.control;
  const [focused, setFocused] = useState(false);

  const widthClass = width === "half" ? "sm:col-span-1" : "sm:col-span-2";
  const isFloating = labelVariant === "floating";
  const fieldId = name as string;

  if (!control) {
    throw new Error(
      `FormField "${fieldId}": nenhum control disponível. Passe a prop "control" ou envolva o form em um FormProvider.`,
    );
  }

  return (
    <div className={`col-span-2 ${widthClass}`}>
      {!isFloating && (
        <label
          htmlFor={fieldId}
          className="mb-[22px] block font-poppins text-[16px] leading-[100%] font-medium text-neutral-800"
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
        render={({ field, fieldState }) => {
          const hasValue = field.value !== undefined && field.value !== "";
          const shrink = isFloating && (focused || hasValue);
          const error = fieldState.error?.message;

          const baseClass = `w-full rounded-[10px] border bg-white text-neutral-800 outline-none
            font-poppins text-[16px] leading-[100%] font-normal tracking-[0%]
            placeholder:text-neutral-400
            ${isFloating ? "px-4 pt-[22px] pb-[6px]" : "px-4"}
            ${as === "textarea" ? "h-[75px] resize-none py-3" : "h-[75px]"}
            ${error ? "border-red-500" : "border-[#9F9F9F]"}
            focus:ring-1 focus:ring-neutral-800`;

          const handlers = {
            onFocus: () => setFocused(true),
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              field.onChange(e);
              onChangeInterceptor?.(e);
            },
            onBlur: (
              e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              setFocused(false);
              field.onBlur();
              onBlurInterceptor?.(e);
            },
          };

          return (
            <div className={isFloating ? "relative mt-[22px]" : undefined}>
              {isFloating && (
                <label
                  htmlFor={fieldId}
                  className={`pointer-events-none absolute left-4 font-poppins font-medium text-neutral-400 ${
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

              {as === "select" ? (
                <select
                  {...field}
                  {...handlers}
                  id={fieldId}
                  className={baseClass}
                >
                  <option value="" disabled hidden={isFloating}>
                    {isFloating ? "" : "Select..."}
                  </option>
                  {options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : as === "textarea" ? (
                <textarea
                  {...field}
                  {...handlers}
                  id={fieldId}
                  placeholder={placeholder}
                  className={baseClass}
                />
              ) : (
                <input
                  {...field}
                  {...handlers}
                  id={fieldId}
                  type={type}
                  placeholder={placeholder}
                  className={baseClass}
                />
              )}

              {error && (
                <span className="mt-1 block text-xs text-red-500">{error}</span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
