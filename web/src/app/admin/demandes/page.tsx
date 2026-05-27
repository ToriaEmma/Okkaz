"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type SearchRequest } from "@/lib/data";
import { readSearchRequests, writeSearchRequests } from "@/lib/searchRequests";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

export default function AdminDemandesPage() {
  const [requests, setRequests] = useState<SearchRequest[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const syncRequests = () => setRequests(readSearchRequests());

    syncRequests();
    window.addEventListener("okkaz-search-requests-updated", syncRequests);
    window.addEventListener("storage", syncRequests);

    return () => {
      window.removeEventListener("okkaz-search-requests-updated", syncRequests);
      window.removeEventListener("storage", syncRequests);
    };
  }, []);

  const filtered = requests.filter((request) =>
    [request.title, request.category, request.location, request.requester]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  const closeRequest = (id: string) => {
    const next = requests.filter((request) => request.id !== id);
    setRequests(next);
    writeSearchRequests(next);
    window.dispatchEvent(new Event("okkaz-search-requests-updated"));
  };

  return (
    <AdminShell active="/admin/demandes">
      <section className={styles.content}>
        <div className={styles.adminPageHeader}>
          <Link href="/admin" className={styles.adminBackBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <header className={styles.pageHeaderTitle}>
            <h1>Demandes Je recherche</h1>
            <p>Demandes créées depuis le formulaire utilisateur et visibles aux vendeurs.</p>
          </header>
          <Link href="/annonces?category=Je recherche" className={styles.headerCta}>
            Voir public
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.icon}>R</span>
            <h2>Demandes</h2>
            <p>Actives sur la plateforme</p>
            <strong>{requests.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>E</span>
            <h2>Express</h2>
            <p>Alertes prioritaires vendeurs</p>
            <strong>{requests.filter((request) => request.urgency === "Express").length}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>F</span>
            <h2>Encaissement</h2>
            <p>Frais Je recherche estimés</p>
            <strong>{requests.reduce((sum, request) => sum + (request.urgency === "Express" ? 5000 : 2500), 0).toLocaleString("fr-FR")}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>V</span>
            <h2>Vendeurs</h2>
            <p>Notifiés par catégorie</p>
            <strong>{new Set(requests.map((request) => request.category)).size}</strong>
          </div>
        </div>

        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div>
              <h2>File des demandes</h2>
              <p>Chaque demande vient du formulaire utilisateur et nourrit le filtre public Je recherche.</p>
            </div>
          </header>

          <div className={styles.adminFilterBar}>
            <label className={styles.adminSearchInline}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="search" placeholder="Titre, categorie, ville..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>

          <div className={styles.scheduleList}>
            {filtered.map((request) => (
              <div className={styles.scheduleItem} key={request.id}>
                <span>{request.urgency}</span>
                <div>
                  <strong>{request.title}</strong>
                  <p>{request.reference} · {request.category} · {request.location} · budget {request.budget.toLocaleString("fr-FR")} FCFA</p>
                </div>
                <button type="button" onClick={() => closeRequest(request.id)}>Pourvu</button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </AdminShell>
  );
}
