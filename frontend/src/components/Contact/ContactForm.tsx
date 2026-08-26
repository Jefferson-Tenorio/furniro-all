import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Control } from "react-hook-form";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormFieldProps {
  label: string;
  name: keyof ContactFormValues;
  control: Control<ContactFormValues>;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
}

function ContactFormField({
  label,
  name,
  control,
  type = "text",
  placeholder,
  multiline = false,
  error,
}: ContactFormFieldProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="font-poppins mb-[22px] block text-[16px] font-medium leading-[100%] tracking-[0%] text-neutral-800"
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          multiline ? (
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              className={`font-poppins h-[75px] w-full resize-none rounded-[10px]
                         border bg-white px-4 py-3
                         text-[16px] font-normal leading-[100%]
                         tracking-[0%] text-neutral-800
                         placeholder:text-neutral-400
                         ${error ? "border-red-500" : "border-[#9F9F9F]"}`}
            />
          ) : (
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={`font-poppins h-[75px] w-full rounded-[10px]
                         border bg-white px-4
                         text-[16px] font-normal leading-[100%]
                         tracking-[0%] text-neutral-800
                         placeholder:text-neutral-400
                         ${error ? "border-red-500" : "border-[#9F9F9F]"}`}
            />
          )
        }
      />

      {error && (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (data: ContactFormValues) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  return (
    <div className="mx-auto w-full max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[32px]"
      >
        <ContactFormField
          label="Your name"
          name="name"
          control={control}
          placeholder="Abc"
          error={errors.name?.message}
        />

        <ContactFormField
          label="Email address"
          name="email"
          control={control}
          type="email"
          placeholder="Abc@def.com"
          error={errors.email?.message}
        />

        <ContactFormField
          label="Subject"
          name="subject"
          control={control}
          placeholder="This is optional"
        />

        <ContactFormField
          label="Message"
          name="message"
          control={control}
          placeholder="Hi! I'd like to ask about"
          multiline
        />

        <div className="flex w-full justify-start">
          <button
            type="submit"
            className="flex h-[55px] w-[237px] items-center justify-center
               rounded-[5px] border border-[#B88E2F]
               font-poppins text-[16px] font-normal
               leading-[100%] tracking-[0%]
               text-neutral-900 transition
               bg-[#B88E2F] text-white"
          >
            <span className="flex h-[27.5px] w-[59.21px] items-center justify-center">
              Submit
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
