import Link from "next/link";
import { mockAds } from "@/lib/data";
import SellerShell from "./SellerShell";
import styles from "./vendeur.module.css";

const payments = [
  { title: "Mercedes-Benz Classe G", ref: "DEVOILEMENT #2C2A9E", date: "23/05/2026", status: "Numero devoile", amount: "1 500 FCFA" },
  { title: "iPhone 15 Pro Max 256GB", ref: "DEVOILEMENT #B6AF15", date: "21/05/2026", status: "Numero devoile", amount: "1 500 FCFA" },
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
          <div>
            <p className={styles.kicker}>Mon espace</p>
            <h1>Bon retour, Emma TODEDJI</h1>
            <p>Publiez vos biens. Quand un client est interesse, il paie 1 500 FCFA a OKKAZ pour voir votre numero et vous appeler hors plateforme.</p>
          </div>
          <label className={styles.search}>
            <span>Rechercher</span>
            <input type="search" placeholder="Bien, paiement, categorie" />
          </label>
          <div className={styles.avatar}>ET</div>
        </header>

        <section className={styles.dashboardGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span>P</span>
                <div>
                  <strong>{payments.length}</strong>
                  <p>Numeros devoiles</p>
                </div>
                <em>Frais OKKAZ</em>
              </div>
              <Link href="/vendeur/biens" className={styles.statCard}>
                <span>B</span>
                <div>
                  <strong>{visibleAds.length}</strong>
                  <p>Biens en ligne</p>
                </div>
                <em>Visibles</em>
              </Link>
              <Link href="/vendeur/publier" className={styles.statCard}>
                <span>+</span>
                <div>
                  <strong>1</strong>
                  <p>Nouvelle offre</p>
                </div>
                <em>Publier</em>
              </Link>
            </section>

            <section className={styles.twoColumns}>
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2>Activite des biens</h2>
                    <p><span>+30%</span> de contacts cette semaine</p>
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
                  <Link href="/vendeur/biens">Gerer mes biens</Link>
                  <Link href="/vendeur/profil">Mettre a jour le profil</Link>
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
                  <p>{payments.length} numeros consultes</p>
                </div>
              </div>
              <div className={styles.paymentList}>
                {payments.map((payment) => (
                  <div className={styles.paymentItem} key={payment.ref}>
                    <span>{payment.title[0]}</span>
                    <div>
                      <strong>{payment.title}</strong>
                      <p>{payment.ref} - {payment.date}</p>
                    </div>
                    <em>{payment.amount}</em>
                    <small>{payment.status}</small>
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
