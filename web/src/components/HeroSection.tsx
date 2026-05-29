"use client";

import styles from "@/app/page.module.css";
import { useHeroUnfold } from "@/hooks/useHeroUnfold";

export default function HeroSection() {
  const unfoldProgress = useHeroUnfold();
  const letters = ["o", "k", "k", "a", "z"];
  const center = (letters.length - 1) / 2;

  return (
    <section className={styles.newHero}>
      <div className={styles.heroBackgroundTextContainer}>
        <h1 className={styles.heroBackgroundText}>
          {letters.map((letter, index) => {
            const distanceFromCenter = index - center;

            return (
              <span
                key={index}
                className={`${styles.heroLetterWrapper} ${index === 1 ? styles.heroKImageHost : ""}`}
                style={{
                  transform: `translate3d(${
                    unfoldProgress * -0.92 + distanceFromCenter * unfoldProgress * 0.06
                  }em, 0, 0)`,
                }}
              >
                {index === 1 && <span className={styles.heroKImage} aria-hidden />}
                <span
                  className={styles.heroAnimatedLetter}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              </span>
            );
          })}
        </h1>
      </div>

      <div className={styles.heroOverlayContent}>
        <div className={styles.scrollIndicator}>Scroll</div>
        <div className={styles.heroBottomText}>
          <h2>
            Accédez au bon bien.
            <br />
            Au bon moment.
          </h2>
        </div>
      </div>
    </section>
  );
}
