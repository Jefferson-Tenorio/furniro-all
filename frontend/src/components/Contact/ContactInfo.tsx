function ContactItem({
  title,
  lines,
  icon,
}: {
  title: string;
  lines: string[];
  icon: string;
}) {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-4">
      <div className="flex items-start justify-center">
        <img src={icon} alt="" className="h-6 w-6" />
      </div>

      <div>
        <h3 className="font-poppins text-[24px] font-medium leading-[100%] tracking-[0%] text-neutral-900">
          {title}
        </h3>

        <div className="mt-1">
          {lines.map((line, i) => (
            <p
              key={i}
              className="font-poppins text-[16px] font-normal leading-[100%] tracking-[0%]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const CONTACT_ITEMS = [
  {
    title: "Address",
    lines: ["236 5th SE Avenue, New York NY10000, United States"],
    icon: "/Contact/location.svg",
  },
  {
    title: "Phone",
    lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"],
    icon: "/Contact/phone.svg",
  },
  {
    title: "Working Time",
    lines: ["Monday-Friday: 9:00 - 22:00", "Saturday-Sunday: 9:00 - 21:00"],
    icon: "/Contact/clock.svg",
  },
];

export default function ContactInfo() {
  return (
    <div className="mt-[82px] flex min-h-[537px] w-full max-w-[393px] flex-col gap-[42px]">
      {CONTACT_ITEMS.map((item) => (
        <ContactItem key={item.title} {...item} />
      ))}
    </div>
  );
}
