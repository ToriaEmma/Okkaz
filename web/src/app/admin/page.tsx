import Link from "next/link";
import AdminShell from "./AdminShell";
import styles from "./admin.module.css";

const stats = [
  { label: "Annonces a valider", value: "8", meta: "File sous 72h", icon: "A", href: "/admin/annonces" },
  { label: "KYC en attente", value: "12", meta: "Pieces a verifier", icon: "K", href: "/admin/kyc" },
  { label: "Mises en contact", value: "1 248", meta: "Ce mois", icon: "P", href: "/admin/paiements" },
  { label: "Revenu collecte", value: "1.87M", meta: "FCFA - 30 j", icon: "$", href: "/admin/paiements" },
];

const todo = [
  { time: "Urgent", title: "8 annonces a valider", type: "Delai 72h depasse pour 2", href: "/admin/annonces" },
  { time: "Aujourd'hui", title: "12 dossiers KYC", type: "Pieces d'identite", href: "/admin/kyc" },
  { time: "Aujourd'hui", title: "3 signalements", type: "Suspendre ou avertir", href: "/admin/utilisateurs" },
  { time: "Demain", title: "Rapprochement Mobile Money", type: "MTN + Moov + Celtiis", href: "/admin/paiements" },
];

const topCategories = [
  { name: "Immobilier", contacts: 312, share: 88 },
  { name: "Vehicules", contacts: 264, share: 74 },
  { name: "Electronique", contacts: 198, share: 56 },
  { name: "Equipements Pro", contacts: 154, share: 44 },
  { name: "Evenementiel", contacts: 124, share: 35 },
  { name: "Mobilier", contacts: 96, share: 27 },
];

const dailyContacts = [42, 64, 38, 82, 58, 71, 95];

const notifications = [
  { level: "alerte", title: "2 annonces depassent 72h", text: "Validation requise immediatement.", href: "/admin/annonces" },
  { level: "info", title: "Nouveau retrait Pro", text: "Immo Benin a souscrit Premium mensuel.", href: "/admin/abonnements" },
  { level: "warning", title: "3 signalements actifs", text: "Comportements suspects a moderer.", href: "/admin/utilisateurs" },
  { level: "info", title: "Nouvel abonnement Premium", text: "Auto Plus Cotonou - Hebdo souscrit.", href: "/admin/abonnements" },
];

const auditLog = [
  { actor: "Admin", action: "Annonce validee", target: "Mercedes-Benz Classe G", time: "Il y a 12 min" },
  { actor: "Admin", action: "KYC approuve", target: "Emma TODEDJI", time: "Il y a 38 min" },
  { actor: "Admin", action: "Utilisateur suspendu", target: "compte #4218", time: "Il y a 1 h" },
  { actor: "Admin", action: "Prix modifie", target: "1 500 -> 1 500 FCFA mise en contact", time: "Hier" },
];

export default function AdminDashboard() {
  return (
    <AdminShell active="/admin">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Centre operations OKKAZ</h1>
            <p>Validez les annonces, controlez les paiements et suivez l&apos;activite de la plateforme.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Annonce, utilisateur, reference paiement" />
          </label>
          <div className={styles.avatar}>OK</div>
        </header>

        <section className={styles.stats} aria-label="Indicateurs MVP">
          {stats.map((item) => (
            <Link href={item.href} className={styles.statCard} key={item.label}>
              <span className={styles.icon}>{item.icon}</span>
              <div>
                <h2>{item.label}</h2>
                <p>{item.meta}</p>
              </div>
              <strong>{item.value}</strong>
            </Link>
          ))}
        </section>

        <section className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Mises en contact / jour</h2>
                <p><span>+18%</span> vs semaine derniere - indicateur cle de revenu</p>
              </div>
              <Link href="/admin/paiements">Detail</Link>
            </div>
            <div className={styles.chart} aria-hidden>
              {dailyContacts.map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className={styles.chartLabels}>
              <span>Lu</span><span>Ma</span><span>Me</span><span>Je</span><span>Ve</span><span>Sa</span><span>Di</span>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2>A faire maintenant</h2>
                <p>File operationnelle priorisee</p>
              </div>
            </div>
            <div className={styles.scheduleList}>
              {todo.map((item) => (
                <Link className={styles.scheduleItem} href={item.href} key={`${item.time}-${item.title}`}>
                  <span>{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.type}</p>
                  </div>
                  <em>Ouvrir</em>
                </Link>
              ))}
            </div>
          </article>

          <aside className={styles.sideRail}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Top categories</h2>
                  <p>Par mises en contact ce mois</p>
                </div>
                <Link href="/admin/categories">Gerer</Link>
              </div>
              <div className={styles.categoryList}>
                {topCategories.map((cat) => (
                  <div className={styles.categoryRow} key={cat.name}>
                    <div className={styles.categoryRowHead}>
                      <strong>{cat.name}</strong>
                      <em>{cat.contacts}</em>
                    </div>
                    <div className={styles.categoryBar}>
                      <span style={{ width: `${cat.share}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Notifications</h2>
                  <p>Alertes operationnelles</p>
                </div>
              </div>
              <div className={styles.notifList}>
                {notifications.map((notif) => (
                  <Link href={notif.href} key={notif.title} className={`${styles.notifItem} ${styles[`notif_${notif.level}`]}`}>
                    <span className={styles.notifDot} aria-hidden />
                    <div>
                      <strong>{notif.title}</strong>
                      <p>{notif.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Activite recente (audit)</h2>
              <p>Tracabilite des actions effectuees par l&apos;equipe admin.</p>
            </div>
            <button type="button">Tout l&apos;historique</button>
          </div>
          <div className={styles.auditList}>
            {auditLog.map((log, i) => (
              <div key={i} className={styles.auditRow}>
                <span className={styles.auditActor}>{log.actor}</span>
                <span className={styles.auditAction}>{log.action}</span>
                <span className={styles.auditTarget}>{log.target}</span>
                <span className={styles.auditTime}>{log.time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AdminShell>
  );
}
