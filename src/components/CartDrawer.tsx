import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#0d0714]/40 backdrop-blur-md"
            id="cart-backdrop"
          />

          {/* Drawer glass panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md border-l border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-white/80" />
                <h2 className="font-serif text-2xl font-semibold text-white tracking-wide">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Close cart"
                id="close-cart-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="mt-6 flex-1 overflow-y-auto pr-1" style={{ height: 'calc(100vh - 280px)' }}>
              {cart.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-white/5 p-4 ring-1 ring-white/10">
                    <ShoppingBag className="h-8 w-8 text-white/40" />
                  </div>
                  <p className="font-medium text-white/80">Your cart is empty</p>
                  <p className="mt-1 text-sm text-white/40">Explore our products and find your perfect glow.</p>
                  <button
                    onClick={onClose}
                    className="glass-button mt-6 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider"
                    id="cart-start-shopping-btn"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg"
                      id={`cart-item-${item.product.id}`}
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="font-serif text-sm font-medium text-white line-clamp-1">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-white/40 transition hover:text-[#ff9ecf]"
                              title="Remove item"
                              id={`remove-item-${item.product.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-white/40">{item.product.category}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-white/15 bg-white/5 px-2 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              disabled={item.quantity <= 1}
                              className="p-1 text-white/60 transition hover:text-white disabled:opacity-30"
                              id={`qty-minus-${item.product.id}`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center text-xs font-medium text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 text-white/60 transition hover:text-white"
                              id={`qty-plus-${item.product.id}`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#caa8f5] text-glow-blue">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Footer */}
            {cart.length > 0 && (
              <div className="absolute bottom-0 left-0 w-full border-t border-white/15 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span className="text-emerald-300">Complimentary</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-serif text-lg font-semibold text-white">
                    <span>Total Amount</span>
                    <span className="text-[#ff9ecf] text-glow">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="glass-button flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold uppercase tracking-wider glow-border"
                  id="checkout-btn"
                >
                  <Sparkles className="h-4 w-4 text-[#ff9ecf]" />
                  Secure Checkout
                </button>
                <p className="mt-3 text-center text-[10px] text-white/30">
                  Fully secured 256-bit SSL encrypted connection.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
