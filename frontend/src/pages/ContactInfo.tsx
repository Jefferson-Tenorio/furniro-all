function ContactItem({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex gap-4">
      <div className="h-6 w-6 shrink-0" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <div className="mt-1 text-sm leading-relaxed text-neutral-500">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
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
  },
  {
    title: "Phone",
    lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"],
  },
  {
    title: "Working Time",
    lines: ["Monday-Friday: 9:00 - 22:00", "Saturday-Sunday: 9:00 - 21:00"],
  },
];

export default function ContactInfo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-8 rounded-lg border border-neutral-200 p-8">
      {CONTACT_ITEMS.map((item) => (
        <ContactItem key={item.title} {...item} />
      ))}
    </div>
  );
}
