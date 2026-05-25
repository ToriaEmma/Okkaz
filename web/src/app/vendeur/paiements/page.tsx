import Link from "next/link";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

const expenses = [
  { ref: "DEV-2C2A9E", title: "Mercedes-Benz Classe G", subtitle: "Acces au contact vendeur", date: "23/05/2026", method: "Mobile Money", amount: 1500 },
  { ref: "DEV-B6AF15", title: "iPhone 15 Pro Max 256GB", subtitle: "Acces au contact vendeur", date: "21/05/2026", method: "Mobile Money", amount: 1500 },
  { ref: "DEV-44C720", title: "Studio meuble - Fidjrosse", subtitle: "Acces au contact vendeur", date: "14/05/2026", method: "Carte bancaire", amount: 1500 },
  { ref: "JR-204", title: "Generatrice 5 kVA", subtitle: "Publication 'Je recherche'", date: "12/05/2026", method: "Mobile Money", amount: 2500 },
];

export default function SellerPaymentsPage() {
  const total = expenses.reduce((sum, row) => sum + row.amount, 0);
  const contactAccess = expenses.filter((e) => e.ref.startsWith("DEV")).length;
  const requests = expenses.filter((e) => e.ref.startsWith("JR")).length;

  return (
    <SellerShell active="/vendeur/paiements">
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <Link href="/vendeur" className={styles.backBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <div className={styles.pageHeaderTitle}>
            <p className={styles.kicker}>Mouvements</p>
            <h1>Mes paiements</h1>
            <p>Vos depenses sur OKKAZ. Les locations elles-memes se reglent directement avec le proprietaire, hors plateforme.</p>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCardBlue}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            <div>
              <strong>{total.toLocaleString("fr-FR")} FCFA</strong>
              <p>Total depense</p>
            </div>
            <em>30 derniers jours</em>
          </div>
          <div className={`${styles.statCard} ${styles.statCardGreen}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <div>
              <strong>{contactAccess}</strong>
              <p>Acces contacts</p>
            </div>
            <em>1 500 FCFA / contact</em>
          </div>
          <div className={`${styles.statCard} ${styles.statCardOrange}`}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <div>
              <strong>{requests}</strong>
              <p>Demandes &quot;Je recherche&quot;</p>
            </div>
            <em>2 500 FCFA / demande</em>
          </div>
        </section>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Historique des transactions</h2>
              <p>Tous les paiements verses a OKKAZ.</p>
            </div>
            <label className={styles.search}>
              <span>Filtrer</span>
              <input type="search" placeholder="Reference, type" />
            </label>
          </div>
          <div className={styles.itemList}>
            {expenses.map((row) => (
              <div className={styles.rowItem} key={row.ref}>
                <span>{row.ref.startsWith("DEV") ? "C" : "?"}</span>
                <div>
                  <strong>{row.title}</strong>
                  <p>{row.subtitle} - {row.ref} - {row.date} - {row.method}</p>
                </div>
                <em>{row.amount.toLocaleString("fr-FR")} FCFA</em>
              </div>
            ))}
          </div>
        </article>
      </section>
    </SellerShell>
  );
}
