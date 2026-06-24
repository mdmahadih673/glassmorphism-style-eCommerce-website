import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Heart, HelpCircle, X, ShieldCheck } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS, BENEFITS, TESTIMONIALS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSlider from './components/ProductSlider';
import ProductGrid from './components/ProductGrid';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetailsModal from './components/ProductDetailsModal';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  // Auto clear toast notification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setToastMessage(`Added ${product.name} to your cart! ✨`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    if (item) {
      setToastMessage(`Removed ${item.product.name} from your cart.`);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckoutSuccess(true);
    setCart([]); // Clear cart on successful checkout
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ff9ecf]/30 selection:text-white" style={{ background: 'linear-gradient(135deg, #ff9ecf 0%, #caa8f5 50%, #8fd3ff 100%)' }} id="root-app-container">
      
      {/* Immersive Animated Gradient Mesh Background with floating blobs */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        {/* Animated Light Blobs from the design theme */}
        <div className="absolute top-[10%] left-[5%] h-[300px] w-[300px] rounded-full bg-white blur-[60px] opacity-60 animate-float-slow" />
        <div className="absolute bottom-[5%] right-[10%] h-[400px] w-[400px] rounded-full bg-[#8fd3ff] blur-[60px] opacity-60 animate-float" />
        <div className="absolute top-[45%] left-[40%] h-[350px] w-[350px] rounded-full bg-[#caa8f5] blur-[80px] opacity-40 animate-pulse-glow" />
      </div>

      {/* Top sticky transparent glass header */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={setSelectedProduct}
        products={PRODUCTS}
      />

      {/* Main Body */}
      <main className="relative z-10 w-full" id="main-content-flow">
        {/* Hero Section */}
        <Hero
          featuredProduct={PRODUCTS[0]}
          onAddToCart={handleAddToCart}
          onSelectProduct={setSelectedProduct}
        />

        {/* Product Slider Showcase */}
        <ProductSlider
          featuredProducts={featuredProducts}
          onAddToCart={handleAddToCart}
          onSelectProduct={setSelectedProduct}
        />

        {/* Product Grid Catalog */}
        <ProductGrid
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onSelectProduct={setSelectedProduct}
        />

        {/* Why Choose Us Benefits Section */}
        <Benefits benefits={BENEFITS} />

        {/* Testimonials Review Panels */}
        <Testimonials testimonials={TESTIMONIALS} />

        {/* Newsletter Form */}
        <Newsletter />
      </main>

      {/* Layered Glass Footer */}
      <Footer />

      {/* Right Drawer Sliding Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Detailed Look Dialog Overlay */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification HUD */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 shadow-2xl backdrop-blur-2xl text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2"
            id="toast-notification"
          >
            <Sparkles className="h-4.5 w-4.5 text-[#ff9ecf] animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Celebratory Glass Modal */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutSuccess(false)}
              className="fixed inset-0 bg-[#0d0714]/40 backdrop-blur-md"
              id="checkout-success-backdrop"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-[25px] border border-white/25 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-3xl"
              id="checkout-success-modal"
            >
              <button
                onClick={() => setShowCheckoutSuccess(false)}
                className="absolute top-4 right-4 text-white/55 hover:text-white transition"
                id="close-success-btn"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#caa8f5] bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                Transaction Completed
              </span>

              <h3 className="mt-3 font-serif text-2xl font-bold text-white tracking-wide">
                Purchase Confirmed!
              </h3>
              
              <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                Thank you for choosing <span className="font-semibold text-[#ff9ecf]">Celéstia</span>. We are preparing your premium bioluminescent shipment. A complimentary tracking link has been sent to your registered email.
              </p>

              <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/5 text-left text-xs space-y-2">
                <div className="flex justify-between text-white/50">
                  <span>Standard Delivery:</span>
                  <span className="text-emerald-300 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Est. Arrival:</span>
                  <span className="text-white font-medium">2-4 Business Days</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Packaging:</span>
                  <span className="text-white font-medium">Eco-Luxury Biodegradable</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckoutSuccess(false)}
                className="glass-button w-full mt-6 rounded-2xl py-3 text-xs font-semibold uppercase tracking-wider glow-border cursor-pointer"
                id="checkout-dismiss-btn"
              >
                Continue Exploring
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
