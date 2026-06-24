import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductSliderProps {
  featuredProducts: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductSlider({
  featuredProducts,
  onAddToCart,
  onSelectProduct,
}: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Auto slide every 4 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const currentProduct = featuredProducts[currentIndex];

  const slideVariants = {
    initial: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 120 : -120,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
      },
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -120 : 120,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto" id="slider-section">
      {/* Decorative Blur Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-[#caa8f5]/15 blur-[120px] pointer-events-none" />

      {/* Header section */}
      <div className="text-center mb-12">
        <span className="rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#caa8f5]">
          Curated Showcase
        </span>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
          The Holographic Series
        </h2>
        <p className="mt-2 text-xs md:text-sm text-white/50 max-w-md mx-auto">
          Experience our signature light-weight cellular formulations designed for infinite dewiness.
        </p>
      </div>

      {/* Main Slider Wrapper */}
      <div className="relative mx-auto max-w-4xl" id="product-slider-container">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/20 hover:scale-105"
          aria-label="Previous product"
          id="slider-prev-btn"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/20 hover:scale-105"
          aria-label="Next product"
          id="slider-next-btn"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slidable Glass Card */}
        <div className="relative overflow-hidden rounded-[25px] border border-white/20 bg-white/5 p-6 md:p-10 backdrop-blur-2xl shadow-xl min-h-[380px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProduct.id}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full"
            >
              {/* Image Side */}
              <div className="relative flex justify-center order-1 md:order-2">
                <div
                  className="absolute h-48 w-48 rounded-full blur-[60px] opacity-60"
                  style={{ backgroundColor: currentProduct.glowColor }}
                />
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="h-56 w-56 object-cover object-center relative z-10 filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.08)] cursor-pointer"
                  onClick={() => onSelectProduct(currentProduct)}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text Side */}
              <div className="text-left space-y-4 order-2 md:order-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8fd3ff] bg-[#8fd3ff]/10 border border-[#8fd3ff]/20 rounded-full px-2.5 py-0.5">
                  {currentProduct.category}
                </span>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  {currentProduct.name}
                </h3>

                <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                  {currentProduct.tagline} {currentProduct.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-amber-300" />
                  <span className="font-semibold text-white">{currentProduct.rating}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/50">{currentProduct.reviewsCount} reviews</span>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <span className="font-serif text-2xl font-bold text-[#ff9ecf] text-glow">
                    ${currentProduct.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => onAddToCart(currentProduct)}
                    className="glass-button flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider glow-border cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#ff9ecf]" />
                    Direct Add
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2.5 mt-8">
        {featuredProducts.map((p, index) => (
          <button
            key={p.id}
            onClick={() => {
              setDirection(index > currentIndex ? 'right' : 'left');
              setCurrentIndex(index);
            }}
            className={`h-2.5 rounded-full transition-all duration-500 border border-white/30 cursor-pointer ${
              currentIndex === index
                ? 'w-8 bg-[#ff9ecf] shadow-[0_0_10px_#ff9ecf]'
                : 'w-2.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            id={`slider-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
