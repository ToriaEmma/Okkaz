import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const profiles = [
  { name: "Nadia H.", role: "Locataire", city: "Cotonou", status: "Piece valide" },
  { name: "Auto Prestige", role: "Proprietaire Pro", city: "Fidjrosse", status: "RCCM attendu" },
  { name: "Eric A.", role: "Garant", city: "Porto-Novo", status: "Adresse a verifier" },
];

export default function AdminKycPage() {
  return (
    <AdminShell active="/admin/kyc">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Verification KYC</h1>
            <p>Simule la validation identite, proprietaire et garant.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Nom, telephone, ville" />
          </label>
          <div className={styles.avatar}>K</div>
        </header>

        <section className={styles.actionPageGrid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Profils a verifier</h2>
              <button type="button">Assigner</button>
            </div>
            <div className={styles.actionList}>
              {profiles.map((profile) => (
                <div className={styles.actionItem} key={profile.name}>
                  <span>{profile.role}</span>
                  <div>
                    <strong>{profile.name}</strong>
                    <p>{profile.city} - {profile.status}</p>
                  </div>
                  <button type="button">Ouvrir</button>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.simulator}>
            <h2>Decision KYC</h2>
            <p>Simulation de traitement du dossier selectionne.</p>
            <label>
              Niveau de confiance
              <select defaultValue="standard">
                <option value="simple">Simple</option>
                <option value="standard">Standard</option>
                <option value="renforce">Renforce</option>
              </select>
            </label>
            <label>
              Commentaire admin
              <textarea placeholder="Ex: demander justificatif de revenus lisible" />
            </label>
            <div className={styles.buttonRow}>
              <button type="button">Valider KYC</button>
              <button type="button">Mettre en attente</button>
            </div>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
