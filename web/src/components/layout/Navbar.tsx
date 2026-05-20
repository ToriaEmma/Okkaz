import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            okkaz
          </Link>
        </div>
        
        <div className={styles.right}>
          <Link href="/chat" className={styles.chatBtn}>
            CHAT WITH OKKAZ <span className={styles.chatIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </span>
          </Link>
          <button className={styles.menuBtn}>
            MENU <span className={styles.menuIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="7" cy="12" r="2.5"/><circle cx="17" cy="12" r="2.5"/></svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
