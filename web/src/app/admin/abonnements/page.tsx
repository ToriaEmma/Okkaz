"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { readPlatformEvents, writePlatformEvents, type PlatformEvent } from "@/lib/platformEvents";
import AdminShell from "../AdminShell";
import styles from "../admin.module.css";

type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  rule: string;
  enabled: boolean;
};

type Subscription = {
  id: string;
  owner: string;
  planId: string;
  status: "actif" | "pause" | "expire";
  nextBilling: string;
  amount: number;
};

const initialPlans: Plan[] = [
  { id: "free", name: "Gratuit", price: "0", cadence: "Toujours", rule: "4 photos, validation sous 72h", enabled: true },
  { id: "week", name: "Premium semaine", price: "3000", cadence: "Hebdomadaire", rule: "Validation express et badge prioritaire", enabled: true },
  { id: "month", name: "Premium mois", price: "10000", cadence: "Mensuel", rule: "Badge Pro, photos illimitees, mise en avant", enabled: true },
  { id: "boost", name: "Boost annonce", price: "5000", cadence: "Ponctuel", rule: "Remontee prioritaire d'une annonce pendant 7 jours", enabled: true },
  { id: "owner", name: "Compte beneficiaire", price: "1000", cadence: "Mensuel", rule: "Reception de prospects et profil enrichi", enabled: false },
];

const initialSubscriptions: Subscription[] = [
  { id: "SUB-1042", owner: "Immo Benin SARL", planId: "month", status: "actif", nextBilling: "02 juin 2026", amount: 10000 },
  { id: "SUB-1039", owner: "Garage Aplahoue", planId: "week", status: "actif", nextBilling: "30 mai 2026", amount: 3000 },
  { id: "SUB-1031", owner: "Emma TODEDJI", planId: "owner", status: "pause", nextBilling: "En attente", amount: 1000 },
  { id: "SUB-1027", owner: "Studio Porto-Novo", planId: "month", status: "expire", nextBilling: "Expire hier", amount: 10000 },
];

const statusLabel = {
  actif: "Actif",
  pause: "En pause",
  expire: "Expire",
};

