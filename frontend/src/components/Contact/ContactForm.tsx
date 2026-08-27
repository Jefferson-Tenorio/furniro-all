import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./../shared/ui/Formfield";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (data: ContactFormValues) => void;
}) {
  const { control, handleSubmit } = useForm<ContactFormValues>({
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
        <FormField<ContactFormValues>
          label="Your name"
          name="name"
          control={control}
          placeholder="Abc"
        />

        <FormField<ContactFormValues>
          label="Email address"
          name="email"
          control={control}
          type="email"
          placeholder="Abc@def.com"
        />

        <FormField<ContactFormValues>
          label="Subject"
          name="subject"
          control={control}
          placeholder="This is optional"
          optional
        />

        <FormField<ContactFormValues>
          label="Message"
          name="message"
          control={control}
          as="textarea"
          placeholder="Hi! I'd like to ask about"
          optional
        />

        <div className="flex w-full justify-start">
          <button
            type="submit"
            className="flex h-[55px] w-[237px] items-center justify-center rounded-[5px] border border-[#B88E2F] bg-[#B88E2F] font-poppins text-[16px] leading-[100%] font-normal tracking-[0%] text-neutral-900 text-white transition"
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
