import styles from "./page.module.css";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import StackedCards from "@/components/StackedCards";
import TextRevealSection from "@/components/TextRevealSection";
import MissionText from "@/components/MissionText";
import AwsmdInspiredSection from "@/components/AwsmdInspiredSection";
import OwnerSection from "@/components/OwnerSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h3 className={styles.sectionSubtitle}>Location. Troc. LOA.</h3>
        <MissionText />
      </section>

      {/* Discover / Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          <Link href="/annonces?category=Véhicules" className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/vehicules.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Véhicules</h4>
          </Link>
          <Link href="/annonces?category=Immobilier" className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/hero.PNG)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Maisons</h4>
          </Link>
          <Link href="/annonces?category=Électronique" className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/electronique.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Tech</h4>
          </Link>
          <Link href="/annonces?category=Équipements Pro" className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/equipements-pro.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Matériel pro</h4>
          </Link>
          <Link href="/annonces" className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/evenementiel.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Événements</h4>
          </Link>
          <Link href="/annonces" className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/mobilier-deco.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Mobilier</h4>
          </Link>
        </div>
      </section>

      {/* GSAP Stacked Cards Section */}
      <StackedCards />

      <AwsmdInspiredSection />

      <OwnerSection />

      {/* GSAP Text Reveal Section */}
      <TextRevealSection />
    </main>
  );
}
