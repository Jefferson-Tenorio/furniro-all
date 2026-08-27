import { twMerge } from "tailwind-merge";

type HeroButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

const HeroButton = ({ label, className, onClick }: HeroButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "h-18.5 w-55.5 bg-over-secundary font-poppins text-[16px] font-bold text-primary uppercase",
        "cursor-pointer border-2 border-over-secundary transition hover:bg-secundary hover:text-over-secundary",
        "max-xxs:h-14 max-xxs:w-40",
        className,
      )}
    >
      {label}
    </button>
  );
};

export default HeroButton;
