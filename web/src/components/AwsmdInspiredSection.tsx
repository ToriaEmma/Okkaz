"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./AwsmdInspiredSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const LISTINGS = [
  {
    href: "/annonces/1",
    category: "Véhicule",
    terms: "LOA dispo",
    title: "Toyota RAV4 2021",
    seller: "AutoPlus Cotonou",
    location: "Cotonou, Akpakpa",
    price: "85 000 FCFA / mois",
    image: "/vehicules.png",
    tone: styles.lime,
  },
  {
    href: "/annonces/2",
    category: "Immobilier",
    terms: "Location",
    title: "Studio meublé",
    seller: "Immo Fidjrossè",
    location: "Cotonou, Fidjrossè",
    price: "180 000 FCFA / mois",
    image: "/hero.PNG",
    tone: styles.soft,
  },
  {
    href: "/annonces/4",
    category: "Pro",
    terms: "Caution requise",
    title: "Groupe électrogène",
    seller: "BTP Services",
    location: "Abomey-Calavi",
    price: "25 000 FCFA / jour",
    image: "/equipements-pro.png",
    tone: styles.mint,
  },
  {
    href: "/annonces/3",
    category: "Tech",
    terms: "Achat progressif",
    title: "iPhone 14 Pro",
    seller: "Kouassi Digital",
    location: "Porto-Novo",
    price: "45 000 FCFA / mois",
    image: "/electronique.png",
    tone: styles.blue,
  },
];

export default function AwsmdInspiredSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleMovingRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const listingRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.fromTo(
      titleMovingRef.current,
      { yPercent: 18 },
      {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.25,
        }
      }
    );

    mm.add("(min-width: 769px)", () => {
      const cards = listingRefs.current.filter((card): card is HTMLAnchorElement => Boolean(card));
      const images = cards
        .map((card) => card.querySelector(`.${styles.imageWrap}`))
        .filter((image): image is Element => Boolean(image));

      gsap.set(cards, {
        y: 48,
        autoAlpha: 0,
        scale: 0.985,
        force3D: true,
      });

      gsap.set(images, {
        y: 18,
        scale: 1.04,
        force3D: true,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      })
        .to(cards, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(images, {
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        }, 0.08);
    });

    const animatedTags = gsap.utils.toArray<HTMLElement>(
      `.${styles.soft} .${styles.cardTop} span, .${styles.blue} .${styles.cardTop} span`
    );

    gsap.fromTo(
      animatedTags,
      { y: 10, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => mm.revert();
  }, { scope: sectionRef });

  const scrollCards = (direction: "prev" | "next") => {
    const container = cardsRef.current;

    if (!container) return;

    const firstCard = container.querySelector("a");
    const cardWidth = firstCard?.clientWidth ?? 320;
    const gap = 24;

    container.scrollBy({
      left: direction === "next" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.shell} ref={sectionRef}>
      <div className={styles.panel}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>Publications vendeurs</p>
            <h2 className={styles.title} ref={titleRef}>
              <span className={styles.staticTitleText}>Des biens vérifiés</span>
              <span className={styles.movingTitleLine}>
                <span className={styles.movingTitleText} ref={titleMovingRef}>
                  prêts à réserver
                </span>
              </span>
            </h2>
          </div>
          <div className={styles.arrows}>
            <button type="button" onClick={() => scrollCards("prev")} aria-label="Voir les annonces précédentes">
              ‹
            </button>
            <button type="button" onClick={() => scrollCards("next")} aria-label="Voir les annonces suivantes">
              ›
            </button>
          </div>
        </div>

        <div className={styles.cards} ref={cardsRef} aria-label="Publications des vendeurs OKKAZ">
          {LISTINGS.map((listing, index) => (
            <Link
              href={listing.href}
              className={`${styles.card} ${listing.tone}`}
              key={listing.title}
              ref={(el) => { listingRefs.current[index] = el; }}
            >
              <div className={styles.cardTop}>
                <span>{listing.category}</span>
                <span>{listing.terms}</span>
                <i aria-hidden />
              </div>
              <h3>{listing.title}</h3>
              <p className={styles.seller}>{listing.seller}</p>
              <p className={styles.meta}>{listing.location}</p>
              <strong className={styles.price}>{listing.price}</strong>
              <div className={styles.imageWrap}>
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 900px) 76vw, 23vw"
                />
                <span className={styles.readMore}>Voir l&apos;annonce →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
