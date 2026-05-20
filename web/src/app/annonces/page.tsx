"use client";

import { useState } from "react";
import { mockAds } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function AnnoncesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Toutes");

  const categories = ["Toutes", ...new Set(mockAds.map(ad => ad.category))];

  const filteredAds = mockAds.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ad.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "Toutes" || ad.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <div style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h1>Toutes les annonces</h1>
        <p>{filteredAds.length} résultats trouvés au Bénin</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Rechercher..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                border: '1px solid #ccc',
                backgroundColor: category === cat ? '#250C69' : 'white',
                color: category === cat ? 'white' : 'black'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredAds.map(ad => (
          <div key={ad.id} style={{ border: '1px solid #eee', borderRadius: '1rem', overflow: 'hidden' }}>
             <div style={{ position: 'relative', height: '200px' }}>
                <Image src={ad.image} alt={ad.title} fill style={{ objectFit: 'cover' }} />
             </div>
             <div style={{ padding: '1rem' }}>
                <h3>{ad.title}</h3>
                <p>{ad.price.toLocaleString()} FCFA / mois</p>
                <Link href={`/annonces/${ad.id}`}>Détails</Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
