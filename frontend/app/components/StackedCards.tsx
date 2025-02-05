import React, { useEffect, useRef, useCallback } from "react";

interface CardData {
  sub: string;
  content: string;
}

const StackedCards: React.FC = () => {
  // Référence pour la zone de pile
  const stackAreaRef = useRef<HTMLDivElement | null>(null);
  // Stocke les références aux éléments HTML des cartes avec useRef
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const rotateCards = useCallback(() => {
    let angle = 0;
    cardsRef.current.forEach((card, index) => {
      if (card) {
        if (card.classList.contains("away")) {
          card.style.transform = "translateY(-120vh) rotate(-48deg)";
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle -= 10;
          card.style.zIndex = `${cardsRef.current.length - index}`;
        }
      }
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (!stackAreaRef.current) return;

    const distance = window.innerHeight * 5.0;
    const topVal = stackAreaRef.current.getBoundingClientRect().top;
    const index = Math.floor(-1 * (topVal / distance + 1));

    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.classList.toggle("away", i <= index);
      }
    });

    rotateCards();
  }, [rotateCards]);

  useEffect(() => {
    rotateCards();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, rotateCards]);

  const cardsData: CardData[] = [
    {
      sub: "Écologie",
      content:
        "Rapportez votre contenant lors de votre prochain passage et bénéficiez d’un remboursement de 100 CFP.",
    },
    {
      sub: "Authenticité",
      content:
        "Nous perpétuons la tradition italienne avec des pizzas cuites au feu de bois, préparées avec des ingrédients frais et de qualité.",
    },
    {
      sub: "Convivialité & Solidarité",
      content:
        "Partager une pizza, c’est créer des moments inoubliables. Nous favorisons les échanges et le plaisir autour de nos créations.",
    },
    {
      sub: "Ancrage local",
      content:
        "Nous privilégions les produits et soutenons l’économie locale en collaborant avec des producteurs et artisans locaux.",
    },
  ];

  return (
    <div className="stack-area" ref={stackAreaRef}>
      <div className="left">
        <div className="title">Nos valeurs</div>
        <div className="sub-title">
          Elles sont au cœur de nos processus métiers !
          <br />
          <button role="button" className="see-more-btn">
            Plus de détails
          </button>
        </div>
      </div>
      <div className="right">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="card"
            ref={(el) => {
              if (el && !cardsRef.current.includes(el)) {
                cardsRef.current.push(el);
              }
            }}
          >
            <div className="sub">{card.sub}</div>
            <div className="content">{card.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedCards;
