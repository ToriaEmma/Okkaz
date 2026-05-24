import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

const payments = [
  { ref: "PAY-0428", user: "Nadia H.", amount: "150 000 FCFA", method: "MTN Money", status: "A rapprocher" },
  { ref: "COM-0189", user: "Immo Benin", amount: "12 500 FCFA", method: "Moov Money", status: "Commission OK" },
  { ref: "OUT-0142", user: "Digital Store", amount: "25 000 FCFA", method: "Virement", status: "Versement J+1" },
];

export default function AdminPaiementsPage() {
  return (
    <AdminShell active="/admin/paiements">
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1>Paiements</h1>
            <p>Rapproche Mobile Money, commissions et versements proprietaires.</p>
          </div>
          <label className={styles.search}>
            <span>Search</span>
            <input type="search" placeholder="Reference paiement" />
          </label>
          <div className={styles.avatar}>P</div>
        </header>

        <section className={styles.actionPageGrid}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Transactions</h2>
              <button type="button">Exporter</button>
            </div>
            <div className={styles.paymentList}>
              {payments.map((payment) => (
                <div className={styles.paymentRow} key={payment.ref}>
                  <div>
                    <span>{payment.ref}</span>
                    <strong>{payment.amount}</strong>
                    <p>{payment.user} - {payment.method}</p>
                  </div>
                  <em>{payment.status}</em>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.simulator}>
            <h2>Rapprochement</h2>
            <p>Simule la confirmation d&apos;un paiement recu.</p>
            <label>
              Reference operateur
              <input type="text" placeholder="MTN-2026-00042" />
            </label>
            <label>
              Montant recu
              <input type="text" placeholder="150 000 FCFA" />
            </label>
            <div className={styles.buttonRow}>
              <button type="button">Confirmer</button>
              <button type="button">Signaler ecart</button>
            </div>
          </aside>
        </section>
      </section>
    </AdminShell>
  );
}
