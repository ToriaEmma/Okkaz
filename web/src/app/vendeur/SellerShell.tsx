import Image from "next/image";
import Link from "next/link";
import styles from "./vendeur.module.css";

const navItems = [
  { href: "/vendeur", label: "Dashboard", icon: "D" },
  { href: "/vendeur/profil", label: "Profil", icon: "U" },
];

type SellerShellProps = {
  active: string;
  children: React.ReactNode;
};

export default function SellerShell({ active, children }: SellerShellProps) {
  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}>
          <Image src="/okazz-logo-final.png" alt="OKKAZ" width={6250} height={6250} priority />
        </Link>

        <nav className={styles.nav} aria-label="Espace vendeur">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={active === item.href ? styles.active : undefined}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className={styles.sidebarNote}>Le client paie 1 500 FCFA a OKKAZ pour voir votre numero.</p>
      </aside>

      {children}
    </main>
  );
}
