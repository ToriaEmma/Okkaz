import Link from "next/link";
import styles from "./admin.module.css";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: "D" },
  { href: "/admin/annonces", label: "Annonces", icon: "A" },
  { href: "/admin/kyc", label: "KYC", icon: "K" },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: "U" },
  { href: "/admin/proprietaires", label: "Proprietaires", icon: "O" },
  { href: "/admin/paiements", label: "Paiements", icon: "P" },
  { href: "/admin/contrats", label: "Contrats LOA", icon: "C" },
  { href: "/admin/abonnements", label: "Abonnements", icon: "B" },
  { href: "/admin/litiges", label: "Litiges", icon: "L" },
  { href: "/admin/categories", label: "Categories", icon: "G" },
  { href: "/admin/moderation", label: "Moderation", icon: "M" },
  { href: "/admin/statistiques", label: "Statistiques", icon: "S" },
  { href: "/admin/journal", label: "Journal", icon: "J" },
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
        <div className={styles.brand}>
          <span className={styles.brandMark}>O</span>
          <strong>Okkaz</strong>
        </div>

        <nav className={styles.menu} aria-label="Admin">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? styles.active : undefined}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.appCard}>
          <Link href="/" aria-label="Retour au site">Go</Link>
          <strong>Centre operations</strong>
          <p>Chaque espace admin ouvre une action precise.</p>
        </div>
      </aside>

      {children}
    </main>
  );
}
