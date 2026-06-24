import { motion } from 'motion/react';
import { Sparkles, Droplet, Feather, Heart } from 'lucide-react';
import { Benefit } from '../types';

interface BenefitsProps {
  benefits: Benefit[];
}

export default function Benefits({ benefits }: BenefitsProps) {
  // Simple icon mapper
  const renderIcon = (name: string) => {
    const props = { className: 'h-6 w-6 text-[#ff9ecf] animate-pulse' };
    switch (name) {
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Droplet':
        return <Droplet {...props} />;
      case 'Feather':
        return <Feather {...props} />;
      case 'Heart':
        return <Heart {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section className="relative py-20 px-4 max-w-7xl mx-auto border-t border-white/5" id="why-us-section">
      {/* Decorative Blur Background Blob */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -z-10 h-80 w-80 rounded-full bg-[#ff9ecf]/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#ff9ecf]">
          Celestial Science
        </span>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
          Why Choose Celéstia?
        </h2>
        <p className="mt-2 text-xs md:text-sm text-white/50 max-w-md mx-auto">
          Combining organic luxury with bio-active skin technologies for high-dimensional cellular performance.
        </p>
      </div>

      {/* Benefits Bento Grid / Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="glass-card rounded-[25px] p-6 text-left flex flex-col justify-between min-h-[220px]"
            id={`benefit-card-${b.id}`}
          >
            {/* Glass Icon Circle with glow border */}
            <div className="h-12 w-12 flex items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[0_0_15px_rgba(255,158,207,0.15)] mb-6">
              {renderIcon(b.iconName)}
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-white tracking-wide">
                {b.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {b.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
