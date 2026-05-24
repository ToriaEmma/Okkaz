import Link from "next/link";
import AdminShell from "./AdminShell";
import styles from "./admin.module.css";

const stats = [
  { label: "Annonces", value: "24", meta: "8 a valider", icon: "A", href: "/admin/annonces" },
  { label: "KYC", value: "31", meta: "12 urgents", icon: "K", href: "/admin/kyc" },
  { label: "Paiements", value: "2.8M", meta: "FCFA suivis", icon: "P", href: "/admin/paiements" },
];

const schedule = [
  { time: "09:30", title: "Verifier KYC", type: "Identite + revenus", href: "/admin/kyc" },
  { time: "11:00", title: "Controle annonce", type: "Documents manquants", href: "/admin/annonces" },
  { time: "14:15", title: "Litige caution", type: "Mediation", href: "/admin/litiges" },
  { time: "16:00", title: "Rapprochement", type: "Mobile Money", href: "/admin/paiements" },
];

const calendarDays = Array.from({ length: 35 }, (_, index) => index + 1);

export default function AdminDashboard() {
  return (
    <AdminShell active="/admin">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Bienvenue Admin</h1>
            <p>Choisis un espace pour simuler une action precise.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Rechercher annonce, profil, paiement" />
          </label>
          <div className={styles.avatar}>OK</div>
        </header>

        <section className={styles.stats} aria-label="Indicateurs">
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
                <h2>Activite operations</h2>
                <p><span>+8%</span> plus de dossiers que la semaine derniere</p>
              </div>
              <button type="button">Hebdo</button>
            </div>
            <div className={styles.chart} aria-hidden>
              {[42, 64, 38, 82, 58, 24, 55].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className={styles.chartLabels}>
              <span>Lu</span><span>Ma</span><span>Me</span><span>Je</span><span>Ve</span><span>Sa</span><span>Di</span>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Planning du jour</h2>
            </div>
            <div className={styles.scheduleList}>
              {schedule.map((item) => (
                <Link className={styles.scheduleItem} href={item.href} key={`${item.time}-${item.title}`}>
                  <span>{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.type}</p>
                  </div>
                  <em>Open</em>
                </Link>
              ))}
            </div>
          </article>

          <aside className={styles.sideRail}>
            <article className={styles.premium}>
              <div>
                <span>OKKAZ</span>
                <h2>Mode controle</h2>
                <p>La barre de gauche ouvre maintenant des pages dediees.</p>
                <Link href="/admin/annonces">Lancer</Link>
              </div>
            </article>

            <article className={styles.calendar}>
              <div className={styles.month}>
                <button type="button">Prev</button>
                <strong>Mai 2026</strong>
                <button type="button">Next</button>
              </div>
              <div className={styles.week}>
                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
              <div className={styles.days}>
                {calendarDays.map((day) => (
                  <span className={day === 23 ? styles.today : undefined} key={day}>{day}</span>
                ))}
              </div>
            </article>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
