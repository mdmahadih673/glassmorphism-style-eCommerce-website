import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Sparkles, Check, Heart, ShieldAlert } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'howtouse'>('details');
  const [isLiked, setIsLiked] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0d0714]/40 backdrop-blur-md"
          id="modal-backdrop"
        />

        {/* Modal Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[25px] border border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl md:p-8"
          id="product-details-modal"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white/60 transition hover:bg-white/20 hover:text-white"
            aria-label="Close modal"
            id="close-modal-btn"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Image Gallery Column */}
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="absolute inset-0 -z-10 bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />
              {/* Product Glow Backing */}
              <div
                className="absolute -z-10 h-44 w-44 rounded-full blur-[60px]"
                style={{ backgroundColor: product.glowColor }}
              />
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-64 object-cover object-center transition duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <p className="mt-2 text-center text-xs text-white/40 italic">
                {product.tagline}
              </p>
            </div>

            {/* Product Details Info Column */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-[#ff9ecf]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ff9ecf] ring-1 ring-[#ff9ecf]/30">
                  {product.category}
                </span>

                <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white leading-tight">
                  {product.name}
                </h2>

                {/* Rating & Reviews */}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-300">
                    <Star className="h-4 w-4 fill-amber-300" />
                    <span className="ml-1 font-semibold text-white">{product.rating}</span>
                  </div>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60 underline hover:text-white cursor-pointer">
                    {product.reviewsCount} reviews
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#ff9ecf] text-glow">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-300">Complimentary Shipping</span>
                </div>

                {/* Tabs */}
                <div className="mt-6 flex border-b border-white/10 pb-px text-xs font-medium">
                  {(['details', 'ingredients', 'howtouse'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`mr-4 pb-2 capitalize transition-colors relative ${
                        activeTab === tab ? 'text-white font-semibold' : 'text-white/55 hover:text-white/80'
                      }`}
                      id={`tab-${tab}`}
                    >
                      {tab === 'details' ? 'Overview' : tab === 'ingredients' ? 'Ingredients' : 'How To Use'}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff9ecf]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content panel */}
                <div className="mt-4 text-xs leading-relaxed text-white/75 min-h-[110px]">
                  {activeTab === 'details' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <p>{product.description}</p>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                        <Sparkles className="h-3.5 w-3.5 text-[#ff9ecf]" />
                        <span>Futuristic bio-enhanced skin formulation.</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'ingredients' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="mb-2 font-medium text-white/95">Highlighted Actives:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredients.map((ing, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-[#caa8f5]"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-[10px] text-white/40">
                        Formulated without parabens, silicones, sulfates, or artificial fillers.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'howtouse' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <p>{product.usage}</p>
                      <p className="text-[10px] text-white/40 italic">
                        Tip: Store in a cool, dry place out of direct sunlight to maintain peptide potency.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`glass-button flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-semibold uppercase tracking-wider glow-border ${
                    added ? 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300' : ''
                  }`}
                  id="modal-add-to-cart-btn"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 text-[#ff9ecf]" />
                      Add To Cart
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`rounded-2xl border border-white/15 bg-white/5 p-3 text-white/60 transition duration-300 hover:bg-white/15 hover:text-[#ff9ecf] ${
                    isLiked ? 'text-[#ff9ecf] bg-[#ff9ecf]/10 border-[#ff9ecf]/20' : ''
                  }`}
                  aria-label="Add to wishlist"
                  id="modal-wishlist-btn"
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-[#ff9ecf]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
