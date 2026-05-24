import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const plans = [
  { name: "Gratuit", price: "0 FCFA", rule: "4 photos, validation 72h" },
  { name: "Premium semaine", price: "3 000 FCFA", rule: "Validation express" },
  { name: "Premium mois", price: "10 000 FCFA", rule: "Badge Pro, photos illimitees" },
];

export default function AdminAbonnementsPage() {
  return (
    <AdminShell active="/admin/abonnements">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Abonnements</h1>
            <p>Gestion des offres proprietaires, premiums et mises en avant.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Plan, proprietaire, facture" />
          </label>
          <div className={styles.avatar}>B</div>
        </header>

        <section className={styles.settingsGrid}>
          {plans.map((plan) => (
            <article className={styles.simulator} key={plan.name}>
              <h2>{plan.name}</h2>
              <p>{plan.rule}</p>
              <label>
                Tarif
                <input type="text" defaultValue={plan.price} />
              </label>
              <button type="button">Mettre a jour</button>
            </article>
          ))}
        </section>
      </section>
    </AdminShell>
  );
}
