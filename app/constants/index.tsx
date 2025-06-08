type NavLink = {
  id: number;
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  {
    id: 1,
    name: 'Carte',
    href: '/products',
  },
  {
    id: 2,
    name: 'Valeurs',
    href: '#valeurs',
  },
  {
    id: 3,
    name: 'Témoignages',
    href: '#témoignages',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
  {
    id: 5,
    name: 'Commander',
    href: '/cart',
  },
];

type SizesParams = {
  isSmall: boolean;
  isMobile: boolean;
  isTablet: boolean;
};

export const testimonials = [
  {
    id: 0,
    name: "Astride S.",
    role: "Founder, ePacific",
    avatarUrl: "/images/testimonials/Astride.png",
    comment: "Our customers love the seamless experience and the positive impact they can make with every purchase!",
  },
  {
    id: 1,
    name: "Holisoa R.",
    role: "Co-Founder, Les Pizzaiolas",
    avatarUrl: "/images/testimonials/holisoa.png",
    comment: "The marketplace is a game-changer for connecting with like-minded creators and buyers in the textile space.",
  },
  {
    id: 2,
    name: "Jessica T.",
    role: "Eco-enthusiast",
    avatarUrl: "/images/testimonials/jessica.png",
    comment: "I love how easy it is to find unique, sustainable products that fit my style and values.",
  },
];