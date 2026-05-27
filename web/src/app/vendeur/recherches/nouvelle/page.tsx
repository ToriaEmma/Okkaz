"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { pushPlatformEvent } from "@/lib/platformEvents";
import { pushSearchRequest } from "@/lib/searchRequests";
import SellerShell from "../../SellerShell";
import styles from "../../vendeur.module.css";

const CATEGORIES = ["Véhicules", "Immobilier", "Électronique", "Équipements Pro", "Événementiel", "Mobilier"];
const PENDING_SEARCH_REQUEST_KEY = "okkaz_pending_search_request";

export default function NewRequestPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Équipements Pro");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState<"Standard" | "Express">("Standard");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!title.trim()) {
      setError("Décrivez votre besoin");
      return;
    }
    if (!budget.trim()) {
      setError("Indiquez un budget");
      return;
    }
    if (!location.trim()) {
      setError("Indiquez la ville ou zone souhaitée");
      return;
    }
    setError(null);
    const draft = {
      title,
      category,
      budget: Number(budget.replace(/\D/g, "")),
      location,
      requester: "Emma TODEDJI",
      urgency,
      description: description.trim() || title,
    };

    if (urgency === "Express") {
      window.localStorage.setItem(PENDING_SEARCH_REQUEST_KEY, JSON.stringify(draft));
      window.location.href = "/paiement?type=recherche&urgence=Express";
      return;
    }

    const request = pushSearchRequest(draft);
    pushPlatformEvent({
      type: "search_request",
      title: "Nouvelle demande Je recherche",
      detail: `${request.requester} recherche ${request.title} à ${request.location}.`,
      amount: 2500,
      status: "done",
    });
    setPublished(true);
  };

  return (
    <SellerShell active="/vendeur/recherches">
      <section className={styles.spaceContent}>
        <div className={styles.publishTop}>
          <Link href="/vendeur" className={styles.publishBack} aria-label="Annuler et retourner au profil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </Link>
          <span className={styles.publishCancel}>Annuler</span>
        </div>

        <div className={styles.requestLayout}>
          <div className={styles.requestColLeft}>
            <span className={styles.publishKicker}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              JE RECHERCHE
            </span>

            <h1 className={styles.publishTitle}>
              Trouve ce dont <span>tu as besoin.</span>
            </h1>
            <p className={styles.publishDesc}>
              Décris ton besoin en deux mots avec une photo si possible. Les vendeurs OKKAZ te répondront directement.
            </p>

            <article className={styles.wizardCard}>
          <div className={styles.wizardBody}>
            {/* Photo unique */}
            <div className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Photo de référence <em style={{ color: "var(--muted)", fontStyle: "normal", fontWeight: 700 }}>(optionnel)</em>
              </span>
              {photo ? (
                <div className={styles.wizardPhotoSlotFilled} style={{ aspectRatio: "16/9", maxWidth: 360 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="Référence" />
                  <button type="button" onClick={() => { setPhoto(null); if (fileRef.current) fileRef.current.value = ""; }} aria-label="Retirer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ) : (
                <button type="button" className={styles.wizardPhotoDropzone} onClick={() => fileRef.current?.click()} style={{ aspectRatio: "16/9", maxWidth: 360 }}>
                  <span className={styles.wizardPhotoDropzoneIcon}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </span>
                  <strong>Ajouter une photo</strong>
                  <small>PNG, JPG · facultatif</small>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
            </div>

            {/* Titre du besoin */}
            <label className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Que recherches-tu ?
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Générateur 5 kVA à louer 3 jours"
                className={styles.wizardInput}
              />
            </label>

            <label className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>Catégorie</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.wizardSelect}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>

            <label className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>Budget maximum (FCFA)</span>
              <input
                type="text"
                inputMode="numeric"
                value={budget}
                onChange={(e) => setBudget(e.target.value.replace(/[^0-9 ]/g, ""))}
                placeholder="Ex: 90 000"
                className={styles.wizardInput}
              />
            </label>

            <label className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>Ville ou zone</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Porto-Novo"
                className={styles.wizardInput}
              />
            </label>

            <label className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>Priorité</span>
              <select value={urgency} onChange={(e) => setUrgency(e.target.value as "Standard" | "Express")} className={styles.wizardSelect}>
                <option value="Standard">Standard - publication normale</option>
                <option value="Express">Express - payer pour l&apos;urgence</option>
              </select>
            </label>

            <label className={styles.wizardField}>
              <span className={styles.wizardFieldLabel}>Détails utiles</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Durée, livraison, état attendu, contraintes..."
                className={styles.wizardTextarea}
                rows={4}
              />
            </label>
          </div>

          {error && (
            <p className={styles.wizardError}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              {error}
            </p>
          )}

          {published && (
            <p className={styles.wizardSuccess}>
              Demande publiée. Elle apparaît maintenant dans Annonces &gt; Je recherche et les vendeurs peuvent y répondre.
            </p>
          )}

          <div className={styles.wizardFooter}>
            <Link href="/vendeur" className={styles.wizardCancelBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Annuler
            </Link>
            <button type="button" onClick={submit} className={styles.wizardNextBtn}>
              {urgency === "Express" ? "Payer l'urgence" : "Publier la demande"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </article>
          </div>

          <aside className={styles.requestColSide} aria-hidden>
            <div className={styles.requestBubble}>
              <strong>Hey !</strong>
              <p>Dis-moi ce que tu cherches et je préviens nos vendeurs vérifiés. Tu reçois leurs offres en quelques heures.</p>
              <span className={styles.requestBubbleTail} aria-hidden />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/18.png?v=20260527-trim"
              alt=""
              width={6250}
              height={6250}
              className={styles.requestMascot}
            />
          </aside>
        </div>
      </section>
    </SellerShell>
  );
}
