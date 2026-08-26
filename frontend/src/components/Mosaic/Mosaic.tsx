import clsx from "clsx";
import MoscaiContent from "./MosaicContent";

const Mosaic = () => {
  return (
    <div
      className={clsx(
        "overflow-hidden",
        "flex flex-col items-center justify-center",
        "pt-16.75 pb-12.5",
      )}
    >
      <h1
        className={clsx(
          "font-poppins text-[20px] font-semibold text-[#616161]",
        )}
      >
        Share your setup with
      </h1>
      <h1
        className={clsx(
          "my-2 font-poppins text-[25px] font-bold text-primary-text-200",
          "md:text-[40px]",
        )}
      >
        #FuniroFurniture
      </h1>
      <div className={clsx("w-screen max-w-360 overflow-hidden")}>
        <div className={clsx("animate-slide-loop", "w-728", "flex gap-4")}>
          <MoscaiContent></MoscaiContent>
          <MoscaiContent></MoscaiContent>
        </div>
      </div>
    </div>
  );
};
export default Mosaic;
