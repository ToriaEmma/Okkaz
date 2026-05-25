import Link from "next/link";
import { mockAds } from "@/lib/data";
import SellerShell from "./SellerShell";
import styles from "./vendeur.module.css";

const reveals = [
  { title: "Mercedes-Benz Classe G", ref: "DEV-2C2A9E", date: "23/05/2026", status: "Numero devoile" },
  { title: "iPhone 15 Pro Max 256GB", ref: "DEV-B6AF15", date: "21/05/2026", status: "Numero devoile" },
  { title: "Studio meuble - Fidjrosse", ref: "DEV-44C720", date: "14/05/2026", status: "Numero devoile" },
];

const activity = [
  { day: "Lu", value: "44%" },
  { day: "Ma", value: "64%" },
  { day: "Me", value: "38%" },
  { day: "Je", value: "82%" },
  { day: "Ve", value: "58%" },
  { day: "Sa", value: "28%" },
  { day: "Di", value: "48%" },
];

export default function SellerDashboard() {
  const visibleAds = mockAds.slice(0, 4);

  return (
    <SellerShell active="/vendeur">
      <section className={styles.content}>
        <header className={styles.header}>
          <div className={styles.welcomeText}>
            <p className={styles.kicker}>Mon espace</p>
            <h1>Bon retour, Emma TODEDJI</h1>
          </div>
          <label className={styles.search}>
            <span>Rechercher</span>
            <input type="search" placeholder="Bien, demande, categorie" />
          </label>
        </header>

        <section className={styles.dashboardGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.statsGrid}>
              <Link href="/vendeur/biens" className={`${styles.statCard} ${styles.statCardBlue}`}>
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                </span>
                <div>
                  <strong>{visibleAds.length}</strong>
                  <p>Biens en ligne</p>
                </div>
                <em>Visibles</em>
              </Link>
              <Link href="/vendeur/publier" className={`${styles.statCard} ${styles.statCardGreen}`}>
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
                <div>
                  <strong>1</strong>
                  <p>Nouvelle offre</p>
                </div>
                <em>Publier</em>
              </Link>
              <Link href="/vendeur/recherches" className={`${styles.statCard} ${styles.statCardOrange}`}>
                <span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </span>
                <div>
                  <strong>2</strong>
                  <p>Demandes actives</p>
                </div>
                <em>Je recherche</em>
              </Link>
            </section>

            <section className={styles.twoColumns}>
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2>Activite des biens</h2>
                    <p><span>+30%</span> de vues cette semaine</p>
                  </div>
                  <Link href="/vendeur/biens">Voir</Link>
                </div>
                <div className={styles.chart} aria-label="Activite hebdomadaire">
                  {activity.map((item) => (
                    <div className={styles.bar} key={item.day}>
                      <span style={{ height: item.value }} />
                      <em>{item.day}</em>
                    </div>
                  ))}
                </div>
              </article>

              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2>Actions rapides</h2>
                    <p>Les raccourcis essentiels.</p>
                  </div>
                </div>
                <div className={styles.actionList}>
                  <Link href="/vendeur/publier">Publier une offre</Link>
                  <Link href="/vendeur/recherches">Publier une demande &quot;Je recherche&quot;</Link>
                  <Link href="/vendeur/biens">Gerer mes biens</Link>
                  <Link href="/vendeur/profil">Mettre a jour le profil &amp; KYC</Link>
                </div>
              </article>
            </section>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Biens publies</h2>
                  <p>{visibleAds.length} offres visibles sur OKKAZ</p>
                </div>
                <Link href="/vendeur/biens">Tout voir</Link>
              </div>
              <div className={styles.itemList}>
                {visibleAds.map((ad) => (
                  <Link href={`/annonces/${ad.id}`} className={styles.rowItem} key={ad.id}>
                    <span>{ad.category[0]}</span>
                    <div>
                      <strong>{ad.title}</strong>
                      <p>{ad.location} - {ad.availability}</p>
                    </div>
                    <em>{ad.price.toLocaleString("fr-FR")} FCFA</em>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <aside className={styles.sideColumn}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Devoilements</h2>
                  <p>{reveals.length} clients ont debloque vos numeros</p>
                </div>
              </div>
              <div className={styles.itemList}>
                {reveals.map((r) => (
                  <div className={styles.rowItem} key={r.ref}>
                    <span>{r.title[0]}</span>
                    <div>
                      <strong>{r.title}</strong>
                      <p>{r.ref} - {r.date}</p>
                    </div>
                    <em>{r.status}</em>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </section>
    </SellerShell>
  );
}
