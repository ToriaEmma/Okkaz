export interface Ad {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  image: string;
  owner: string;
  description: string;
  loaPossible: boolean;
}

export const mockAds: Ad[] = [
  {
    id: "1",
    title: "Mercedes-Benz Classe G",
    category: "Véhicules",
    price: 150000,
    location: "Cotonou, Fidjrossè",
    image: "/ads/car1.jpg",
    owner: "Auto Prestige",
    description: "Magnifique Mercedes Classe G en excellent état. LOA disponible sur 24 mois.",
    loaPossible: true,
  },
  {
    id: "2",
    title: "Villa Moderne 4 Chambres",
    category: "Immobilier",
    price: 500000,
    location: "Abomey-Calavi, Arconville",
    image: "/ads/house1.jpg",
    owner: "Immo Bénin",
    description: "Villa neuve avec piscine. Idéale pour famille. Option d'achat après 3 ans.",
    loaPossible: true,
  },
  {
    id: "3",
    title: "iPhone 15 Pro Max 256GB",
    category: "Électronique",
    price: 25000,
    location: "Cotonou, Ganhi",
    image: "/ads/phone1.jpg",
    owner: "Digital Store",
    description: "Dernier iPhone disponible en location simple ou achat progressif.",
    loaPossible: true,
  },
  {
    id: "4",
    title: "Groupe Électrogène 50kVA",
    category: "Équipements Pro",
    price: 75000,
    location: "Porto-Novo",
    image: "/ads/generator1.jpg",
    owner: "Pro Equipment",
    description: "Matériel industriel haute performance. Parfait pour chantiers.",
    loaPossible: false,
  },
];
