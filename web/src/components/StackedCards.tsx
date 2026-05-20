"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./StackedCards.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    title: "Trouvez ou Publiez",
    description: "Recherchez parmi de nombreux biens ou valorisez vos équipements inutilisés en quelques clics.",
    bgColor: "#e0c3fc",
    textColor: "#1a1a1a"
  },
  {
    id: 2,
    title: "Réservez et Simulez",
    description: "Choisissez vos dates de location ou simulez vos paiements périodiques pour une Location avec Option d'Achat (LOA).",
    bgColor: "#84fab0",
    textColor: "#1a1a1a"
  },
  {
    id: 3,
    title: "Payez en Sécurité",
    description: "Réglez facilement via Mobile Money ou carte bancaire. Nous agissons comme tiers de confiance.",
    bgColor: "#fbc2eb",
    textColor: "#1a1a1a"
  },
  {
    id: 4,
    title: "Profitez de votre bien",
    description: "Récupérez votre bien et profitez-en. En fin de LOA, restituez-le ou levez l'option d'achat !",
    bgColor: "#fccb90",
    textColor: "#1a1a1a"
  }
];

export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Initial state: first card is visible, others are moved down by 150vh
      gsap.set(cardsRef.current, { 
        y: (i) => (i === 0 ? 0 : '150vh')
      });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: `+=${CARDS.length * 120}%`, // Reduced scroll distance
        pin: true,
        scrub: 1.5, // Slightly more smoothing on scrub
        snap: {
          snapTo: "labels", // Snap exactly to the labels we define
          duration: { min: 0.4, max: 1.0 }, // Slower, smoother snapping
          delay: 0.05,
          ease: "power1.inOut"
        }
      }
    });

    // Add initial label for the first card
    tl.addLabel("card-0", 0);

    CARDS.forEach((_, i) => {
      if (i === 0) return;

      // The animation for card i starts at i-1 and ends at i
      const startTime = i - 1;
      
      tl.to(cardsRef.current[i], {
        y: 0,
        duration: 1,
        ease: "none"
      }, startTime);

      for (let j = 0; j < i; j++) {
        tl.to(cardsRef.current[j], {
          scale: 1 - (i - j) * 0.04,
          y: -((i - j) * 30),
          duration: 1,
          ease: "none"
        }, startTime);
      }

      // Add a label when card i is fully in place
      tl.addLabel(`card-${i}`, i);
    });

      // Add a final pause tween
      tl.to({}, { duration: 1 }, CARDS.length - 1);
      tl.addLabel("end", CARDS.length);
    });

    return () => mm.revert(); // Cleanup on unmount
  }, { scope: containerRef });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>Comment ça marche</span>
        <h2 className={styles.title}>
          Un processus simple et sécurisé pour louer, vendre ou souscrire à une <span className={styles.highlight}>LOA</span> en toute sérénité.
        </h2>
      </div>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.cardsWrapper}>
          {CARDS.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={styles.card}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                zIndex: index
              }}
            >
              <h2 className={styles.cardNumber}>0{card.id}</h2>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
