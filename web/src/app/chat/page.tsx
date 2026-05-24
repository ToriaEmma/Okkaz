"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./chat.module.css";

const MOCK_MESSAGES = [
  { id: 1, from: "seller", text: "Bonjour, vous êtes bien sur le chat OKKAZ.", time: "10:02" },
  { id: 2, from: "buyer", text: "Bonjour, je veux des informations avant de réserver.", time: "10:05" },
  { id: 3, from: "seller", text: "OKKAZ peut vous accompagner. Le numéro du vendeur sera dévoilé uniquement après paiement validé.", time: "10:06" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "buyer", text, time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>

        {/* Header */}
        <div className={styles.header}>
          <Link href="/annonces" className={styles.back}>←</Link>
          <div className={styles.headerInfo}>
            <div className={styles.avatar}>OK</div>
            <div>
              <p className={styles.sellerName}>Chat OKKAZ</p>
              <p className={styles.sellerStatus}>Support sécurisé · En ligne</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.msg} ${msg.from === "buyer" ? styles.msgBuyer : styles.msgSeller}`}>
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button type="button" className={styles.sendBtn} onClick={send}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

      </div>
    </main>
  );
}
