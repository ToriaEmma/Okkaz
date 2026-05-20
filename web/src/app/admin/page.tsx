"use client";

import { mockAds } from "@/lib/data";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Tableau de bord Admin</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ textAlign: 'left', padding: '1rem' }}>Annonce</th>
            <th style={{ textAlign: 'left', padding: '1rem' }}>Prix</th>
          </tr>
        </thead>
        <tbody>
          {mockAds.map(ad => (
            <tr key={ad.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Image src={ad.image} alt={ad.title} width={40} height={40} style={{ borderRadius: '4px' }} />
                {ad.title}
              </td>
              <td style={{ padding: '1rem' }}>{ad.price.toLocaleString()} FCFA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
