"use client";

import { useState } from "react";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

export default function SellerProfilePage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SellerShell active="/vendeur/profil">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Mon Espace</p>
            <h1>Mon Profil</h1>
            <p>Personnalisez votre profil pour mieux vous connecter avec vos acheteurs. Votre numéro reste privé jusqu'à validation du paiement.</p>
          </div>
          <div className={styles.headerRight}>
            <label className={styles.search}>
              <span>Rechercher</span>
              <input type="search" placeholder="Nom, téléphone, ville..." />
            </label>
            <div className={`${styles.avatar} ${styles.avatarLarge}`}>
              {previewImage ? (
                <img src={previewImage} alt="Avatar" className={styles.avatarImg} />
              ) : (
                "ET"
              )}
            </div>
          </div>
        </header>

        <section className={styles.profileLayout}>
          <form className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <h2>Mes Informations</h2>
              <span className={styles.formCardBadge}>Requis</span>
            </div>

            <fieldset className={styles.formFieldset}>
              <legend>Photo de profil</legend>
              <div 
                className={styles.photoFieldEnhanced}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className={styles.photoPreviewEnhanced}>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className={styles.photoPreviewImg} />
                  ) : (
                    <span className={styles.photoInitials}>ET</span>
                  )}
                  <div className={`${styles.photoOverlay} ${isHovering ? styles.photoOverlayVisible : ""}`}>
                    <span>Changer</span>
                  </div>
                </div>
                <div className={styles.photoFieldInfo}>
                  <label className={styles.photoUploadLabel}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className={styles.photoInput}
                    />
                    <span className={styles.photoButtonText}>
                      {previewImage ? "Modifier la photo" : "Ajouter une photo"}
                    </span>
                  </label>
                  <small>Formats acceptés : JPG, PNG, WebP. Taille max : 5Mo</small>
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.formFieldset}>
              <legend>Informations personnelles</legend>
              <div className={styles.formGridSingle}>
                <label className={styles.formLabel}>
                  <span>Nom complet</span>
                  <input type="text" defaultValue="Emma TODEDJI" className={styles.formInput} />
                </label>
                <label className={styles.formLabel}>
                  <span>Email</span>
                  <input type="email" defaultValue="emma@example.com" className={styles.formInput} />
                </label>
                <label className={styles.formLabel}>
                  <span>Numéro de téléphone</span>
                  <input type="tel" defaultValue="+229 01 97 42 18 60" className={styles.formInput} />
                  <small className={styles.inputHint}>Masqué jusqu'au paiement de 1 500 FCFA</small>
                </label>
                <label className={styles.formLabel}>
                  <span>Ville</span>
                  <input type="text" defaultValue="Cotonou" className={styles.formInput} />
                </label>
                <label className={styles.formLabel}>
                  <span>Quartier</span>
                  <input type="text" defaultValue="Fidjrosse" className={styles.formInput} />
                </label>
                <label className={styles.formLabel}>
                  <span>Type de vendeur</span>
                  <select defaultValue="particulier" className={styles.formSelect}>
                    <option value="particulier">Particulier</option>
                    <option value="professionnel">Professionnel</option>
                    <option value="agence">Agence</option>
                  </select>
                </label>
                <label className={`${styles.formLabel} ${styles.fullWidth}`}>
                  <span>Adresse complète</span>
                  <textarea defaultValue="Fidjrosse, Cotonou" className={styles.formTextarea} rows={3} />
                </label>
              </div>
            </fieldset>

            <fieldset className={styles.formFieldset}>
              <legend>Visibilité</legend>
              <div className={styles.privacyOption}>
                <div className={styles.privacyContent}>
                  <div className={styles.privacyIcon}>🔒</div>
                  <div className={styles.privacyText}>
                    <strong>Protéger mon numéro</strong>
                    <p>Autoriser OKKAZ à révéler votre numéro après paiement de 1 500 FCFA</p>
                  </div>
                </div>
                <label className={styles.toggleSwitch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>
            </fieldset>

            <div className={styles.formActions}>
              <button type="button" className={styles.btnCancel}>
                Annuler
              </button>
              <button type="submit" className={styles.btnSave}>
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </section>
      </section>
    </SellerShell>
  );
}