"use client";

import { useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

type UserRow = {
  id: string;
  name: string;
  type: "Locataire" | "Propriétaire" | "Bénéficiaire" | "Garant";
  status: "Actif" | "À vérifier" | "Limité" | "Suspendu";
  city: string;
  joined: string;
};

const INITIAL_USERS: UserRow[] = [
  { id: "U-4218", name: "Yann Adjovi", type: "Locataire", status: "Actif", city: "Cotonou", joined: "23/05/2026" },
  { id: "U-4217", name: "Immo Bénin SARL", type: "Propriétaire", status: "À vérifier", city: "Fidjrosse", joined: "22/05/2026" },
  { id: "U-4216", name: "Carine Toko", type: "Locataire", status: "Actif", city: "Calavi", joined: "21/05/2026" },
  { id: "U-4215", name: "Pro Equipment", type: "Propriétaire", status: "Suspendu", city: "Porto-Novo", joined: "18/05/2026" },
  { id: "U-4214", name: "Joelle Mensah", type: "Bénéficiaire", status: "Limité", city: "Cotonou", joined: "15/05/2026" },
  { id: "U-4213", name: "Saliou Dossou", type: "Locataire", status: "Actif", city: "Cotonou", joined: "12/05/2026" },
];

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.id.toLowerCase().includes(query.toLowerCase()) ||
      u.city.toLowerCase().includes(query.toLowerCase()),
  );

  const stats = {
    total: users.length,
    actifs: users.filter((u) => u.status === "Actif").length,
    aVerifier: users.filter((u) => u.status === "À vérifier").length,
    suspendus: users.filter((u) => u.status === "Suspendu").length,
  };

  const toggleSuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "Suspendu" ? "Actif" : "Suspendu" } : u)),
    );
  };

  return (
    <AdminShell active="/admin/utilisateurs">
      <section className={styles.spaceContent}>
        <div className={styles.adminPageHeader}>
          <Link href="/admin" className={styles.adminBackBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <header className={styles.spaceHeader}>
            <h1>Utilisateurs</h1>
            <p>Gestion des comptes : locataires, propriétaires, bénéficiaires et garants.</p>
          </header>
        </div>

        <div className={styles.statTilesGrid}>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconViolet}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </span>
            <small>TOTAL</small>
            <strong>{stats.total}</strong>
            <p>comptes enregistrés</p>
          </div>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconGreen}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <small>ACTIFS</small>
            <strong>{stats.actifs}</strong>
            <p>cette semaine</p>
          </div>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconOrange}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </span>
            <small>À VÉRIFIER</small>
            <strong>{stats.aVerifier}</strong>
            <p>identité en attente</p>
          </div>
          <div className={styles.statTile}>
            <span className={`${styles.statTileIcon} ${styles.statTileIconBlue}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </span>
            <small>SUSPENDUS</small>
            <strong>{stats.suspendus}</strong>
            <p>comptes bloqués</p>
          </div>
        </div>

        <div className={styles.adminFilterBar}>
          <label className={styles.adminSearchInline}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="search" placeholder="Nom, identifiant, ville..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>

        <h2 className={styles.spaceSectionTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          {filtered.length} {filtered.length > 1 ? "comptes" : "compte"}
        </h2>

        <ul className={styles.adminModerationList}>
          {filtered.map((user) => (
            <li key={user.id} className={styles.adminModerationItem}>
              <span className={`${styles.adminModerationRef} ${styles.adminModerationRef_blue}`}>{user.id}</span>
              <div>
                <strong>{user.name}</strong>
                <p>{user.type} · {user.city} · {user.joined} · <em className={`${styles.adminUserStatus} ${styles[`adminUserStatus_${user.status === "Actif" ? "ok" : user.status === "Suspendu" ? "fail" : "wait"}`]}`}>{user.status}</em></p>
              </div>
              <div className={styles.adminModerationActions}>
                <button type="button" className={styles.adminActionSecondary}>Profil</button>
                <button
                  type="button"
                  className={`${styles.adminActionPrimary} ${user.status === "Suspendu" ? styles.adminActionPrimary_blue : styles.adminActionPrimary_red}`}
                  onClick={() => toggleSuspend(user.id)}
                >
                  {user.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
