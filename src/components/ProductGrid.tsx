import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles, Filter, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onAddToCart,
  onSelectProduct,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Skincare' | 'Makeup' | 'Mists'>('All');

  const categories = ['All', 'Skincare', 'Makeup', 'Mists'] as const;

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto border-t border-white/5" id="products-grid">
      {/* Background soft glowing blur spheres */}
      <div className="absolute top-[20%] right-[10%] -z-10 h-72 w-72 rounded-full bg-[#8fd3ff]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] -z-10 h-72 w-72 rounded-full bg-[#ff9ecf]/10 blur-[100px] pointer-events-none" />

      {/* Grid Headers and Navigation Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left">
          <span className="rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#8fd3ff]">
            Cosmic Apothecary
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
            Explore Cellular Formulas
          </h2>
          <p className="mt-2 text-xs md:text-sm text-white/50 max-w-md">
            Biocompatible formulas engineered with active botanical minerals and zero-gravity weight.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 relative cursor-pointer ${
                selectedCategory === cat ? 'text-white font-semibold' : 'text-white/50 hover:text-white/80'
              }`}
              id={`filter-btn-${cat.toLowerCase()}`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeGridTabUnderline"
                  className="absolute inset-0 bg-white/10 rounded-xl -z-10 border border-white/20 shadow-[inset_0_1px_5px_rgba(255,255,255,0.15)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid items block */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass-card flex flex-col justify-between overflow-hidden rounded-[25px] p-5 relative group"
              id={`product-card-${product.id}`}
            >
              {/* Card visual backing glow */}
              <div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-[40px] opacity-40 transition-all duration-500 group-hover:opacity-60"
                style={{ backgroundColor: product.glowColor }}
              />

              {/* Product Visual */}
              <div className="relative flex items-center justify-center min-h-[220px] rounded-2xl border border-white/5 bg-white/5 overflow-hidden p-4">
                <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-44 w-44 object-cover object-center transition duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Quick actions overlay */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="h-8 w-8 flex items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white/80 transition hover:bg-white/35 hover:text-white hover:scale-105 cursor-pointer"
                    title="Quick view"
                    id={`quick-view-${product.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product details */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#caa8f5]">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-[10px] text-amber-300">
                      <Star className="h-3 w-3 fill-amber-300" />
                      <span className="font-semibold text-white/80">{product.rating}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="mt-1 font-serif text-lg font-semibold text-white tracking-wide hover:text-[#ff9ecf] transition duration-300 line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="font-serif text-lg font-bold text-[#ff9ecf] text-glow">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="glass-button flex items-center gap-1 rounded-xl px-4 py-2 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
                    id={`add-to-cart-${product.id}`}
                  >
                    <Sparkles className="h-3 w-3 text-[#ff9ecf]" />
                    Add To Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
