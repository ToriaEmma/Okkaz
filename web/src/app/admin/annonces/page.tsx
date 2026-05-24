import Image from "next/image";
import { mockAds } from "@/lib/data";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const checks = ["Photos nettes", "Prix coherent", "Caution definie", "Documents proprietaire"];

export default function AdminAnnoncesPage() {
  return (
    <AdminShell active="/admin/annonces">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Validation annonces</h1>
            <p>Controle chaque bien avant publication sur OKKAZ.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Reference, ville, proprietaire" />
          </label>
          <div className={styles.avatar}>A</div>
        </header>

        <section className={styles.actionPageGrid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>File de controle</h2>
              <button type="button">Filtrer</button>
            </div>
            <div className={styles.table}>
              {mockAds.map((ad) => (
                <div className={styles.tableRow} key={ad.id}>
                  <Image src={ad.image} alt={ad.title} width={48} height={48} />
                  <div>
                    <strong>{ad.title}</strong>
                    <p>{ad.reference} - {ad.location}</p>
                  </div>
                  <span>{ad.loaPossible ? "LOA" : "Location"}</span>
                  <span>{ad.deposit.toLocaleString("fr-FR")} FCFA</span>
                  <button type="button">Controler</button>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.simulator}>
            <h2>Simulation controle</h2>
            <p>Choix admin avant publication.</p>
            <div className={styles.checkList}>
              {checks.map((check) => (
                <label key={check}>
                  <input type="checkbox" defaultChecked={check !== "Documents proprietaire"} />
                  {check}
                </label>
              ))}
            </div>
            <textarea placeholder="Note interne pour le proprietaire" />
            <div className={styles.buttonRow}>
              <button type="button">Approuver</button>
              <button type="button">Demander correction</button>
            </div>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