export default function AdminAbonnementsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [events, setEvents] = useState<PlatformEvent[]>(() => readPlatformEvents());
  const [query, setQuery] = useState("");

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === "actif").length;
  const monthlyRevenue = subscriptions
    .filter((sub) => sub.status === "actif")
    .reduce((total, sub) => total + sub.amount, 0);
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const plan = plans.find((item) => item.id === sub.planId);
    return [sub.owner, sub.id, plan?.name].join(" ").toLowerCase().includes(query.trim().toLowerCase());
  });

  const planById = useMemo(() => new Map(plans.map((plan) => [plan.id, plan])), [plans]);

  const updatePlan = (id: string, patch: Partial<Plan>) => {
    setPlans((current) => current.map((plan) => (plan.id === id ? { ...plan, ...patch } : plan)));
  };

  const setSubscriptionStatus = (id: string, status: Subscription["status"]) => {
    setSubscriptions((current) => current.map((sub) => (sub.id === id ? { ...sub, status } : sub)));
  };

  const grantSubscription = (event: PlatformEvent) => {
    const nextEvents = events.map((item) => (item.id === event.id ? { ...item, status: "approved" as const } : item));
    setEvents(nextEvents);
    writePlatformEvents(nextEvents);
    if (event.type === "boost_payment") return;
    setSubscriptions((current) => [
      {
        id: `SUB-${Date.now().toString().slice(-4)}`,
        owner: event.detail.split(" a paye")[0] || "Client OKKAZ",
        planId: event.title.includes("semaine") ? "week" : event.title.includes("beneficiaire") ? "owner" : event.title.includes("Boost") ? "boost" : "month",
        status: "actif",
        nextBilling: "Prochain renouvellement",
        amount: event.amount ?? 0,
      },
      ...current,
    ]);
  };

  const pendingSubscriptionPayments = events.filter((event) => (event.type === "subscription_payment" || event.type === "boost_payment") && event.status === "pending");

  useEffect(() => {
    const syncEvents = () => setEvents(readPlatformEvents());

    window.addEventListener("okkaz-events-updated", syncEvents);
    window.addEventListener("storage", syncEvents);

    return () => {
      window.removeEventListener("okkaz-events-updated", syncEvents);
      window.removeEventListener("storage", syncEvents);
    };
  }, []);

  return (
    <AdminShell active="/admin/abonnements">
      <section className={styles.content}>
        <div className={styles.adminPageHeader}>
          <Link href="/admin" className={styles.adminBackBtn} aria-label="Retour au dashboard">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <header className={styles.pageHeaderTitle}>
            <h1>Abonnements</h1>
            <p>Gestion des offres premium, des comptes beneficiaires et des renouvellements.</p>
          </header>
          <Link href="/admin/paiements" className={styles.headerCta}>
            Paiements
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.icon}>P</span>
            <h2>Plans actifs</h2>
            <p>Offres commercialisees</p>
            <strong>{plans.filter((plan) => plan.enabled).length}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>A</span>
            <h2>Abonnes</h2>
            <p>Comptes premium actifs</p>
            <strong>{activeSubscriptions}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>F</span>
            <h2>MRR</h2>
            <p>Revenu recurrent estime</p>
            <strong>{monthlyRevenue.toLocaleString("fr-FR")}</strong>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>!</span>
            <h2>A traiter</h2>
            <p>Expirations ou pauses</p>
            <strong>{subscriptions.filter((sub) => sub.status !== "actif").length}</strong>
          </div>
        </div>

        <section className={styles.subscriptionGrid}>
          <article className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <h2>Plans disponibles</h2>
                <p>Modifiez les tarifs et activez les offres visibles côté vendeur.</p>
              </div>
            </header>

            <div className={styles.planList}>
              {plans.map((plan) => (
                <article className={styles.planCard} key={plan.id}>
                  <div>
                    <strong>{plan.name}</strong>
                    <p>{plan.rule}</p>
                    <span>{plan.cadence}</span>
                  </div>
                  <label>
                    Tarif FCFA
                    <input value={plan.price} onChange={(event) => updatePlan(plan.id, { price: event.target.value })} />
                  </label>
                  <button
                    type="button"
                    className={plan.enabled ? styles.adminActionSecondary : `${styles.adminActionPrimary} ${styles.adminActionPrimary_blue}`}
                    onClick={() => updatePlan(plan.id, { enabled: !plan.enabled })}
                  >
                    {plan.enabled ? "Desactiver" : "Activer"}
                  </button>
                </article>
              ))}
            </div>
          </article>

          <aside className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <h2>Regles premium</h2>
                <p>Parametres appliques aux abonnements actifs.</p>
              </div>
            </header>
            <div className={styles.stepList}>
              <span>Validation prioritaire des annonces premium</span>
              <span>Badge visible sur les fiches publiques</span>
              <span>Encaissement abonnement par OKKAZ</span>
              <span>Suspension automatique apres expiration</span>
            </div>
          </aside>
        </section>

        {pendingSubscriptionPayments.length > 0 && (
          <section className={styles.card}>
            <header className={styles.cardHeader}>
              <div>
                <h2>Paiements à accorder <span className={styles.adminModerationCount}>{pendingSubscriptionPayments.length}</span></h2>
                <p>Quand un utilisateur paie un abonnement ou le boost d&apos;une annonce, OKKAZ reçoit la notification ici.</p>
              </div>
            </header>
            <div className={styles.subscriptionList}>
              {pendingSubscriptionPayments.map((event) => (
                <article className={styles.subscriptionRow} key={event.id}>
                  <span className={`${styles.adminUserStatus} ${styles.adminUserStatus_wait}`}>Payé</span>
                  <div>
                    <strong>{event.title}</strong>
                    <p>{event.detail}</p>
                  </div>
                  <em>{(event.amount ?? 0).toLocaleString("fr-FR")} FCFA</em>
                  <div className={styles.adminModerationActions}>
                    <button type="button" className={`${styles.adminActionPrimary} ${styles.adminActionPrimary_blue}`} onClick={() => grantSubscription(event)}>
                      Accorder
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={styles.card}>
          <header className={styles.cardHeader}>
            <div>
              <h2>Abonnes et renouvellements</h2>
              <p>Suivi des proprietaires premium et actions de statut.</p>
            </div>
          </header>

          <div className={styles.adminFilterBar}>
            <label className={styles.adminSearchInline}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Proprietaire, plan, reference..." />
            </label>
          </div>

          <div className={styles.subscriptionList}>
            {filteredSubscriptions.map((sub) => {
              const plan = planById.get(sub.planId);

              return (
                <article className={styles.subscriptionRow} key={sub.id}>
                  <span className={`${styles.adminUserStatus} ${sub.status === "actif" ? styles.adminUserStatus_ok : sub.status === "pause" ? styles.adminUserStatus_wait : styles.adminUserStatus_fail}`}>
                    {statusLabel[sub.status]}
                  </span>
                  <div>
                    <strong>{sub.owner}</strong>
                    <p>{sub.id} · {plan?.name ?? "Plan inconnu"} · {sub.amount.toLocaleString("fr-FR")} FCFA</p>
                  </div>
                  <em>{sub.nextBilling}</em>
                  <div className={styles.adminModerationActions}>
                    <button type="button" className={styles.adminActionSecondary} onClick={() => setSubscriptionStatus(sub.id, "pause")}>
                      Pause
                    </button>
                    <button type="button" className={`${styles.adminActionPrimary} ${styles.adminActionPrimary_blue}`} onClick={() => setSubscriptionStatus(sub.id, "actif")}>
                      Activer
                    </button>
                    <button type="button" className={`${styles.adminActionPrimary} ${styles.adminActionPrimary_red}`} onClick={() => setSubscriptionStatus(sub.id, "expire")}>
                      Expirer
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </AdminShell>
  );
}
