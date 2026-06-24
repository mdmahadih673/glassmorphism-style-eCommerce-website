import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto border-t border-white/5" id="testimonials-section">
      {/* Background visual elements */}
      <div className="absolute top-1/4 right-[10%] -z-10 h-72 w-72 rounded-full bg-[#caa8f5]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] -z-10 h-72 w-72 rounded-full bg-[#8fd3ff]/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#caa8f5]">
          Client Testimonials
        </span>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
          Real Glow, Real Results
        </h2>
        <p className="mt-2 text-xs md:text-sm text-white/50 max-w-sm mx-auto">
          Hear from beauty editors, makeup artists, and our wonderful clients across the world.
        </p>
      </div>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.7 }}
            className="glass-card rounded-[25px] p-6 relative flex flex-col justify-between min-h-[250px]"
            id={`testimonial-card-${t.id}`}
          >
            {/* Quote Decorative Icon */}
            <div className="absolute top-6 right-6 text-white/5 pointer-events-none">
              <Quote className="h-10 w-10 stroke-[3]" />
            </div>

            {/* Rating Stars */}
            <div className="flex text-amber-300 gap-0.5 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-300" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light italic mb-6">
              "{t.comment}"
            </p>

            {/* User Bio */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="relative h-10 w-10 flex-shrink-0 rounded-full border border-white/30 bg-white/5 overflow-hidden">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">{t.name}</p>
                <p className="text-[10px] text-[#ff9ecf] tracking-wider">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
