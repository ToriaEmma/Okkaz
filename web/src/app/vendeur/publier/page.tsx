import Link from "next/link";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

export default function SellerPublishPage() {
  return (
    <SellerShell active="/vendeur/publier">
      <section className={styles.content}>
        <header className={styles.pageHeader}>
          <Link href="/vendeur" className={styles.backBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <div className={styles.pageHeaderTitle}>
            <p className={styles.kicker}>Publication</p>
            <h1>Publier un bien</h1>
            <p>Ajoutez une offre. Le client paie 1 500 FCFA a OKKAZ avant d&apos;obtenir votre numero.</p>
          </div>
          <span className={styles.publishStepBadge}>Etape 1 / 1</span>
        </header>

        <section className={styles.publishLayout}>
          <form className={styles.publishForm}>
            <div className={styles.formCardHeader}>
              <h2>Informations de l&apos;offre</h2>
              <span className={styles.formCardBadge}>Brouillon</span>
            </div>

            {/* Photos */}
            <fieldset className={styles.formFieldset}>
              <legend>Photos du bien</legend>
              <div className={styles.photoGrid}>
                {[0, 1, 2, 3].map((idx) => (
                  <label key={idx} className={`${styles.photoSlot} ${idx === 0 ? styles.photoSlotMain : ""}`}>
                    {idx === 0 && <span className={styles.photoSlotBadge}>Principale</span>}
                    <span className={styles.photoSlotIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </span>
                    <span className={styles.photoSlotLabel}>Photo {idx + 1}</span>
                    <span className={styles.photoSlotPlus}>+</span>
                    <input type="file" accept="image/*" className={styles.photoInput} />
                  </label>
                ))}
              </div>
              <small className={styles.photoHint}>JPG, PNG ou WebP - 4 photos maximum - 5 Mo / photo. La photo principale apparait dans les resultats de recherche.</small>
            </fieldset>

            {/* Details */}
            <fieldset className={styles.formFieldset}>
              <legend>Description du bien</legend>
              <div className={styles.formGrid}>
                <label className={`${styles.formLabel} ${styles.fullWidth}`}>
                  Titre de l&apos;annonce
                  <input className={styles.formInput} type="text" placeholder="Ex: Mercedes-Benz Classe G - Cotonou" />
                </label>

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
                  Etat
                  <select className={styles.formSelect} defaultValue="bon">
                    <option value="neuf">Neuf</option>
                    <option value="excellent">Excellent etat</option>
                    <option value="bon">Bon etat</option>
                    <option value="correct">Etat correct</option>
                  </select>
                </label>

                <label className={`${styles.formLabel} ${styles.fullWidth}`}>
                  Description
                  <textarea className={styles.formTextarea} rows={4} placeholder="Decrivez le bien, ses points forts et les conditions importantes." />
                </label>
              </div>
            </fieldset>

            {/* Mode & price */}
            <fieldset className={styles.formFieldset}>
              <legend>Mode &amp; prix</legend>
              <div className={styles.formGrid}>
                <label className={styles.formLabel}>
                  Mode propose
                  <select className={styles.formSelect} defaultValue="location">
                    <option value="location">Location simple</option>
                    <option value="loa">Location avec option d&apos;achat</option>
                    <option value="vente">Vente</option>
                    <option value="troc">Troc</option>
                  </select>
                </label>

                <label className={styles.formLabel}>
                  Prix
                  <input className={styles.formInput} type="text" placeholder="150 000 FCFA" />
                  <span className={styles.inputHint}>Indiquez le montant en FCFA, sans frais OKKAZ</span>
                </label>
              </div>
            </fieldset>

            {/* Privacy / validation */}
            <div className={styles.privacyOption}>
              <div className={styles.privacyContent}>
                <span className={styles.privacyIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <div className={styles.privacyText}>
                  <strong>Validation OKKAZ avant publication</strong>
                  <p>Notre equipe verifie chaque annonce avant qu&apos;elle soit visible.</p>
                </div>
              </div>
              <label className={styles.toggleSwitch}>
                <input type="checkbox" defaultChecked />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.publishActions}>
              <button type="button" className={styles.btnCancel}>Enregistrer brouillon</button>
              <button type="submit" className={styles.btnSave}>Soumettre a validation</button>
            </div>
          </form>
        </section>
      </section>
    </SellerShell>
  );
}
