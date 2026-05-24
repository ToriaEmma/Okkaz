import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const users = [
  { name: "Nadia H.", type: "Locataire", status: "Actif", risk: "Standard" },
  { name: "Eric A.", type: "Garant", status: "A verifier", risk: "Renforce" },
  { name: "Joelle M.", type: "Beneficiaire", status: "Limite", risk: "Simple" },
];

export default function AdminUtilisateursPage() {
  return (
    <AdminShell active="/admin/utilisateurs">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Utilisateurs</h1>
            <p>Gestion des locataires, beneficiaires, garants et historiques.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Nom, telephone, role" />
          </label>
          <div className={styles.avatar}>U</div>
        </header>

        <section className={styles.actionPageGrid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Comptes utilisateurs</h2>
              <button type="button">Segmenter</button>
            </div>
            <div className={styles.actionList}>
              {users.map((user) => (
                <div className={styles.actionItem} key={user.name}>
                  <span>{user.type}</span>
                  <div>
                    <strong>{user.name}</strong>
                    <p>{user.status} - risque {user.risk}</p>
                  </div>
                  <button type="button">Profil</button>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.simulator}>
            <h2>Action compte</h2>
            <p>Simule suspension, limitation ou validation du compte.</p>
            <label>
              Niveau autorise
              <select defaultValue="standard">
                <option value="simple">Simple</option>
                <option value="standard">Standard</option>
                <option value="renforce">Renforce</option>
              </select>
            </label>
            <textarea placeholder="Note visible par les operations" />
            <div className={styles.buttonRow}>
              <button type="button">Valider</button>
              <button type="button">Suspendre</button>
            </div>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
