import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const diningFeatures = [
  'Breakfast, Lunch & Dinner',
  'Local Rwandan Cuisine',
  'International Delicacies',
  'Daily Room Service',
];

export default function VelvetRestaurant() {
  const navigate = useNavigate();

  return (
    <section
      id="restaurant-section"
      className="overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1450px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          className="relative overflow-hidden rounded-md shadow-2xl shadow-black/15"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.video
            className="h-[330px] w-full object-cover sm:h-[410px] lg:h-[470px]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/homepageimgs/628B0145-Edited-scaled.jpg.jpeg"
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 0.5;
            }}
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <source
              src="/videos/NGALI-Video-1.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML video.
          </motion.video>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />

          <motion.div
            className="absolute bottom-5 left-5 right-5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e8cb77]">
              Velvet Dining
            </p>

            <p
              className="mt-1 text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Taste something memorable
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a84c]">
            Restaurant and dining
          </p>

          <h2
            className="text-4xl font-bold leading-tight text-[#3b0404] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Exquisite Dining
          </h2>

          <motion.div
            className="my-5 h-[3px] bg-[#c9a84c]"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          />

          <p className="text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Embark on a culinary journey. Our chefs blend fresh local
            ingredients with global inspiration to create delicious and
            beautifully presented dishes. Enjoy every meal in a warm,
            comfortable and welcoming atmosphere.
          </p>

          <div className="my-7 grid gap-3 sm:grid-cols-2">
            {diningFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-start gap-3 rounded-sm bg-[#faf9f6] px-4 py-3 text-sm font-medium text-gray-700"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  duration: 0.5,
                }}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] text-xs font-bold text-white">
                  ✓
                </span>

                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mb-7 border-l-4 border-[#c9a84c] bg-[#faf9f6] px-5 py-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            <h3 className="mb-1 font-semibold text-gray-900">
              Opening Hours
            </h3>

            <p className="text-sm text-gray-600">
              Every day from 6:30 AM to 11:00 PM
            </p>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => navigate('/menu')}
            className="rounded-sm border border-[#3b0404] bg-transparent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#3b0404] transition-colors hover:bg-[#3b0404] hover:text-white"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            View Restaurant Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
