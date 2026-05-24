"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mockAds } from "@/lib/data";
import styles from "./paiement.module.css";

const savedProfile = {
  firstName: "Jean",
  lastName: "Dupont",
  phone: "+229 01 00 00 00 00",
  card: "Carte bancaire enregistrée •••• 2842",
};

function PaiementContent() {
  const searchParams = useSearchParams();
  const ad = mockAds.find((item) => item.id === searchParams.get("annonce")) ?? mockAds[0];
  const [isPaid, setIsPaid] = useState(false);
  const total = ad.price + ad.deposit;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>

        <div className={styles.left}>
          <Link href="/annonces" className={styles.back} aria-label="Retour aux annonces">
            <span aria-hidden>←</span>
            Retour aux annonces
          </Link>
          <h1 className={styles.title}>Réserver ce bien</h1>
          <p className={styles.subtitle}>
            Vos informations de profil sont déjà enregistrées. Choisissez uniquement votre moyen de paiement.
          </p>

          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setIsPaid(true); }}>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Profil utilisé</p>
              <div className={styles.profileCard}>
                <div>
                  <span>Nom et prénoms</span>
                  <strong>{savedProfile.firstName} {savedProfile.lastName}</strong>
                </div>
                <div>
                  <span>Numéro du compte</span>
                  <strong>{savedProfile.phone}</strong>
                </div>
                <div>
                  <span>Moyen enregistré</span>
                  <strong>{savedProfile.card}</strong>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Durée de location</p>
              <div className={styles.durationBtns}>
                <button type="button" className={styles.durationActive}>{ad.minimumDuration}</button>
                <button type="button" className={styles.duration}>3 mois</button>
                <button type="button" className={styles.duration}>6 mois</button>
                <button type="button" className={styles.duration}>Sur mesure</button>
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Mode de paiement</p>
              <div className={styles.paymentMethods}>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" defaultChecked />
                  <span>Mobile Money</span>
                </label>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" />
                  <span>Carte bancaire enregistrée</span>
                </label>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" />
                  <span>Virement bancaire</span>
                </label>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {isPaid ? "Paiement confirmé" : "Payer et dévoiler le numéro"}
            </button>

            {isPaid && (
              <div className={styles.revealBox}>
                <span>Numéro vendeur dévoilé</span>
                <strong>{ad.ownerPhone}</strong>
                <p>Ce numéro est visible uniquement pour le compte qui vient de payer cette réservation.</p>
                <Link href="/chat" className={styles.chatLink}>Ouvrir le chat OKKAZ</Link>
              </div>
            )}

          </form>
        </div>

        <div className={styles.right}>
          <div className={styles.summary}>
            <p className={styles.summaryLabel}>Récapitulatif</p>
            <div className={styles.summaryImg}>
              <Image src={ad.image} alt={ad.title} fill sizes="380px" />
            </div>
            <p className={styles.summaryTitle}>{ad.title}</p>
            <p className={styles.summaryOwner}>{ad.owner} · {ad.location}</p>

            <div className={styles.summaryLines}>
              <div className={styles.summaryLine}>
                <span>Loyer</span>
                <strong>{ad.price.toLocaleString("fr-FR")} FCFA</strong>
              </div>
              <div className={styles.summaryLine}>
                <span>Caution</span>
                <strong>{ad.deposit.toLocaleString("fr-FR")} FCFA</strong>
              </div>
              <div className={styles.summaryLine}>
                <span>Durée</span>
                <strong>{ad.minimumDuration}</strong>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total à régler</span>
              <strong>{total.toLocaleString("fr-FR")} FCFA</strong>
            </div>

            <div className={styles.secureNote}>
              <span className={styles.secureDot} />
              Paiement sécurisé par OKKAZ. Le contact vendeur reste masqué avant validation.
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default function PaiementPage() {
  return (
    <Suspense fallback={<main className={styles.page}>Chargement du paiement...</main>}>
      <PaiementContent />
    </Suspense>
  );
}
