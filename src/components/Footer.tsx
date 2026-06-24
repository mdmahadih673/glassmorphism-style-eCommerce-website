import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-12 border-t border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden" id="main-footer">
      {/* Footer backing soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-64 w-full max-w-5xl rounded-full bg-[#ff9ecf]/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2 text-left">
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-2 group cursor-pointer"
              id="footer-logo"
            >
              <div className="relative flex items-center justify-center h-8 w-8 rounded-full border border-white/20 bg-white/10 shadow-[0_0_10px_rgba(255,158,207,0.2)] transition duration-500 group-hover:scale-105">
                <Sparkles className="h-4.5 w-4.5 text-[#ff9ecf]" />
              </div>
              <span className="font-serif text-lg font-bold tracking-widest text-white transition duration-300 group-hover:text-[#ff9ecf]">
                CELÉSTIA
              </span>
            </button>
            <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm">
              Premium futuristic beauty-tech cosmetics engineered to celebrate individual luminosity. Hypoallergenic, organic botanical peptide formulas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider">Collections</h4>
            <ul className="space-y-2 text-xs text-white/55">
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('products-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Skincare Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('products-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Cosmic Makeup
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('products-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Dewy Hydra-Mists
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3 text-left">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider">Customer Experience</h4>
            <ul className="space-y-2 text-xs text-white/55">
              <li>
                <span className="hover:text-white transition cursor-pointer">Science & Bioluminescence</span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">Complimentary Standard Delivery</span>
              </li>
              <li>
                <span className="hover:text-white transition cursor-pointer">Clean Beauty Guarantee</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand Copyright and Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {currentYear} Celéstia Beauty. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-[#ff9ecf] fill-[#ff9ecf] animate-pulse" />
            <span>for high-performance cosmetic design.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
