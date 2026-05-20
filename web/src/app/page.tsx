import styles from "./page.module.css";
import StackedCards from "@/components/StackedCards";
import TextRevealSection from "@/components/TextRevealSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.newHero}>
        <div className={styles.heroBackgroundTextContainer}>
          <h1 className={styles.heroBackgroundText}>
            {['o', 'k', 'k', 'a', 'z'].map((letter, index) => (
              <span key={index} className={styles.heroLetterWrapper}>
                <span
                  className={styles.heroAnimatedLetter}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className={styles.heroOverlayContent}>
          <div className={styles.scrollIndicator}>
            Scroll
          </div>
          <div className={styles.heroBottomText}>
            <h2>Votre bien <br /> vos conditions.</h2>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h3 className={styles.sectionSubtitle}>Notre mission</h3>
        <h2 className={styles.missionText}>
          La plateforme digitale de confiance qui révolutionne la location, le troc et l'accès aux biens par la LOA au Bénin.
        </h2>
      </section>

      {/* Discover / Gallery Section */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/vehicules.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Véhicules</h4>
          </div>
          <div className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/hero.PNG)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Immobilier</h4>
          </div>
          <div className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/electronique.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Électronique</h4>
          </div>
          <div className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/equipements-pro.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Équipements Pro</h4>
          </div>
          <div className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/evenementiel.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Événementiel</h4>
          </div>
          <div className={styles.galleryCard}>
            <div className={styles.cardImagePlaceholder} style={{ backgroundImage: 'url(/mobilier-deco.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <h4 className={styles.cardTitle}>Mobilier & Déco</h4>
          </div>
        </div>
      </section>

      {/* GSAP Stacked Cards Section */}
      <StackedCards />

      {/* GSAP Text Reveal Section */}
      <TextRevealSection />
    </main>
  );
}
