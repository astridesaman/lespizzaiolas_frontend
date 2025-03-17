type NavLink = {
  id: number;
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  {
    id: 1,
    name: 'Carte',
    href: '#carte',
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
    href: '#commander',
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

export const calculateSizes = ({ isSmall, isMobile, isTablet }: SizesParams) => {
  return {
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
      deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};
