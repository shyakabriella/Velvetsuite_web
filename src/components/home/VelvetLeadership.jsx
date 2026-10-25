import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import chairmanImage from "../../Assets/chairman.jpeg";

const galleryImages = [
  {
    src: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.23.jpeg",
    title: "Elegant Accommodation",
    subtitle: "Velvet Suites Remera",
    featured: true,
  },
  {
    src: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.34 (1).jpeg",
    title: "Standard Double Room",
    subtitle: "22–25 m²",
  },
  {
    src: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.31 (1).jpeg",
    title: "Standard Twin Room",
    subtitle: "22–25 m²",
  },
  {
    src: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.33.jpeg",
    title: "Standard Single Room",
    subtitle: "Comfort & Relaxation",
  },
  {
    src: "/velvet pictures/WhatsApp Image 2026-07-31 at 00.30.24 (3).jpeg",
    title: "Velvet Suite",
    subtitle: "Elegant Stay",
  },
];

function GalleryCard({ image, index, className = "" }) {
  return (
    <motion.div
      className={`group relative overflow-hidden bg-[#111] ${className}`}
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
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img
        src={image.src}
        alt={image.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent transition duration-500 group-hover:from-black/85" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8b65f] sm:text-xs">
          {image.subtitle}
        </p>

        <h3
          className={`font-medium leading-tight text-white ${
            image.featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
          style={{
            fontFamily: "var(--font-heading)",
          }}
        >
          {image.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function VelvetLeadership() {
  return (
    <section className="overflow-hidden bg-[#faf9f6]">
      {/* Chairman's Message */}
      <div className="mx-auto grid max-w-[1540px] items-center px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-2 lg:px-12 lg:py-16 xl:px-20">
        <motion.div
          className="relative overflow-hidden bg-[#560707]"
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={chairmanImage}
            alt="Ally Gasana, Chairman of Velvet Suites"
            loading="lazy"
            className="h-[420px] w-full object-cover object-top sm:h-[520px] lg:h-[580px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </motion.div>

        <motion.div
          className="relative bg-[#111] px-6 py-10 text-white sm:px-10 sm:py-12 lg:-ml-10 lg:px-12 lg:py-14 xl:-ml-16 xl:px-16"
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d8b65f]">
            A word from our founder
          </p>

          <h2
            className="mb-6 text-4xl font-medium leading-tight sm:text-5xl"
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            Chairman’s Message
          </h2>

          <p className="text-base leading-8 text-white/85 sm:text-lg sm:leading-9">
            As the founder of Velvet Suites, I am honored to welcome you to a
            place where our values—excellence, authenticity, integrity,
            innovation, sustainability, and guest-centricity—shape every moment.
            Our commitment is to deliver unparalleled luxury with genuine
            warmth, ensuring your comfort and delight in every detail. Here, you
            don’t just stay—you belong. Thank you for choosing Velvet Suites,
            where every visit feels like coming home, only better.
          </p>

          <div className="mt-7 text-right">
            <p className="font-semibold uppercase tracking-[0.14em] text-[#d8b65f]">
              Ally Gasana
            </p>

            <p className="mt-1 text-sm text-white/60">Chairman of the Board</p>
          </div>
        </motion.div>
      </div>

      {/* Our Gallery */}
      <div id="gallery-section" className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-[1680px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <motion.div
            className="mb-9 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between"
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
                Discover Velvet Suites
              </p>

              <h2
                className="text-4xl font-medium leading-tight text-[#1f1f1f] sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                Our Gallery
              </h2>
            </div>

            <Link
              to="/gallery"
              className="group inline-flex w-fit items-center gap-3 border-b border-[#3b0404] pb-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#3b0404]"
            >
              View Full Gallery
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </motion.div>

          {/* Desktop gallery layout */}
          <div className="grid gap-5 lg:grid-cols-[1fr_2fr] lg:gap-6">
            {/* Large left image */}
            <GalleryCard
              image={galleryImages[0]}
              index={0}
              className="min-h-[430px] sm:min-h-[560px] lg:min-h-[720px]"
            />

            {/* Four images right */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-rows-2 lg:gap-6">
              {galleryImages.slice(1).map((image, index) => (
                <GalleryCard
                  key={image.src}
                  image={image}
                  index={index + 1}
                  className="min-h-[300px] sm:min-h-[340px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
