import Image from "next/image";
import Link from "next/link";
import styles from "./admin.module.css";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: "D" },
  { href: "/admin/annonces", label: "Annonces", icon: "A", badge: 8 },
  { href: "/admin/demandes", label: "Demandes", icon: "?", badge: 5 },
  { href: "/admin/kyc", label: "KYC", icon: "K", badge: 12 },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: "U" },
  { href: "/admin/abonnements", label: "Abonnements", icon: "B" },
  { href: "/admin/paiements", label: "Paiements", icon: "P" },
  { href: "/admin/categories", label: "Categories", icon: "G" },
  { href: "/admin/reglages", label: "Reglages", icon: "R" },
];

type AdminShellProps = {
  active: string;
  children: React.ReactNode;
};

export default function AdminShell({ active, children }: AdminShellProps) {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/okazz-logo-final.png"
            alt="OKKAZ"
            width={6250}
            height={6250}
            priority
            className={styles.brandLogo}
          />
        </Link>

        <nav className={styles.menu} aria-label="Admin">
          {menuItems.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
                {item.badge ? <em className={styles.menuBadge}>{item.badge}</em> : null}
              </Link>
            );
          })}
        </nav>

        <Link href="/admin/profil" className={styles.profileCard}>
          <div className={styles.profileAvatar}>OK</div>
          <div className={styles.profileText}>
            <strong>Admin OKKAZ</strong>
            <span>Superviseur</span>
          </div>
          <span className={styles.profileChevron} aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </Link>
      </aside>

      {children}
    </main>
  );
}
