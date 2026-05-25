import Link from "next/link";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

const myRequests = [
  { id: "JR-204", title: "Generatrice 5 kVA - Cotonou", type: "Standard", date: "23/05/2026", status: "5 propositions", price: "2 500 FCFA" },
  { id: "JR-198", title: "Bureau partage Akpakpa", type: "Express", date: "18/05/2026", status: "Conseiller attribue", price: "5 000 FCFA + 3%" },
];

export default function SellerRequestsPage() {
  const total = myRequests.length;
  const standard = myRequests.filter((r) => r.type === "Standard").length;
  const express = myRequests.filter((r) => r.type === "Express").length;

  return (
    <SellerShell active="/vendeur/recherches">
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <Link href="/vendeur" className={styles.backBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <div className={styles.pageHeaderTitle}>
            <p className={styles.kicker}>Locataire actif</p>
            <h1>Je recherche</h1>
            <p>Publiez ce que vous cherchez. Les proprietaires vous envoient des propositions ciblees.</p>
          </div>
          <Link href="/vendeur/recherches/nouvelle" className={styles.headerCta}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Publier une demande
          </Link>
        </header>

        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardBlue}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <div>
              <strong>{total}</strong>
              <p>Demandes actives</p>
            </div>
            <em>Toutes categories</em>
          </div>
          <div className={`${styles.statCard} ${styles.statCardGreen}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <div>
              <strong>{standard}</strong>
              <p>Standard</p>
            </div>
            <em>2 500 FCFA / demande</em>
          </div>
          <div className={`${styles.statCard} ${styles.statCardOrange}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </span>
            <div>
              <strong>{express}</strong>
              <p>Express</p>
            </div>
            <em>5 000 FCFA + 3 %</em>
          </div>
        </section>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Mes demandes publiees</h2>
              <p>Les propositions arrivent dans votre boite de notifications.</p>
            </div>
            <label className={styles.search}>
              <span>Filtrer</span>
              <input type="search" placeholder="Reference, categorie" />
            </label>
          </div>
          <div className={styles.itemList}>
            {myRequests.map((req) => (
              <div className={styles.rowItem} key={req.id}>
                <span style={{ background: req.type === "Express" ? "#ffe6b3" : "#d5ecfb", color: req.type === "Express" ? "#b45309" : "#1d4ed8" }}>{req.type === "Express" ? "E" : "S"}</span>
                <div>
                  <strong>{req.title}</strong>
                  <p>{req.id} - {req.date} - {req.price}</p>
                </div>
                <em>{req.status}</em>
              </div>
            ))}
          </div>
        </article>
      </section>
    </SellerShell>
  );
}
