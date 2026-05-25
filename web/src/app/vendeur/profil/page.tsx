"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

export default function SellerProfilePage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bind form inputs to state for live updating in the mockup!
  const [name, setName] = useState("Emma TODEDJI");
  const [email, setEmail] = useState("emma@example.com");
  const [phone, setPhone] = useState("+229 01 97 42 18 60");
  const [city, setCity] = useState("Cotonou");
  const [neighborhood, setNeighborhood] = useState("Fidjrosse");
  const [sellerType, setSellerType] = useState("particulier");
  const [address, setAddress] = useState("Fidjrosse, Cotonou");
  const [protectNumber, setProtectNumber] = useState(true);

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

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profil mis à jour avec succès !");
  };

  return (
    <SellerShell active="/vendeur/profil">
      <section className={styles.content}>
        <section className={styles.centeredLayout}>
          {/* THE MOCKUP CONTAINER - NOW PLAYING THE ROLE OF THE ENTIRE INTERACTIVE FORM */}
          <form className={`${styles.mockupContainer} ${styles.mockupContainerForm}`} onSubmit={handleSave}>
            
            {/* Header: Back arrow, Title */}
            <div className={styles.mockupHeader}>
              <Link href="/vendeur" className={styles.mockupHeaderBtn} title="Retour au dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </Link>
              <h3 className={styles.mockupHeaderTitle}>Profile</h3>
              <span className={styles.mockupHeaderBtn} aria-hidden="true" style={{ visibility: "hidden" }} />
            </div>

            {/* Profile info block: Avatar uploader & stats display */}
            <div className={styles.mockupProfileInfo}>
              <div className={styles.mockupAvatarWrapper}>
                <div className={styles.mockupAvatarUploadArea} onClick={triggerFileInput} title="Changer la photo de profil">
                  {previewImage ? (
                    <img src={previewImage} alt={name} />
                  ) : (
                    <div className={styles.mockupAvatarUploadFallback}>
                      {getInitials(name) || "ET"}
                    </div>
                  )}
                  <div className={styles.mockupAvatarOverlay}>
                    <span>CHANGER</span>
                  </div>
                </div>
                {/* Hidden input for photo upload */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              <div className={styles.mockupProfileText}>
                <h4 className={styles.mockupProfileName}>{name || "Emma TODEDJI"}</h4>
                <p className={styles.mockupProfileLocation}>
                  {city && neighborhood ? `${city}, ${neighborhood}` : city || neighborhood || "Bénin, Cotonou"}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "4px" }}>
                  <div className={styles.mockupActions}>
                    <button type="button" className={styles.mockupActionBtn} title="Partager">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    </button>
                    <button type="button" className={styles.mockupActionBtn} title="Modifier le profil" onClick={triggerFileInput}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ textAlign: "center", marginTop: "-12px" }}>
              <span className={styles.mockupAvatarInfoText}>
                Formats acceptés : JPG, PNG, WebP. Taille max : 5Mo
              </span>
            </div>

            {/* Metric Pills Grid - 3 colored cards (matching reference design) */}
            <div className={styles.mockupPillGrid}>
              <div className={`${styles.mockupPill} ${styles.mockupPillGreen}`}>
                <span className={styles.mockupPillLabel}>Vues / mois</span>
                <span className={styles.mockupPillValue}>740 vues</span>
              </div>
              <div className={`${styles.mockupPill} ${styles.mockupPillBlue}`}>
                <span className={styles.mockupPillLabel}>Biens en ligne</span>
                <span className={styles.mockupPillValue}>4 actifs</span>
              </div>
              <div className={`${styles.mockupPill} ${styles.mockupPillOrange}`}>
                <span className={styles.mockupPillLabel}>Numéros révélés</span>
                <span className={styles.mockupPillValue}>12 contacts</span>
              </div>
            </div>

            {/* Form Fields: Styled inside a Grouped Card container */}
            <div className={styles.mockupListGroup}>
              
              {/* Field 1: Nom complet */}
              <div className={styles.mockupListItem}>
                <span className={styles.mockupListIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                <div className={styles.mockupListText}>
                  <span className={styles.mockupListPrimary}>Nom complet</span>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={styles.mockupRowInput} 
                    required 
                  />
                </div>
                <span className={styles.mockupListChevron}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>

              {/* Field 2: Email */}
              <div className={styles.mockupListItem}>
                <span className={styles.mockupListIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <div className={styles.mockupListText}>
                  <span className={styles.mockupListPrimary}>Email</span>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className={styles.mockupRowInput} 
                    required 
                  />
                </div>
                <span className={styles.mockupListChevron}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>

              {/* Field 3: Téléphone */}
              <div className={styles.mockupListItem} style={{ height: "auto", paddingBottom: "12px" }}>
                <span className={styles.mockupListIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <div className={styles.mockupListText}>
                  <span className={styles.mockupListPrimary}>Numéro de téléphone</span>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className={styles.mockupRowInput} 
                    required 
                  />
                  <span className={styles.mockupHint}>Masqué jusqu'au paiement de 1 500 FCFA</span>
                </div>
                <span className={styles.mockupListChevron}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>

              {/* Field 4: Localisation (Ville & Quartier side by side) */}
              <div className={styles.mockupListItem}>
                <span className={styles.mockupListIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                <div className={styles.mockupListText}>
                  <span className={styles.mockupListPrimary}>Localisation (Ville, Quartier)</span>
                  <div className={styles.mockupRowGrid}>
                    <input 
                      type="text" 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)} 
                      placeholder="Ville"
                      className={styles.mockupRowInput} 
                      required 
                    />
                    <input 
                      type="text" 
                      value={neighborhood} 
                      onChange={(e) => setNeighborhood(e.target.value)} 
                      placeholder="Quartier"
                      className={styles.mockupRowInput} 
                      required 
                    />
                  </div>
                </div>
                <span className={styles.mockupListChevron}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>

              {/* Field 5: Type de vendeur */}
              <div className={styles.mockupListItem}>
                <span className={styles.mockupListIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </span>
                <div className={styles.mockupListText}>
                  <span className={styles.mockupListPrimary}>Type de vendeur</span>
                  <select 
                    value={sellerType} 
                    onChange={(e) => setSellerType(e.target.value)} 
                    className={styles.mockupRowSelect}
                  >
                    <option value="particulier">Particulier</option>
                    <option value="professionnel">Professionnel</option>
                    <option value="agence">Agence</option>
                  </select>
                </div>
                <span className={styles.mockupListChevron}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>

              {/* Field 6: Adresse complète */}
              <div className={styles.mockupListItem}>
                <span className={styles.mockupListIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                </span>
                <div className={styles.mockupListText}>
                  <span className={styles.mockupListPrimary}>Adresse complète</span>
                  <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className={styles.mockupRowInput} 
                    required 
                  />
                </div>
                <span className={styles.mockupListChevron}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </div>

              {/* Field 7: Visibilité (Protéger mon numéro) */}
              <div className={styles.mockupListItem} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                  <span className={styles.mockupListIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                  <div className={styles.mockupListText}>
                    <span className={styles.mockupListPrimary}>Protéger mon numéro</span>
                    <span className={styles.mockupHint}>Autoriser OKKAZ à révéler votre numéro après paiement de 1 500 FCFA</span>
                  </div>
                </div>
                <label className={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={protectNumber} 
                    onChange={(e) => setProtectNumber(e.target.checked)} 
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

            </div>

            {/* Bottom Actions inside the Mockup Card */}
            <div className={styles.mockupFormActions}>
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