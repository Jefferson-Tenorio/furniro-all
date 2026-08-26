import clsx from "clsx";
import { getImage } from "../../lib/assets";

const MoscaiContent = () => {
  return (
    <div className={clsx("h-180.25 w-360", "relative")}>
      <div className={clsx("absolute top-0 left-0 overflow-hidden")}>
        <img
          src={getImage("Mosaic1.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-17.5 left-23.5 overflow-hidden")}>
        <img
          src={getImage("Mosaic2.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-99.5 left-0 overflow-hidden")}>
        <img
          src={getImage("Mosaic3.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-99.5 left-50.25 overflow-hidden")}>
        <img
          src={getImage("Mosaic4.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-39 left-140.25 overflow-hidden")}>
        <img
          src={getImage("Mosaic5.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-24.75 left-218 overflow-hidden")}>
        <img
          src={getImage("Mosaic6.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-115.75 left-218 overflow-hidden")}>
        <img
          src={getImage("Mosaic7.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-3.5 left-294.5 overflow-hidden")}>
        <img
          src={getImage("Mosaic8.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>

      <div className={clsx("absolute top-115.75 left-266.5 overflow-hidden")}>
        <img
          src={getImage("Mosaic9.png")}
          alt=""
          className={clsx("transition hover:scale-110")}
        />
      </div>
    </div>
  );
};

export default MoscaiContent;
