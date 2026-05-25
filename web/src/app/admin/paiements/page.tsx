import Link from "next/link";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

type ServiceKey = "Mise en contact" | "Je recherche" | "Je recherche Express" | "Abonnement Premium";

const SERVICE_COLORS: Record<ServiceKey, string> = {
  "Mise en contact": "blue",
  "Je recherche": "green",
  "Je recherche Express": "orange",
  "Abonnement Premium": "violet",
};

const transactions: Array<{
  ref: string;
  service: ServiceKey;
  user: string;
  target: string;
  method: string;
  date: string;
  amount: number;
  status: "Encaisse" | "En attente" | "Echec";
}> = [
  { ref: "MIS-9981", service: "Mise en contact", user: "Yann A.", target: "Mercedes-Benz Classe G", method: "MTN MoMo", date: "23/05/2026 14:32", amount: 1500, status: "Encaisse" },
  { ref: "MIS-9978", service: "Mise en contact", user: "Carine T.", target: "iPhone 15 Pro Max", method: "Carte Visa", date: "23/05/2026 12:08", amount: 1500, status: "Encaisse" },
  { ref: "JR-204", service: "Je recherche", user: "Adrien K.", target: "Generatrice 5 kVA", method: "Moov Money", date: "23/05/2026 11:22", amount: 2500, status: "Encaisse" },
  { ref: "MIS-9974", service: "Mise en contact", user: "Saliou D.", target: "Studio Fidjrosse", method: "MTN MoMo", date: "23/05/2026 09:47", amount: 1500, status: "Encaisse" },
  { ref: "ABO-PRO-127", service: "Abonnement Premium", user: "Immo Benin", target: "Mensuel - mai 2026", method: "Carte Visa", date: "22/05/2026 18:12", amount: 10000, status: "Encaisse" },
  { ref: "JRE-088", service: "Je recherche Express", user: "Lara D.", target: "Bureau partage Akpakpa", method: "MTN MoMo", date: "22/05/2026 16:40", amount: 5000, status: "Encaisse" },
  { ref: "MIS-9962", service: "Mise en contact", user: "Patrice N.", target: "Camionnette 3T", method: "Moov Money", date: "22/05/2026 11:03", amount: 1500, status: "En attente" },
  { ref: "ABO-HEBD-44", service: "Abonnement Premium", user: "Auto Plus Cotonou", target: "Hebdo - sem 21", method: "Celtiis Cash", date: "21/05/2026 19:55", amount: 3000, status: "Encaisse" },
  { ref: "MIS-9951", service: "Mise en contact", user: "Mireille O.", target: "Climatiseur split 1.5 CV", method: "Carte Visa", date: "21/05/2026 13:18", amount: 1500, status: "Echec" },
];

export default function AdminPaiementsPage() {
  const okTransactions = transactions.filter((t) => t.status === "Encaisse");
  const totalRevenue = okTransactions.reduce((s, t) => s + t.amount, 0);
  const counts = {
    mise: okTransactions.filter((t) => t.service === "Mise en contact").length,
    rech: okTransactions.filter((t) => t.service === "Je recherche").length,
    expr: okTransactions.filter((t) => t.service === "Je recherche Express").length,
    abo: okTransactions.filter((t) => t.service === "Abonnement Premium").length,
  };

  return (
    <AdminShell active="/admin/paiements">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Paiements &amp; transactions</h1>
            <p>Toutes les recettes OKKAZ par service : mises en contact, demandes &quot;Je recherche&quot; et abonnements Premium.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Reference, utilisateur, annonce" />
          </label>
          <div className={styles.avatar}>P</div>
        </header>

        <section className={styles.stats}>
          <Link href="/admin/paiements?filtre=tout" className={styles.statCard}>
            <span className={styles.icon}>$</span>
            <div>
              <h2>Revenu total</h2>
              <p>30 derniers jours</p>
            </div>
            <strong>{totalRevenue.toLocaleString("fr-FR")} FCFA</strong>
          </Link>
          <Link href="/admin/paiements?filtre=mise" className={styles.statCard}>
            <span className={styles.icon}>C</span>
            <div>
              <h2>Mises en contact</h2>
              <p>1 500 FCFA / acte</p>
            </div>
            <strong>{counts.mise}</strong>
          </Link>
          <Link href="/admin/paiements?filtre=recherche" className={styles.statCard}>
            <span className={styles.icon}>?</span>
            <div>
              <h2>Je recherche</h2>
              <p>Standard {counts.rech} - Express {counts.expr}</p>
            </div>
            <strong>{counts.rech + counts.expr}</strong>
          </Link>
          <Link href="/admin/abonnements" className={styles.statCard}>
            <span className={styles.icon}>B</span>
            <div>
              <h2>Abonnements</h2>
              <p>Hebdo &amp; mensuel</p>
            </div>
            <strong>{counts.abo}</strong>
          </Link>
        </section>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Toutes les transactions</h2>
              <p>Argent recu par OKKAZ - Mobile Money &amp; carte bancaire</p>
            </div>
            <button type="button">Exporter CSV</button>
          </div>
          <div className={styles.txTable}>
            <div className={styles.txTableHead}>
              <span>Reference</span>
              <span>Service</span>
              <span>Utilisateur</span>
              <span>Methode</span>
              <span>Date</span>
              <span>Montant</span>
              <span>Statut</span>
            </div>
            {transactions.map((t) => (
              <div className={styles.txTableRow} key={t.ref}>
                <span className={styles.txRef}>{t.ref}</span>
                <span>
                  <em className={`${styles.servicePill} ${styles[`pill_${SERVICE_COLORS[t.service]}`]}`}>{t.service}</em>
                </span>
                <span>
                  <strong>{t.user}</strong>
                  <small>{t.target}</small>
                </span>
                <span>{t.method}</span>
                <span>{t.date}</span>
                <span className={styles.txAmount}>{t.amount.toLocaleString("fr-FR")} FCFA</span>
                <span>
                  <em className={`${styles.statusPill} ${styles[`status_${t.status === "Encaisse" ? "ok" : t.status === "En attente" ? "wait" : "fail"}`]}`}>{t.status}</em>
                </span>
              </div>
            ))}
          </div>
        </article>

      </section>
    </AdminShell>
  );
}
