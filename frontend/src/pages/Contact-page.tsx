import toast from "react-hot-toast";
import PageBanner from "../components/Shop/PageBanner";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import type { ContactFormValues } from "./ContactForm";

export default function ContactPage() {
  function handleSubmit(data: ContactFormValues) {
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully!");
  }

  return (
    <>
      <PageBanner breadcrumbCurrent="Contact" breadcrumbHome="Home" title="Contact" />
      <div
        className="mx-auto flex w-full max-w-6xl flex-col items-start gap-[30px]
                   px-6 mt-[98px] lg:flex-row lg:justify-between"
      >
        <ContactInfo />
        <ContactForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
