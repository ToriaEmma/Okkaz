import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

export default function SellerPublishPage() {
  return (
    <SellerShell active="/vendeur/publier">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Publication</p>
            <h1>Publier un bien</h1>
            <p>Ajoutez une offre. Le client paie 1 500 FCFA a OKKAZ avant d&apos;obtenir votre numero.</p>
          </div>
          <label className={styles.search}>
            <span>Rechercher</span>
            <input type="search" placeholder="Brouillon, categorie, ville" />
          </label>
          <div className={styles.avatar}>+</div>
        </header>

        <section className={styles.publishLayout}>
          <form className={styles.formCard}>
            <fieldset>
              <legend>Informations de l&apos;offre</legend>
              <label>Photos<input type="file" multiple /></label>
              <label>Titre de l&apos;annonce<input type="text" placeholder="Ex: Mercedes-Benz Classe G" /></label>
              <label>
                Categorie
                <select defaultValue="">
                  <option value="" disabled>Choisir une categorie</option>
                  <option>Vehicules</option>
                  <option>Immobilier</option>
                  <option>Electronique</option>
                  <option>Equipements Pro</option>
                  <option>Evenementiel</option>
                  <option>Mobilier</option>
                </select>
              </label>
              <label>
                Mode propose
                <select defaultValue="location">
                  <option value="location">Location simple</option>
                  <option value="loa">Location avec option d&apos;achat</option>
                  <option value="vente">Vente</option>
                  <option value="troc">Troc</option>
                </select>
              </label>
              <label>Prix<input type="text" placeholder="150 000 FCFA" /></label>
              <label>
                Etat
                <select defaultValue="bon">
                  <option value="neuf">Neuf</option>
                  <option value="excellent">Excellent etat</option>
                  <option value="bon">Bon etat</option>
                  <option value="correct">Etat correct</option>
                </select>
              </label>
              <label className={styles.fullField}>Description<textarea placeholder="Decrivez le bien et les conditions importantes." /></label>
              <div className={styles.checkLine}>
                <label><input type="checkbox" /> J&apos;accepte la validation OKKAZ avant publication</label>
              </div>
            </fieldset>

            <div className={styles.formActions}>
              <button type="button">Enregistrer brouillon</button>
              <button type="submit">Soumettre a validation</button>
            </div>
          </form>
        </section>
      </section>
    </SellerShell>
  );
}
