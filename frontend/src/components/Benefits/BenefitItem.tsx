type BenefitItemProps = {
  icon: string;
  title: string;
  description: string;
};

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex min-w-50 basis-[48%] items-center gap-3 lg:basis-auto">
      <img src={icon} alt={title} className="h-10 w-10 lg:h-auto lg:w-auto" />

      <div>
        <p className="font-poppins text-[18px] font-semibold text-[#242424] md:text-[20px] lg:text-[25px]">
          {title}
        </p>

        <h2 className="font-poppins text-[14px] font-medium text-[#898989] md:text-[16px] lg:text-[20px]">
          {description}
        </h2>
      </div>
    </div>
  );
}

export default BenefitItem;
