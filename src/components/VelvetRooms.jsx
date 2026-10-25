import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

const rooms = [
  {
    slug: "standard-single-room",
    name: "Standard Single Room",
    facilities: ["20 m²", "1 Guest", "1 Single Bed"],
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.33.jpeg",
  },
  {
    slug: "standard-double-room",
    name: "Standard Double Room",
    facilities: ["22–25 m²", "2 Guests", "1 Queen Bed"],
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.34 (1).jpeg",
  },
  {
    slug: "standard-twin-room",
    name: "Standard Twin Room",
    facilities: ["22–25 m²", "2 Guests", "2 Single Beds"],
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.31 (1).jpeg",
  },
  {
    slug: "double-suite-balcony",
    name: "Double Suite with Balcony",
    facilities: ["30–35 m²", "2 Guests", "1 King-size Bed"],
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.24 (3).jpeg",
  },
  {
    slug: "family-house",
    name: "Family House",
    facilities: ["120 m²", "5 Guests", "5 Queen Beds"],
    image: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.33 (2).jpeg",
  },
];

const bookingUrl =
  "https://direct-book.com/properties/velvetsuites?locale=en&currency=USD";

export default function VelvetRooms() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const getScrollDistance = () => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.firstElementChild;

    if (!carousel || !firstCard) {
      return 0;
    }

    const gap = Number.parseFloat(
      window.getComputedStyle(carousel).columnGap || "0",
    );

    return firstCard.getBoundingClientRect().width + gap;
  };

  const slideNext = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const distance = getScrollDistance();

    const reachedEnd =
      carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;

    carousel.scrollTo({
      left: reachedEnd ? 0 : carousel.scrollLeft + distance,
      behavior: "smooth",
    });
  };

  const slidePrevious = () => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const distance = getScrollDistance();
    const reachedStart = carousel.scrollLeft <= 10;

    carousel.scrollTo({
      left: reachedStart
        ? carousel.scrollWidth - carousel.clientWidth
        : carousel.scrollLeft - distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const interval = window.setInterval(slideNext, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="rooms-section"
      className="overflow-hidden bg-[#faf9f6] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          className="mb-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a84c]">
              Stay in comfort
            </p>

            <h2
              className="text-4xl font-bold leading-tight text-[#3b0404] sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Rooms and Suites
            </h2>

            <div className="my-5 h-[3px] w-20 bg-[#c9a84c]" />

            <p className="text-base leading-7 text-gray-600 sm:text-lg">
              Discover elegant rooms and suites thoughtfully designed with
              modern amenities and exceptional comfort for a memorable stay.
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={slidePrevious}
              aria-label="View previous room"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3b0404]/20 bg-white text-[#3b0404] transition-all duration-300 hover:border-[#3b0404] hover:bg-[#3b0404] hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={slideNext}
              aria-label="View next room"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b0404] text-white transition-all duration-300 hover:bg-[#c9a84c]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        <div
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {rooms.map((room, index) => (
            <motion.article
              key={room.slug}
              className="group min-w-[88%] snap-start overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm sm:min-w-[47%] lg:min-w-[31.7%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
            >
              <div className="relative m-3 h-64 overflow-hidden rounded-[1.15rem] sm:h-72">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div className="flex min-h-[250px] flex-col px-6 pb-6 pt-3">
                <h3
                  className="mb-4 text-2xl font-bold leading-tight text-[#3b0404]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {room.name}
                </h3>

                <div className="mb-6 flex flex-wrap gap-2">
                  {room.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {facility}
                    </span>
                  ))}
                </div>

                <div className="mt-auto border-t border-gray-100 pt-5">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] transition-colors group-hover:text-[#c9a84c]">
                      Book Your Stay
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-white">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-gray-400 md:hidden">
          Swipe to explore rooms
        </p>
      </div>
    </section>
  );
}
