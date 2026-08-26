import toast from "react-hot-toast";
import PageBanner from "../components/Shop/PageBanner";
import Benefits from "../components/Benefits/Benefits";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import type { ContactFormValues } from "@/components/Contact/ContactForm";

export default function Contact() {
  function handleSubmit(data: ContactFormValues) {
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully!");
  }

  return (
    <>
      <PageBanner
        breadcrumbCurrent="Contact"
        breadcrumbHome="Home"
        title="Contact"
      />
      <div className="mx-auto mt-[98px] flex w-full max-w-[700px] flex-col items-center text-center">
        <h1 className="font-poppins text-[36px] leading-[100%] font-semibold tracking-[0%] text-neutral-900">
          Get in Touch with us
        </h1>

        <p className="mt-[7px] font-poppins text-[16px] leading-[100%] font-normal tracking-[0%] text-[#9F9F9F]">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
      <div className="mx-auto mt-[98px] mb-[123px] flex w-full max-w-6xl flex-col items-start gap-[30px] px-6 lg:flex-row lg:justify-between">
        <ContactInfo />
        <ContactForm onSubmit={handleSubmit} />
      </div>
      <Benefits />
    </>
  );
}
