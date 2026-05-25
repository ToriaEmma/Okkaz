import Link from "next/link";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const demandes = [
  { id: "RQ-2401", type: "Express", title: "Logement 2 chambres - Cotonou", price: "5 000 FCFA + 3%", date: "23/05/2026", status: "Urgent" },
  { id: "RQ-2400", type: "Standard", title: "Berline 5 places - Calavi", price: "2 500 FCFA", date: "22/05/2026", status: "En cours" },
  { id: "RQ-2399", type: "Standard", title: "Climatiseur split 1.5 CV", price: "2 500 FCFA", date: "21/05/2026", status: "Pourvu" },
  { id: "RQ-2398", type: "Express", title: "Camionnette 3T - Porto-Novo", price: "5 000 FCFA + 3%", date: "20/05/2026", status: "Pourvu" },
];

export default function AdminDemandesPage() {
  return (
    <AdminShell active="/admin/demandes">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Demandes &quot;Je recherche&quot;</h1>
            <p>Publications payantes des locataires actifs. Express reservees aux proprietaires Premium.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Reference, categorie, ville" />
          </label>
          <div className={styles.avatar}>OK</div>
        </header>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>File des demandes</h2>
              <p>{demandes.length} publications actives - tarif standard 2 500 FCFA, Express des 5 000 FCFA + 3 % du bien</p>
            </div>
            <Link href="/admin/abonnements">Voir Premium</Link>
          </div>
          <div className={styles.scheduleList}>
            {demandes.map((demande) => (
              <div className={styles.scheduleItem} key={demande.id}>
                <span>{demande.type}</span>
                <div>
                  <strong>{demande.title}</strong>
                  <p>{demande.id} - {demande.price} - {demande.date}</p>
                </div>
                <em>{demande.status}</em>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AdminShell>
  );
}
