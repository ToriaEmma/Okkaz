import Image from "next/image";
import Link from "next/link";
import { mockAds } from "@/lib/data";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

export default function SellerGoodsPage() {
  const total = mockAds.length;
  const pending = 1;
  const totalViews = mockAds.length * 124;

  return (
    <SellerShell active="/vendeur/biens">
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <Link href="/vendeur" className={styles.backBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <div className={styles.pageHeaderTitle}>
            <p className={styles.kicker}>Catalogue</p>
            <h1>Mes annonces</h1>
            <p>Tout vos biens publies. Le numero reste masque jusqu&apos;a ce qu&apos;un client paie OKKAZ.</p>
          </div>
          <Link href="/vendeur/publier" className={styles.headerCta}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Publier
          </Link>
        </header>

        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardBlue}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
            </span>
            <div>
              <strong>{total}</strong>
              <p>Biens publies</p>
            </div>
            <em>En ligne</em>
          </div>
          <div className={`${styles.statCard} ${styles.statCardOrange}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <div>
              <strong>{pending}</strong>
              <p>En attente validation</p>
            </div>
            <em>Sous 72h</em>
          </div>
          <div className={`${styles.statCard} ${styles.statCardGreen}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <div>
              <strong>{totalViews.toLocaleString("fr-FR")}</strong>
              <p>Vues cumulees</p>
            </div>
            <em>30 derniers jours</em>
          </div>
        </section>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Offres publiees</h2>
              <p>{total} biens visibles. Modifiez-les a tout moment.</p>
            </div>
            <label className={styles.search}>
              <span>Filtrer</span>
              <input type="search" placeholder="Titre, ville, categorie" />
            </label>
          </div>
          <div className={styles.goodsGrid}>
            {mockAds.map((ad) => (
              <article className={styles.goodCard} key={ad.id}>
                <Image src={ad.image} alt={ad.title} width={320} height={210} />
                <div>
                  <span>{ad.loaPossible ? "LOA" : "Location"}</span>
                  <h2>{ad.title}</h2>
                  <p>{ad.location} - {ad.availability}</p>
                  <strong>{ad.price.toLocaleString("fr-FR")} FCFA</strong>
                  <div className={styles.goodActions}>
                    <Link href={`/annonces/${ad.id}`}>Voir</Link>
                    <Link href={`/vendeur/publier?modifier=${ad.id}`}>Modifier</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </SellerShell>
  );
}
