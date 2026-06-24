import { motion } from 'motion/react';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  featuredProduct: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function Hero({ featuredProduct, onAddToCart, onSelectProduct }: HeroProps) {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
      id="hero-section"
    >
      {/* Background radial soft light blobs */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-[#ff9ecf]/25 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-[10%] right-[5%] -z-10 h-80 w-80 rounded-full bg-[#8fd3ff]/25 blur-[120px] animate-float" />
      <div className="absolute top-[40%] left-[45%] -z-10 h-96 w-96 rounded-full bg-[#caa8f5]/20 blur-[130px] animate-pulse-glow" />

      {/* Hero Outer Content */}
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-6 md:p-12 shadow-2xl backdrop-blur-3xl"
          id="hero-glass-card"
        >
          {/* Decorative background glass circle */}
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/5 border border-white/10 blur-sm pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Info Column */}
            <div className="space-y-6 text-left relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#ff9ecf]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Beauty Tech</span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-serif text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
                >
                  Pure Light, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9ecf] via-[#caa8f5] to-[#8fd3ff] text-glow">
                    Cellular Glow.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="font-sans text-sm sm:text-base text-white/80 max-w-md font-light leading-relaxed"
                >
                  {featuredProduct.tagline} {featuredProduct.description.slice(0, 115)}...
                </motion.p>
              </div>

              {/* Price Tag with Glowing border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center gap-3"
              >
                <span className="font-serif text-3xl font-extrabold text-[#ff9ecf] text-glow">
                  ${featuredProduct.price.toFixed(2)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/45 bg-white/5 border border-white/10 rounded px-2 py-0.5">
                  Complimentary Shipping Included
                </span>
              </motion.div>

              {/* Dynamic Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <button
                  onClick={() => onAddToCart(featuredProduct)}
                  className="glass-button flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-xs font-semibold uppercase tracking-widest glow-border cursor-pointer"
                  id="hero-buy-btn"
                >
                  <Sparkles className="h-4 w-4 text-[#ff9ecf]" />
                  Add to Cart
                </button>

                <button
                  onClick={() => onSelectProduct(featuredProduct)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/90 hover:bg-white/15 hover:text-white transition cursor-pointer"
                  id="hero-details-btn"
                >
                  Discover Science
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>

              {/* Rating Mini Stat */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs text-white/50"
              >
                <div className="flex text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-300" />
                  ))}
                </div>
                <span>4.9 / 5 Rating from editorial testers.</span>
              </motion.div>
            </div>

            {/* Right Product Image Column (Floating with soft shadow & background glow) */}
            <div className="relative flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              {/* Soft background light aura matching the glowColor of the product */}
              <div
                className="absolute h-56 w-56 rounded-full blur-[70px] opacity-75 animate-pulse-glow"
                style={{ backgroundColor: featuredProduct.glowColor }}
              />

              {/* Animated Float image container */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 1.5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onClick={() => onSelectProduct(featuredProduct)}
                className="cursor-pointer relative group"
                id="hero-image-container"
              >
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="relative z-10 h-64 w-64 md:h-80 md:w-80 object-cover object-center filter drop-shadow-[0_15px_30px_rgba(255,158,207,0.35)] transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Shimmer overlay effect */}
                <div className="absolute inset-0 z-20 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <div className="h-full w-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
