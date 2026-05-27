"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useHeroUnfold } from "@/hooks/useHeroUnfold";
import { mockAds, type SearchRequest } from "@/lib/data";
import { readSearchRequests } from "@/lib/searchRequests";
import styles from "./annonces.module.css";

const MODES = ["Tous", "LOA", "Location"] as const;
const CATEGORY_ORDER = ["Toutes", "Véhicules", "Immobilier", "Électronique", "Équipements Pro", "Je recherche", "Événementiel", "Mobilier"];
const HERO_LETTERS = ["b", "i", "e", "n", "s"];

function AnnoncesContent() {
  const searchParams = useSearchParams();
  const unfoldProgress = useHeroUnfold();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "Toutes");
  const [mode, setMode] = useState<(typeof MODES)[number]>("Tous");
  const [searchRequests, setSearchRequests] = useState<SearchRequest[]>([]);

  const categories = useMemo(() => {
    const existing = new Set(mockAds.map((ad) => ad.category));
    return CATEGORY_ORDER.filter((item) => item === "Toutes" || item === "Je recherche" || existing.has(item));
  }, []);

  useEffect(() => {
    const syncRequests = () => setSearchRequests(readSearchRequests());

    syncRequests();
    window.addEventListener("okkaz-search-requests-updated", syncRequests);
    window.addEventListener("storage", syncRequests);

    return () => {
      window.removeEventListener("okkaz-search-requests-updated", syncRequests);
      window.removeEventListener("storage", syncRequests);
    };
  }, []);

  const filteredAds = mockAds.filter((ad) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      ad.title.toLowerCase().includes(query) ||
      ad.location.toLowerCase().includes(query) ||
      ad.owner.toLowerCase().includes(query);
    const matchesCategory = category === "Toutes" || ad.category === category;
    const matchesMode = mode === "Tous" || (mode === "LOA" ? ad.loaPossible : !ad.loaPossible);

    return matchesSearch && matchesCategory && matchesMode;
  });
  const filteredRequests = searchRequests.filter((request) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      request.title.toLowerCase().includes(query) ||
      request.location.toLowerCase().includes(query) ||
      request.requester.toLowerCase().includes(query);
    const matchesCategory = category === "Je recherche" || request.category === category;

    return matchesSearch && matchesCategory && mode === "Tous";
  });
  const visibleRequests = category === "Je recherche" ? filteredRequests : [];
  const heroCenter = (HERO_LETTERS.length - 1) / 2;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackgroundTextContainer}>
          <h1 className={styles.heroBackgroundText} aria-hidden>
            {HERO_LETTERS.map((letter, index) => {
              const distanceFromCenter = index - heroCenter;

              return (
                <span
                  key={index}
                  className={styles.heroLetterWrapper}
                  style={{
                    transform: `translate3d(${
                      unfoldProgress * -0.92 + distanceFromCenter * unfoldProgress * 0.06
                    }em, 0, 0)`,
                  }}
                >
                  <span
                    className={styles.heroAnimatedLetter}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {letter}
                  </span>
                </span>
              );
            })}
          </h1>
        </div>

        <div className={styles.heroOverlayContent}>
          <div className={styles.scrollIndicator}>Scroll</div>
        </div>
      </section>

      <section className={styles.listingShell}>
        <div className={styles.filters}>
          <label className={styles.searchBox}>
            <span>Recherche</span>
            <input
              type="search"
              placeholder="Titre, vendeur ou ville"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <div className={styles.filterGroup} aria-label="Filtrer par catégorie">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={category === cat ? styles.activeFilter : undefined}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup} aria-label="Filtrer par mode">
            {MODES.map((item) => (
              <button
                key={item}
                type="button"
                className={mode === item ? styles.activeFilter : undefined}
                onClick={() => setMode(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.resultsHeader}>
          <span>{filteredAds.length + visibleRequests.length} résultat{filteredAds.length + visibleRequests.length > 1 ? "s" : ""}</span>
          <span>Bénin</span>
        </div>

        <div className={styles.grid}>
          {visibleRequests.map((request) => (
            <article key={request.id} className={`${styles.card} ${styles.requestCard}`}>
              <div className={styles.requestCardBody}>
                <div className={styles.cardTop}>
                  <span>Je recherche</span>
                  <span>{request.urgency}</span>
                </div>
                <h2>{request.title}</h2>
                <p>{request.description}</p>
                <strong className={styles.price}>Budget {request.budget.toLocaleString("fr-FR")} FCFA</strong>
                <span className={styles.requestMeta}>{request.category} · {request.location}</span>
                <span className={styles.requestMeta}>{request.requester} · {request.createdAt}</span>
                <Link href={`/vendeur?recherche=${request.id}`} className={styles.requestCta}>
                  Je peux répondre
                </Link>
              </div>
            </article>
          ))}

          {filteredAds.map((ad, index) => (
            <Link
              key={ad.id}
              href={`/annonces/${ad.id}`}
              className={`${styles.card} ${index % 2 === 0 ? styles.darkCard : styles.lightCard}`}
            >
              <div className={styles.imageWrap}>
                <Image src={ad.image} alt={ad.title} fill sizes="(max-width: 900px) 90vw, 25vw" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span>{ad.category}</span>
                  <span>{ad.loaPossible ? "LOA dispo" : "Location"}</span>
                </div>
                <h2>{ad.title}</h2>
                <strong className={styles.price}>{ad.price.toLocaleString("fr-FR")} FCFA / mois</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default function AnnoncesPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Chargement des annonces...</div>}>
      <AnnoncesContent />
    </Suspense>
  );
}
