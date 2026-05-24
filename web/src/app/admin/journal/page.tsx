import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const logs = [
  { time: "06:24", actor: "Admin OKKAZ", action: "Annonce OKK-AUTO-001 approuvee" },
  { time: "06:12", actor: "Finance", action: "Paiement PAY-0428 rapproche" },
  { time: "05:58", actor: "KYC", action: "Profil Nadia H. valide niveau standard" },
  { time: "05:41", actor: "Moderation", action: "Signalement conversation #184 ouvert" },
];

export default function AdminJournalPage() {
  return (
    <AdminShell active="/admin/journal">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Journal admin</h1>
            <p>Trace des decisions, validations et actions sensibles.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Action, agent, reference" />
          </label>
          <div className={styles.avatar}>J</div>
        </header>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Activite recente</h2>
            <button type="button">Exporter</button>
          </div>
          <div className={styles.actionList}>
            {logs.map((log) => (
              <div className={styles.actionItem} key={`${log.time}-${log.action}`}>
                <span>{log.time}</span>
                <div>
                  <strong>{log.actor}</strong>
                  <p>{log.action}</p>
                </div>
                <button type="button">Details</button>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AdminShell>
  );
}
