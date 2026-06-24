import { Product, Testimonial, Benefit } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Glow Luminous Serum',
    category: 'Skincare',
    price: 68,
    rating: 4.9,
    reviewsCount: 342,
    image: '/src/assets/images/serum_bottle_1782229574795.jpg',
    tagline: 'Deep hydration meets futuristic bioluminescent luminosity.',
    description: 'An advanced bio-fermented cellular serum that instantly penetrates deeply into the skin barrier to deliver intensive, multi-dimensional moisture and an ethereal, lit-from-within glow.',
    ingredients: ['Bioluminescent Peptides', 'Squalane', 'Prickly Pear Seed Extract', 'Multi-Weight Hyaluronic Acid', 'Niacinamide 5%'],
    usage: 'Apply 3-4 drops morning and night on cleansed, damp face and neck before moisturizing. Press gently into the skin with warm, open hands.',
    isFeatured: true,
    glowColor: 'rgba(255, 158, 207, 0.45)'
  },
  {
    id: 'p2',
    name: 'HoloGold Satin Silk Lipstick',
    category: 'Makeup',
    price: 42,
    rating: 4.8,
    reviewsCount: 219,
    image: '/src/assets/images/lipstick_gold_1782229588726.jpg',
    tagline: 'Gold-infused celestial satin finish for cosmic lips.',
    description: 'An ultra-creamy, gold-flecked luxury satin lipstick loaded with nourishing botanical oils and micro-fine mineral crystals. Delivers rich, cushiony pigment with soft-focus luminous dimension.',
    ingredients: ['24K Micro-Gold Dust', 'Organic Jojoba Butter', 'Vitamins C & E', 'Rosehip Seed Oil', 'Sacha Inchi Oil'],
    usage: 'Sweep directly onto bare lips or over your favorite liner. Layer for intensified cosmic shimmer and rich, opulent opacity.',
    isFeatured: true,
    glowColor: 'rgba(202, 168, 245, 0.5)'
  },
  {
    id: 'p3',
    name: 'Dewy Nebula Hydra-Mist',
    category: 'Mists',
    price: 38,
    rating: 4.9,
    reviewsCount: 188,
    image: '/src/assets/images/mist_spray_1782229603204.jpg',
    tagline: 'A cloud of microscopic hydration molecules.',
    description: 'A fine mist spray that envelops your face in an ultra-light cloud of mineral-rich botanical distillates and adaptive moisture-binders. Relaxes skin stress instantly and locks in dewy bounce.',
    ingredients: ['Centella Asiatica Distillate', 'Micro-vapor Hyaluronic Acids', 'Aloe Barbadensis Leaf Juice', 'Blue Tansy Essential Oil', 'Provitamin B5'],
    usage: 'Mist generously over face and neck before skincare, after makeup application, or anytime throughout the day for an instant premium hydration pick-me-up.',
    isFeatured: true,
    glowColor: 'rgba(143, 211, 255, 0.5)'
  },
  {
    id: 'p4',
    name: 'HoloGel Cellular Cream',
    category: 'Skincare',
    price: 58,
    rating: 4.7,
    reviewsCount: 156,
    image: '/src/assets/images/cream_jar_1782229617635.jpg',
    tagline: 'Futuristic moisture lock with a featherlight touch.',
    description: 'An innovative bouncy water-gel cream with holographic reflection beads that melt into the skin, forming an air-permeable moisture barrier. Leaves skin feeling firm, plumper, and incredibly silky.',
    ingredients: ['Probiotics Ferment', 'Red Algae Extract', 'Holographic Phytosterols', 'Ceramide NP Complex', 'Peppermint Flower Water'],
    usage: 'Smooth a hazelnut-sized amount over clean face and neck daily. Excellent as a makeup-priming base for an all-day luminous glass glow.',
    isFeatured: false,
    glowColor: 'rgba(143, 211, 255, 0.45)'
  },
  {
    id: 'p5',
    name: 'Prism Face Gloss Elixir',
    category: 'Makeup',
    price: 46,
    rating: 4.8,
    reviewsCount: 284,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop',
    tagline: 'High-gloss glass skin finishing fluid.',
    description: 'A multi-use highlight gel that mimics natural moisture-slicked dew. Zero sticky residue, zero heavy glitter—just fresh, glassy, prismatic reflections that bounce light in all directions.',
    ingredients: ['Caster Seed Oil', 'Organic Shea Butter Lipids', 'Hydrated Silica Minerals', 'Rosemary Extract', 'Glycerin Complex'],
    usage: 'Dab gently with fingertips onto high points of the face (cheekbones, brow bone, bridge of nose) over bare skin or makeup.',
    isFeatured: false,
    glowColor: 'rgba(255, 158, 207, 0.4)'
  },
  {
    id: 'p6',
    name: 'Nebula Night Repair Oil',
    category: 'Skincare',
    price: 74,
    rating: 5.0,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop',
    tagline: 'Overnight cellular resurrection in a drop.',
    description: 'A powerful lipid-replenishing night elixir packed with rare botanical seed oils and dynamic retinol-alternatives. Fights skin fatigue and wakes you up with refreshed, firm, glowing skin.',
    ingredients: ['Bakuchiol (Retinol Alt)', 'Squalan Derivative', 'Marula Oil', 'Evening Primrose Distillate', 'Vitamin E Coenzyme Q10'],
    usage: 'Warm 2-3 drops in your palms and press gently into cleansed face and neck every evening. Best used as the final step in your night routine.',
    isFeatured: false,
    glowColor: 'rgba(202, 168, 245, 0.45)'
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Clean Beauty-Tech',
    description: 'Hypoallergenic formulas engineered with biocompatible, active plant botanicals and zero synthetic fillers.',
    iconName: 'Sparkles'
  },
  {
    id: 'b2',
    title: 'Bioluminescent Glow',
    description: 'Our patented peptides reflect ambient and UV light, creating a natural lit-from-within glow.',
    iconName: 'Droplet'
  },
  {
    id: 'b3',
    title: 'Zero-Gravity Wear',
    description: 'Micro-encapsulated formulations that deliver ultra-weightless wear with 24-hour hydration lock.',
    iconName: 'Feather'
  },
  {
    id: 'b4',
    title: 'Cruelty-Free & Vegan',
    description: '100% PETA-certified vegan and cruelty-free. All outer packaging is biodegradable or endlessly recyclable.',
    iconName: 'Heart'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Seraphina Vance',
    role: 'Editorial Beauty Critic',
    comment: 'The Aura Glow Serum is absolute witchcraft. My skin has never looked so glassy, uniform, and radiant. It feels like wearing liquid light.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Chloe Thorne',
    role: 'Professional Makeup Artist',
    comment: 'As a makeup artist, I have high standards. The HoloGold lipstick feels as light as silk but stays saturated for hours. Clients rave about the micro-shimmer.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Beauty Enthusiast',
    comment: 'The Hydra-Mist sits on my desk 24/7. It hydrates instantly without ruining my eyeliner, and the fine cloud smells like lavender fields.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
  }
];
