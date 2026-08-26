import { getImage } from "../../lib/assets";

type Room = {
  image: string;
  type: string;
  title: string;
};

type CarouselProps = {
  rooms: Room[];
  currentRoom: number;
  onChangeRoom: (index: number) => void;
};

const Carousel = ({ rooms, currentRoom, onChangeRoom }: CarouselProps) => {
  if (rooms.length < 2) {
    return null;
  }

  const nextRooms = [
    ...rooms.slice(currentRoom + 1),
    ...rooms.slice(0, currentRoom),
  ];

  const goToPrevious = () => {
    onChangeRoom((currentRoom - 1 + rooms.length) % rooms.length);
  };

  const goToNext = () => {
    onChangeRoom((currentRoom + 1) % rooms.length);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="overflow-hidden">
        <div
          key={currentRoom}
          className="flex animate-[slideIn_700ms_ease-out] gap-6"
        >
          {nextRooms.map((room) => (
            <div key={room.image} className="h-121.5 min-w-93 overflow-hidden">
              <img
                src={getImage(room.image)}
                alt={room.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex gap-2">
        {rooms.map((room, index) => {
          const isCurrent = currentRoom === index;

          return (
            <button
              key={room.image}
              type="button"
              aria-label={`Ir para ${room.title}`}
              aria-current={isCurrent ? "true" : undefined}
              onClick={() => onChangeRoom(index)}
              className={`flex h-6.75 w-6.75 items-center justify-center rounded-full ${
                isCurrent ? "border border-over-secundary" : ""
              }`}
            >
              <span
                className={`h-2.75 w-2.75 rounded-full ${
                  isCurrent ? "bg-over-secundary" : "bg-[#D8D8D8]"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Imagem anterior"
        onClick={goToPrevious}
        className="absolute top-66.75 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-[0px_4px_14px_1px_rgba(0,0,0,0.16)] transition duration-300 hover:scale-110"
      >
        <img src="/Icons/right2.png" alt="" className="scale-x-[-1]" />
      </button>

      <button
        type="button"
        aria-label="Próxima imagem"
        onClick={goToNext}
        className="absolute top-66.75 left-84.25 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-[0px_4px_14px_1px_rgba(0,0,0,0.16)] transition duration-300 hover:scale-110"
      >
        <img src="/Icons/right2.png" alt="" />
      </button>
    </div>
  );
};

export default Carousel;
