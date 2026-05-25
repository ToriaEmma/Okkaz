import Image from "next/image";
import Link from "next/link";
import styles from "./vendeur.module.css";

const navItems = [
  { href: "/vendeur", label: "Mon espace", icon: "D" },
  { href: "/vendeur/biens", label: "Mes annonces", icon: "B" },
  { href: "/vendeur/publier", label: "Publier", icon: "+" },
  { href: "/vendeur/recherches", label: "Je recherche", icon: "?" },
  { href: "/vendeur/paiements", label: "Paiements", icon: "$" },
  { href: "/vendeur/profil", label: "Profil & KYC", icon: "U" },
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

        <nav className={styles.nav} aria-label="Mon espace OKKAZ">
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

        <p className={styles.sidebarNote}>OKKAZ vous met en relation. Aucun paiement de location ne transite par la plateforme.</p>
      </aside>

      {children}
    </main>
  );
}
