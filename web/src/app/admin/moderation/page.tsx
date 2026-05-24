import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const reports = [
  { title: "Photo non conforme", target: "Annonce OKK-DIGI-003", level: "Image" },
  { title: "Prix suspect", target: "Annonce OKK-AUTO-001", level: "Fraude" },
  { title: "Message abusif", target: "Conversation #184", level: "Chat" },
];

export default function AdminModerationPage() {
  return (
    <AdminShell active="/admin/moderation">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Moderation</h1>
            <p>Controle contenus, signalements, fraude et conversations sensibles.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Signalement, annonce, message" />
          </label>
          <div className={styles.avatar}>M</div>
        </header>

        <section className={styles.actionPageGrid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Signalements</h2>
              <button type="button">Prioriser</button>
            </div>
            <div className={styles.actionList}>
              {reports.map((report) => (
                <div className={styles.actionItem} key={report.title}>
                  <span>{report.level}</span>
                  <div>
                    <strong>{report.title}</strong>
                    <p>{report.target}</p>
                  </div>
                  <button type="button">Examiner</button>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.simulator}>
            <h2>Decision moderation</h2>
            <label>
              Action
              <select defaultValue="masquer">
                <option value="masquer">Masquer le contenu</option>
                <option value="avertir">Avertir utilisateur</option>
                <option value="bloquer">Bloquer compte</option>
              </select>
            </label>
            <textarea placeholder="Motif de moderation" />
            <button type="button">Appliquer</button>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
