import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Check, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="relative py-20 px-4 max-w-5xl mx-auto border-t border-white/5" id="newsletter-section">
      <div className="absolute inset-0 -z-10 bg-radial from-[#caa8f5]/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-8 md:p-12 text-center shadow-2xl backdrop-blur-3xl"
        id="newsletter-container"
      >
        {/* Floating background decorative sparks */}
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/5 border border-white/10 blur-sm pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5 border border-white/10 blur-sm pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-6">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-[0_0_15px_rgba(143,211,255,0.15)]">
            <Mail className="h-5 w-5 text-[#8fd3ff]" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white">
              Join the Celéstia Circle
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Subscribe to unlock private invitations, futuristic product launches, and complimentary luxury beauty masterclasses.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 mt-8"
                id="newsletter-form"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-3.5 h-4.5 w-4.5 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for the cosmos..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input rounded-2xl py-3.5 pl-12 pr-4 text-sm"
                    id="newsletter-email-input"
                  />
                </div>

                <button
                  type="submit"
                  className="glass-button flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-semibold uppercase tracking-wider glow-border cursor-pointer"
                  id="newsletter-submit-btn"
                >
                  <Sparkles className="h-4 w-4 text-[#ff9ecf]" />
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center backdrop-blur-xl mt-8"
                id="newsletter-success"
              >
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <Check className="h-4.5 w-4.5" />
                </div>
                <p className="text-sm font-semibold text-white">Welcome, Luminant!</p>
                <p className="text-xs text-white/50 mt-1">
                  You have joined the circle. Check your inbox for your 15% introductory reward.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
