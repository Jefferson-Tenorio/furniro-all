import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { getImage } from "../../lib/assets";

import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const rooms = [
  {
    id: 1,
    title: "Inner Peace",
    category: "Bed Room",
    image: "Carousel1.png",
  },
  {
    id: 2,
    title: "Minimalist",
    category: "Dining Room",
    image: "Carousel2.png",
  },
  {
    id: 3,
    title: "Cozy",
    category: "Living Room",
    image: "Carousel3.png",
  },
  {
    id: 4,
    title: "Modern",
    category: "Work Space",
    image: "Carousel4.png",
  },
];

const CarouselNextButton = () => {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => swiper.slideNext()}
      aria-label="Próxima imagem"
      className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-[#B88E2F] shadow-lg transition-colors hover:bg-[#B88E2F] hover:text-white md:right-8"
    >
      <FiChevronRight size={24} />
    </button>
  );
};

export default function RoomCarousel() {
  return (
    <section className="bg-[#FCF8F3] py-12 md:py-16">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="relative z-20 flex flex-col items-center bg-[#FCF8F3] text-center md:w-1/3 md:items-start md:bg-transparent md:text-left">
          <h2 className="mb-4 font-sans text-3xl leading-tight font-bold text-black md:text-[40px]">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="mb-8 text-sm text-[#616161] md:text-base">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you
          </p>
          <Link to="/shop">
            <button className="cursor-pointer border-2 border-over-secundary bg-[#B88E2F] px-8 py-3 font-bold text-white transition-colors hover:bg-secundary hover:text-over-secundary">
              Explore More
            </button>
          </Link>
        </div>

        <div className="relative w-full md:w-2/3">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2.2 },
            }}
            pagination={{ clickable: true }}
            loop={true}
            className="room-swiper h-[450px] md:h-[580px]"
          >
            {rooms.map((room) => (
              <SwiperSlide key={room.id} className="h-full">
                {({ isActive }) => (
                  <div
                    className={`relative w-full transition-all duration-500 ease-out ${
                      isActive
                        ? "h-[400px] md:h-[540px]"
                        : "h-[350px] md:h-[460px]"
                    }`}
                  >
                    <img
                      src={getImage(room.image)}
                      alt={room.title}
                      className="h-full w-full object-cover shadow-md"
                    />

                    {isActive && (
                      <>
                        <div className="animate-fade-in absolute bottom-6 left-6 z-10 flex h-[130px] w-[220px] flex-col justify-center gap-1 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                          <div className="flex items-center gap-2 text-sm font-medium text-[#616161]">
                            <span>0{room.id}</span>
                            <span className="h-px w-4 bg-[#616161]"></span>
                            <span>{room.category}</span>
                          </div>
                          <h3 className="text-2xl font-semibold text-black">
                            {room.title}
                          </h3>
                        </div>

                        <button className="animate-fade-in absolute bottom-6 left-[246px] z-10 flex h-12 w-12 cursor-pointer items-center justify-center bg-[#B88E2F] text-white">
                          <FiArrowRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}
            <CarouselNextButton />
          </Swiper>
        </div>
      </div>

      <style>{`
        .room-swiper {
          overflow: hidden !important; 
        }
        
        .room-swiper .swiper-pagination {
          position: absolute;
          width: auto !important;
          left: 50% !important; 
          transform: translateX(-50%);
          bottom: 16px !important; 
          display: flex;
          align-items: center;
          z-index: 20;
        }
        
        @media (min-width: 768px) {
          .room-swiper .swiper-pagination {
            transform: none;
            left: 45% !important; 
            bottom: 40px !important;
          }
        }

        .room-swiper .swiper-pagination-bullet {
          width: 11px;
          height: 11px;
          background-color: #D8D8D8;
          opacity: 1;
          margin: 0 8px !important;
          transition: all 0.3s ease;
        }
        
        .room-swiper .swiper-pagination-bullet-active {
          background-color: #B88E2F;
          position: relative;
        }
        
        .room-swiper .swiper-pagination-bullet-active::after {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 1px solid #B88E2F;
          border-radius: 50%;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
