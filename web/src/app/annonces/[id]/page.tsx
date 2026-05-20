"use client";

import { use } from "react";
import { mockAds } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const ad = mockAds.find(a => a.id === id);

  if (!ad) return <div className="container">Annonce non trouvée</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link href="/annonces">← Retour aux annonces</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ position: 'relative', height: '400px' }}>
          <Image src={ad.image} alt={ad.title} fill style={{ objectFit: 'cover', borderRadius: '1rem' }} />
        </div>
        <div>
          <h1>{ad.title}</h1>
          <p>📍 {ad.location}</p>
          <h2 style={{ color: '#250C69', margin: '1rem 0' }}>{ad.price.toLocaleString()} FCFA / mois</h2>
          <p>{ad.description}</p>
          <button style={{ backgroundColor: '#250C69', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', marginTop: '2rem' }}>
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}
