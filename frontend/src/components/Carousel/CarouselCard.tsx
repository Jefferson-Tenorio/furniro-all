import { getImage } from "../../lib/assets";

type Room = {
  image: string;
  type: string;
  title: string;
};

type CarouselCardProps = {
  room: Room;
  index: number;
};

const CarouselCard = ({ room, index }: CarouselCardProps) => {
  return (
    <article
      key={room.image}
      className="flex h-145.5 w-full min-w-80 max-w-101 animate-[slideIn_900ms_ease-in-out] items-end bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: `url(${getImage(room.image)})` }}
    >
      <div className="h-32.5 w-54.25 bg-primary/70 py-9 pl-9 font-poppins">
        <p className="flex items-center gap-2 text-[16px] font-medium text-[#616161]">
          {String(index + 1).padStart(2, "0")}
          <img src="/Icons/line.png" alt="" />
          {room.type}
        </p>

        <h3 className="text-[28px] font-semibold text-primary-text-200">
          {room.title}
        </h3>
      </div>

      <button
        type="button"
        aria-label={`Ver ambiente ${room.title}`}
        className="flex h-12 w-12 items-center justify-center bg-over-secundary transition duration-300 hover:brightness-90"
      >
        <img src="/Icons/right.png" alt="" />
      </button>
    </article>
  );
};

export default CarouselCard;
