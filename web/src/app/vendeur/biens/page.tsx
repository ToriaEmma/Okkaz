import Image from "next/image";
import Link from "next/link";
import { mockAds } from "@/lib/data";
import SellerShell from "../SellerShell";
import styles from "../vendeur.module.css";

export default function SellerGoodsPage() {
  return (
    <SellerShell active="/vendeur/biens">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Catalogue</p>
            <h1>Mes biens</h1>
            <p>Les biens visibles sur OKKAZ. Le contact vendeur reste masque jusqu&apos;au paiement client.</p>
          </div>
          <label className={styles.search}>
            <span>Rechercher</span>
            <input type="search" placeholder="Titre, ville, categorie" />
          </label>
          <div className={styles.avatar}>B</div>
        </header>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Offres publiees</h2>
              <p>{mockAds.length} biens disponibles</p>
            </div>
            <Link href="/vendeur/publier">Publier</Link>
          </div>
          <div className={styles.goodsGrid}>
            {mockAds.map((ad) => (
              <article className={styles.goodCard} key={ad.id}>
                <Image src={ad.image} alt={ad.title} width={320} height={210} />
                <div>
                  <span>{ad.loaPossible ? "LOA" : "Location"}</span>
                  <h2>{ad.title}</h2>
                  <p>{ad.location} - {ad.availability}</p>
                  <strong>{ad.price.toLocaleString("fr-FR")} FCFA</strong>
                  <div className={styles.goodActions}>
                    <Link href={`/annonces/${ad.id}`}>Voir</Link>
                    <Link href={`/vendeur/publier?modifier=${ad.id}`}>Modifier</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </SellerShell>
  );
}
