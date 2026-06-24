import { ShoppingBag, Search, Sparkles, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export default function Navbar({ cart, onOpenCart, onSelectProduct, products }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll event for sticky glass transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple reactive search filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, products]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 md:px-8 py-3 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-xl border-b border-white/15 py-2.5 shadow-[0_4px_30px_rgba(202,168,245,0.03)]'
            : 'bg-transparent border-b border-white/5 py-4'
        }`}
        id="main-navbar"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer"
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center h-10 w-10 rounded-full border border-white/25 bg-white/15 shadow-[0_0_15px_rgba(255,158,207,0.25)] transition duration-500 group-hover:scale-110">
              <Sparkles className="h-5 w-5 text-[#ff9ecf] animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-[#ff9ecf]/20 animate-ping opacity-25" />
            </div>
            <span className="font-serif text-xl font-bold tracking-widest text-white transition duration-300 group-hover:text-glow">
              CELÉSTIA
            </span>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-white/70">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition cursor-pointer relative py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('slider-section')}
              className="hover:text-white transition cursor-pointer relative py-1"
            >
              Featured
            </button>
            <button
              onClick={() => scrollToSection('products-grid')}
              className="hover:text-white transition cursor-pointer relative py-1"
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection('why-us-section')}
              className="hover:text-white transition cursor-pointer relative py-1"
            >
              Science
            </button>
            <button
              onClick={() => scrollToSection('newsletter-section')}
              className="hover:text-white transition cursor-pointer relative py-1"
            >
              Join Us
            </button>
          </nav>

          {/* Action Tools (Search, Fav, Cart, Hamburger) */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition hover:bg-white/15 hover:text-white hover:scale-105 cursor-pointer"
              aria-label="Search"
              id="search-trigger-btn"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative h-10 w-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(143,211,255,0.15)]"
              aria-label="Shopping Cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff9ecf] text-[10px] font-bold text-[#0c0814] border border-white/50"
                  id="cart-count-badge"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition hover:bg-white/15 cursor-pointer"
              aria-label="Open mobile menu"
              id="mobile-menu-trigger-btn"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Interactive Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
              className="fixed inset-0 z-50 bg-[#0c0814]/40 backdrop-blur-md"
              id="search-backdrop"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg rounded-2xl border border-white/25 bg-white/10 p-4 shadow-2xl backdrop-blur-3xl"
              id="search-overlay"
            >
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search products, ingredients, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass-input rounded-xl py-2.5 pl-10 pr-4 text-sm"
                  autoFocus
                  id="search-input"
                />
              </div>

              {/* Search Results */}
              {searchQuery.trim() !== '' && (
                <div className="mt-4 max-h-64 overflow-y-auto space-y-2 pr-1">
                  {searchResults.length === 0 ? (
                    <p className="p-3 text-center text-xs text-white/45">No cosmic discoveries found.</p>
                  ) : (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-2 text-left transition hover:bg-white/15"
                        id={`search-result-item-${product.id}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover bg-white/5"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{product.name}</p>
                          <p className="text-[10px] text-white/40">{product.category} • ${product.price}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-35 bg-white/10 backdrop-blur-2xl flex flex-col justify-center p-8 border-l border-white/15"
            id="mobile-drawer-menu"
          >
            <div className="flex flex-col gap-6 text-center text-lg font-serif tracking-wider text-white">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="hover:text-[#ff9ecf] py-2 border-b border-white/5"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('slider-section')}
                className="hover:text-[#ff9ecf] py-2 border-b border-white/5"
              >
                Featured
              </button>
              <button
                onClick={() => scrollToSection('products-grid')}
                className="hover:text-[#ff9ecf] py-2 border-b border-white/5"
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection('why-us-section')}
                className="hover:text-[#ff9ecf] py-2 border-b border-white/5"
              >
                Science
              </button>
              <button
                onClick={() => scrollToSection('newsletter-section')}
                className="hover:text-[#ff9ecf] py-2 border-b border-white/5"
              >
                Join Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
