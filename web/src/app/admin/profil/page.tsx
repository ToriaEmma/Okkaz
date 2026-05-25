"use client";

import { useRef, useState } from "react";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

export default function AdminProfilePage() {
  const [name, setName] = useState("Admin OKKAZ");
  const [email, setEmail] = useState("admin@okkaz.bj");
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPhoto(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <AdminShell active="/admin/profil">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Profil administrateur</h1>
            <p>Identite, photo, role, securite du compte et historique de connexion.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Activite, action" />
          </label>
          <div className={styles.avatar}>{initials || "OK"}</div>
        </header>

        <section className={styles.grid} style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)" }}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Photo de profil</h2>
                <p>JPG, PNG ou WebP - 5 Mo max. Visible dans la sidebar et l&apos;en-tete.</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  position: "relative",
                  width: 96,
                  height: 96,
                  border: "3px dashed rgba(59, 130, 246, 0.4)",
                  borderRadius: "50%",
                  background: photo ? "transparent" : "linear-gradient(135deg, #f97316, #fb923c)",
                  color: "#ffffff",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  cursor: "pointer",
                  overflow: "hidden",
                  padding: 0,
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 8px 22px rgba(249, 115, 22, 0.28)",
                }}
                aria-label="Changer la photo de profil"
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="Profil" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  initials || "OK"
                )}
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                style={{ display: "none" }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  style={{
                    justifySelf: "flex-start",
                    minHeight: 40,
                    padding: "0 18px",
                    border: 0,
                    borderRadius: 999,
                    background: "var(--ink)",
                    color: "#fff",
                    font: "inherit",
                    fontSize: "0.82rem",
                    fontWeight: 850,
                    cursor: "pointer",
                  }}
                >
                  {photo ? "Changer la photo" : "Importer une photo"}
                </button>
                {photo ? (
                  <button
                    type="button"
                    onClick={handleRemove}
                    style={{
                      minHeight: 40,
                      padding: "0 18px",
                      border: "1px solid var(--line)",
                      borderRadius: 999,
                      background: "transparent",
                      color: "var(--ink)",
                      font: "inherit",
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                ) : (
                  <small style={{ color: "var(--muted)", fontSize: "0.74rem", fontWeight: 650 }}>
                    Par defaut, vos initiales sur fond orange.
                  </small>
                )}
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2>Securite</h2>
                <p>Sessions actives et derniere connexion.</p>
              </div>
            </div>
            <div className={styles.scheduleList}>
              <div className={styles.scheduleItem}>
                <span>iOS</span>
                <div>
                  <strong>iPhone Safari</strong>
                  <p>Cotonou - 23/05/2026 14:22</p>
                </div>
                <em>Active</em>
              </div>
              <div className={styles.scheduleItem}>
                <span>Mac</span>
                <div>
                  <strong>Chrome 132</strong>
                  <p>Cotonou - 23/05/2026 09:18</p>
                </div>
                <em>Cette session</em>
              </div>
              <div className={styles.scheduleItem}>
                <span>Win</span>
                <div>
                  <strong>Edge</strong>
                  <p>Cotonou - 22/05/2026 19:55</p>
                </div>
                <em>Revoquer</em>
              </div>
            </div>
          </article>
        </section>

        <article className={styles.card} style={{ marginTop: 32 }}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Informations</h2>
              <p>Mettez a jour vos informations de connexion.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 800 }}>
              Nom complet
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ minHeight: 44, border: "1px solid var(--line)", borderRadius: 12, padding: "0 14px", font: "inherit" }}
              />
            </label>
            <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 800 }}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ minHeight: 44, border: "1px solid var(--line)", borderRadius: 12, padding: "0 14px", font: "inherit" }}
              />
            </label>
            <label style={{ display: "grid", gap: 6, fontSize: "0.78rem", fontWeight: 800 }}>
              Mot de passe
              <input
                type="password"
                defaultValue="********"
                style={{ minHeight: 44, border: "1px solid var(--line)", borderRadius: 12, padding: "0 14px", font: "inherit" }}
              />
            </label>
          </div>
          <button
            type="button"
            style={{
              marginTop: 16,
              justifySelf: "flex-start",
              minHeight: 44,
              padding: "0 22px",
              border: 0,
              borderRadius: 999,
              background: "var(--ink)",
              color: "#fff",
              font: "inherit",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Enregistrer les modifications
          </button>
        </article>
      </section>
    </AdminShell>
  );
}
