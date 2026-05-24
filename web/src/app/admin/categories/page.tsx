import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const categories = ["Vehicules", "Immobilier", "Electronique", "Equipements Pro", "Evenementiel", "Mobilier"];

export default function AdminCategoriesPage() {
  return (
    <AdminShell active="/admin/categories">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Categories</h1>
            <p>Organise les types de biens, filtres et exigences par categorie.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Categorie" />
          </label>
          <div className={styles.avatar}>G</div>
        </header>

        <section className={styles.actionPageGrid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Categories actives</h2>
              <button type="button">Reordonner</button>
            </div>
            <div className={styles.actionList}>
              {categories.map((category) => (
                <div className={styles.actionItem} key={category}>
                  <span>Actif</span>
                  <div>
                    <strong>{category}</strong>
                    <p>Filtres, cautions et conditions personnalisables.</p>
                  </div>
                  <button type="button">Editer</button>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.simulator}>
            <h2>Nouvelle categorie</h2>
            <label>
              Nom
              <input type="text" placeholder="Ex: Materiel agricole" />
            </label>
            <label>
              Caution minimale
              <input type="text" placeholder="50 000 FCFA" />
            </label>
            <button type="button">Ajouter</button>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
