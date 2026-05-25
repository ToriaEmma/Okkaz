import Link from "next/link";
import SellerShell from "../../SellerShell";
import styles from "../../vendeur.module.css";

export default function NewRequestPage() {
  return (
    <SellerShell active="/vendeur/recherches">
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <Link href="/vendeur/recherches" className={styles.backBtn} aria-label="Retour aux demandes">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <div className={styles.pageHeaderTitle}>
            <p className={styles.kicker}>Locataire actif</p>
            <h1>Publier une demande</h1>
            <p>Decrivez precisement votre besoin. Les proprietaires verifies vous enverront leurs propositions.</p>
          </div>
          <span className={styles.publishStepBadge}>Etape 1 / 1</span>
        </header>

        <section className={styles.publishLayout}>
          <form className={styles.publishForm}>
            <div className={styles.formCardHeader}>
              <h2>Votre besoin</h2>
              <span className={styles.formCardBadge}>Brouillon</span>
            </div>

            <fieldset className={styles.formFieldset}>
              <legend>Type de demande</legend>
              <div className={styles.formGrid}>
                <label className={styles.formLabel}>
                  Categorie
                  <select className={styles.formSelect} defaultValue="">
                    <option value="" disabled>Choisir une categorie</option>
                    <option>Vehicules</option>
                    <option>Immobilier</option>
                    <option>Electronique</option>
                    <option>Equipements Pro</option>
                    <option>Evenementiel</option>
                    <option>Mobilier</option>
                  </select>
                </label>

                <label className={styles.formLabel}>
                  Formule
                  <select className={styles.formSelect} defaultValue="standard">
                    <option value="standard">Standard - 2 500 FCFA</option>
                    <option value="express">Express - 5 000 FCFA + 3 % du bien</option>
                  </select>
                  <span className={styles.inputHint}>Express : conseiller dedie - reserve aux proprietaires Premium</span>
                </label>

                <label className={`${styles.formLabel} ${styles.fullWidth}`}>
                  Titre de la demande
                  <input className={styles.formInput} type="text" placeholder="Ex: Generatrice 5 kVA pour evenement 1 jour" />
                </label>

                <label className={`${styles.formLabel} ${styles.fullWidth}`}>
                  Description du besoin
                  <textarea className={styles.formTextarea} rows={4} placeholder="Specifications precises, etat attendu, contraintes importantes..." />
                </label>
              </div>
            </fieldset>

            <fieldset className={styles.formFieldset}>
              <legend>Conditions</legend>
              <div className={styles.formGrid}>
                <label className={styles.formLabel}>
                  Budget max
                  <input className={styles.formInput} type="text" placeholder="80 000 FCFA" />
                </label>

                <label className={styles.formLabel}>
                  Ville / Quartier
                  <input className={styles.formInput} type="text" placeholder="Cotonou, Fidjrosse" />
                </label>

                <label className={styles.formLabel}>
                  A partir du
                  <input className={styles.formInput} type="date" />
                </label>

                <label className={styles.formLabel}>
                  Duree estimee
                  <input className={styles.formInput} type="text" placeholder="3 jours" />
                </label>
              </div>
            </fieldset>

            <div className={styles.privacyOption}>
              <div className={styles.privacyContent}>
                <span className={styles.privacyIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <div className={styles.privacyText}>
                  <strong>Mon numero reste masque</strong>
                  <p>OKKAZ recoit les propositions et vous les transmet sans devoiler vos coordonnees.</p>
                </div>
              </div>
              <label className={styles.toggleSwitch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.publishActions}>
              <Link href="/vendeur/recherches" className={styles.btnCancel}>Annuler</Link>
              <button type="submit" className={styles.btnSave}>Publier la demande</button>
            </div>
          </form>
        </section>
      </section>
    </SellerShell>
  );
}
