import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    slug: "standard-single-room",
    type: "Standard Room",
    name: "Standard Single Room",
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.33.jpeg",
  },
  {
    slug: "standard-double-room",
    type: "Standard Room",
    name: "Standard Double Room",
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.34 (1).jpeg",
  },
  {
    slug: "standard-twin-room",
    type: "Standard Room",
    name: "Standard Twin Room",
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.31 (1).jpeg",
  },
  {
    slug: "double-suite-balcony",
    type: "Suite",
    name: "Double Suite with Balcony",
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.24 (3).jpeg",
  },
  {
    slug: "family-house",
    type: "Family Stay",
    name: "Family House",
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.40.jpeg",
  },
];

const bookingUrl =
  "https://direct-book.com/properties/velvetsuites?locale=en&currency=USD";

export default function VelvetRooms() {
  const carouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const getDistance = () => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild;

    if (!carousel || !firstCard) {
      return 0;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || "0");

    return firstCard.getBoundingClientRect().width + gap;
  };

  const nextSlide = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const distance = getDistance();

    const reachedEnd =
      carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 20;

    carousel.scrollTo({
      left: reachedEnd ? 0 : carousel.scrollLeft + distance,
      behavior: "smooth",
    });
  };

  const previousSlide = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const distance = getDistance();

    carousel.scrollTo({
      left:
        carousel.scrollLeft <= 20
          ? carousel.scrollWidth - carousel.clientWidth
          : carousel.scrollLeft - distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      nextSlide();
    }, 4500);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="rooms-section"
      className="overflow-hidden bg-[#faf9f6] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1680px]">
        {/* Heading */}
        <motion.div
          className="mb-8 flex items-end justify-between gap-6 sm:mb-10"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a84c]">
              Stay With Us
            </p>

            <h2
              className="text-4xl font-medium text-[#1f1f1f] sm:text-5xl"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              Rooms & Suites
            </h2>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous room"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3b0404]/25 text-xl text-[#3b0404] transition hover:bg-[#3b0404] hover:text-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next room"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3b0404] text-xl text-white transition hover:bg-[#c9a84c] hover:text-black"
            >
              ›
            </button>
          </div>
        </motion.div>

        {/* Room slider */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
        >
          {rooms.map((room, index) => (
            <motion.article
              key={room.slug}
              className="group relative min-h-[440px] min-w-[88%] snap-start overflow-hidden bg-[#171717] sm:min-h-[480px] sm:min-w-[47%] lg:min-h-[540px] lg:min-w-[31.7%]"
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Full image without cropping */}
              <img
                src={room.image}
                alt={room.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e3c46e] sm:text-xs">
                  {room.type}
                </p>

                <h3
                  className="max-w-[95%] text-[28px] font-medium leading-tight text-white sm:text-[31px] lg:text-[34px]"
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {room.name}
                </h3>

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-5 inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.05em] text-white transition hover:text-[#e3c46e]"
                >
                  Book Your Stay
                  <span className="text-lg transition-transform duration-300 group-hover/link:translate-x-2">
                    →
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:hidden">
          Swipe to explore rooms
        </p>
      </div>
    </section>
  );
}
