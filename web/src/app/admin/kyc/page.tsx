"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

type Doc = {
  id: string;
  name: string;
  role: "Particulier" | "Pro" | "Garant";
  doc: "CNI" | "Passeport" | "RCCM" | "Permis";
  city: string;
  submitted: string;
};

const INITIAL_DOCS: Doc[] = [
  { id: "KYC-487", name: "Emma TODEDJI", role: "Particulier", doc: "CNI", city: "Cotonou", submitted: "Il y a 6h" },
  { id: "KYC-486", name: "Immo Bénin SARL", role: "Pro", doc: "RCCM", city: "Fidjrosse", submitted: "Il y a 1j" },
  { id: "KYC-485", name: "Auto Prestige", role: "Pro", doc: "RCCM", city: "Calavi", submitted: "Il y a 2j" },
  { id: "KYC-484", name: "Eric Adjovi", role: "Garant", doc: "Permis", city: "Porto-Novo", submitted: "Il y a 2j" },
];

export default function AdminKycPage() {
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);

  const approve = (id: string) => setDocs((p) => p.filter((d) => d.id !== id));
  const reject = (id: string) => setDocs((p) => p.filter((d) => d.id !== id));

  const stats = {
    pending: docs.length,
    particuliers: docs.filter((d) => d.role === "Particulier").length,
    pros: docs.filter((d) => d.role === "Pro").length,
    approuvesAujourdhui: 7,
  };

  return (
    <AdminShell active="/admin/kyc">
      <section className={styles.spaceContent}>
        <div className={styles.adminPageHeader}>
          <Link href="/admin" className={styles.adminBackBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <header className={styles.spaceHeader}>
            <h1>Vérification identité</h1>
            <p>Approuvez les pièces d&apos;identité et documents professionnels avant publication. Délai cible : 24h.</p>
          </header>
        </div>

        <div className={styles.statTilesGrid}>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconOrange}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <small>EN ATTENTE</small>
            <strong>{stats.pending}</strong>
            <p>dossiers à traiter</p>
          </div>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconBlue}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
            </span>
            <small>PARTICULIERS</small>
            <strong>{stats.particuliers}</strong>
            <p>CNI / Passeport</p>
          </div>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconViolet}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/></svg>
            </span>
            <small>PROS</small>
            <strong>{stats.pros}</strong>
            <p>RCCM en attente</p>
          </div>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconGreen}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <small>APPROUVÉS</small>
            <strong>{stats.approuvesAujourdhui}</strong>
            <p>aujourd&apos;hui</p>
          </div>
        </div>

        <h2 className={styles.spaceSectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M14 10h4M14 14h4M5 18h14"/></svg>
          Pièces à vérifier <span className={styles.adminModerationCount}>{docs.length}</span>
        </h2>

        {docs.length === 0 ? (
          <p className={styles.adminModerationEmpty}>Tous les dossiers d&apos;identité sont validés. Beau travail.</p>
        ) : (
          <ul className={styles.adminModerationList}>
            {docs.map((doc) => (
              <li key={doc.id} className={styles.adminModerationItem}>
                <span className={`${styles.adminModerationRef} ${styles.adminModerationRef_blue}`}>{doc.id}</span>
                <div>
                  <strong>{doc.name}</strong>
                  <p>{doc.doc} · {doc.role} · {doc.city} · {doc.submitted}</p>
                </div>
                <div className={styles.adminModerationActions}>
                  <button type="button" className={styles.adminActionSecondary}>Voir pièce</button>
                  <button type="button" className={`${styles.adminActionPrimary} ${styles.adminActionPrimary_blue}`} onClick={() => approve(doc.id)}>
                    Approuver
                  </button>
                  <button type="button" className={`${styles.adminActionPrimary} ${styles.adminActionPrimary_red}`} onClick={() => reject(doc.id)}>
                    Rejeter
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AdminShell>
  );
}
