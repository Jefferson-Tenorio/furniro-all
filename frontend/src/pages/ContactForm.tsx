import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm({ onSubmit }: { onSubmit: (data: ContactFormValues) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sharedClasses =
    "w-full rounded-md border bg-white px-4 py-3 " +
    "text-neutral-800 placeholder-neutral-400 outline-none transition " +
    "focus:ring-1 focus:ring-neutral-800 ";

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-neutral-200 p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-neutral-900">
            Your name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="name"
                placeholder="Abc"
                className={`${sharedClasses} ${errors.name ? "border-red-500" : "border-neutral-300"}`}
              />
            )}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-900">
            Email address
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="Abc@def.com"
                className={`${sharedClasses} ${errors.email ? "border-red-500" : "border-neutral-300"}`}
              />
            )}
          />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-neutral-900">
            Subject
          </label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="subject"
                placeholder="This is optional"
                className={`${sharedClasses} border-neutral-300`}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-neutral-900">
            Message
          </label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="message"
                placeholder="Hi! I'd like to ask about"
                rows={4}
                className={`${sharedClasses} border-neutral-300`}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-[#B88E2F] py-3 text-sm font-medium
                     text-white transition hover:bg-[#A07B28]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
