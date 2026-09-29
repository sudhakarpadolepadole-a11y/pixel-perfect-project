/**
 * Mock product catalogue. Visuals use emoji + pastel gradient tiles so nothing
 * ever renders as a broken image; swap `emoji` for a real `image` URL later.
 */
export type Unit = { label: string; price: number; mrp: number };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  emoji: string;
  tint: string;
  units: Unit[];
  rating: number;
  ratingCount: number;
  tags: string[];
  nutrition: { label: string; value: string }[];
  description: string;
  stock: number;
  deliveryMins: number;
};

type Seed = [
  name: string,
  brand: string,
  category: string,
  subCategory: string,
  emoji: string,
  tint: string,
  price: number,
  mrp: number,
  unit: string,
  rating: number,
  ratingCount: number,
  tags: string[],
  stock?: number,
];

const seeds: Seed[] = [
  ["Banana Robusta", "Fresh Farm", "fruits-veg", "Fresh Fruits", "🍌", "#FFF7DB", 44, 60, "6 pcs", 4.4, 2310, ["veg", "vegan", "organic"]],
  ["Shimla Apple", "Fresh Farm", "fruits-veg", "Fresh Fruits", "🍎", "#FDE9EA", 129, 180, "4 pcs", 4.3, 1840, ["veg", "vegan"]],
  ["Alphonso Mango", "Ratnagiri", "fruits-veg", "Fresh Fruits", "🥭", "#FFF0D6", 349, 499, "1 kg", 4.7, 920, ["veg", "vegan", "organic"], 3],
  ["Nagpur Orange", "Fresh Farm", "fruits-veg", "Fresh Fruits", "🍊", "#FFEEDD", 89, 120, "1 kg", 4.1, 640, ["veg", "vegan"]],
  ["Green Grapes", "Fresh Farm", "fruits-veg", "Fresh Fruits", "🍇", "#EFF7E1", 79, 99, "500 g", 4.2, 780, ["veg", "vegan"]],
  ["Tomato Hybrid", "Daily Fresh", "fruits-veg", "Fresh Vegetables", "🍅", "#FDE6E3", 32, 45, "500 g", 4.0, 3120, ["veg", "vegan"]],
  ["Onion", "Daily Fresh", "fruits-veg", "Fresh Vegetables", "🧅", "#F6EFE3", 38, 52, "1 kg", 4.1, 4210, ["veg", "vegan"]],
  ["Potato", "Daily Fresh", "fruits-veg", "Fresh Vegetables", "🥔", "#F7F0E1", 41, 55, "1 kg", 4.2, 3890, ["veg", "vegan"]],
  ["Capsicum Green", "Daily Fresh", "fruits-veg", "Fresh Vegetables", "🫑", "#E7F6E4", 36, 49, "250 g", 4.0, 910, ["veg", "vegan"]],
  ["Baby Spinach", "Organic Valley", "fruits-veg", "Herbs & Seasonings", "🥬", "#E5F7E0", 45, 60, "200 g", 4.5, 520, ["veg", "vegan", "organic", "high-protein"]],
  ["Coriander Bunch", "Daily Fresh", "fruits-veg", "Herbs & Seasonings", "🌿", "#E9F7E2", 15, 22, "100 g", 4.0, 2210, ["veg", "vegan"]],
  ["Avocado", "Exotic Co", "fruits-veg", "Exotics", "🥑", "#EDF5DE", 189, 240, "2 pcs", 4.3, 410, ["veg", "vegan", "organic"], 2],

  ["Toned Milk", "Amul", "dairy-eggs", "Milk", "🥛", "#EAF2FF", 28, 30, "500 ml", 4.6, 8900, ["veg", "high-protein"]],
  ["Full Cream Milk", "Mother Dairy", "dairy-eggs", "Milk", "🍼", "#EAF2FF", 35, 37, "500 ml", 4.5, 5400, ["veg"]],
  ["Fresh Curd", "Amul", "dairy-eggs", "Curd & Yogurt", "🥣", "#F2F6FF", 42, 50, "400 g", 4.4, 3300, ["veg", "high-protein"]],
  ["Greek Yogurt", "Epigamia", "dairy-eggs", "Curd & Yogurt", "🍶", "#F4F0FF", 65, 80, "90 g", 4.5, 1240, ["veg", "high-protein"]],
  ["Malai Paneer", "Amul", "dairy-eggs", "Paneer & Cheese", "🧀", "#FFF7E6", 89, 105, "200 g", 4.6, 4120, ["veg", "high-protein"]],
  ["Cheese Slices", "Britannia", "dairy-eggs", "Paneer & Cheese", "🧀", "#FFF4DC", 125, 150, "10 slices", 4.2, 990, ["veg", "high-protein"]],
  ["Farm Eggs", "Eggoz", "dairy-eggs", "Eggs", "🥚", "#FFF6EC", 84, 99, "6 pcs", 4.4, 6100, ["high-protein"]],
  ["Amul Butter", "Amul", "dairy-eggs", "Butter & Ghee", "🧈", "#FFF3D6", 58, 62, "100 g", 4.7, 7200, ["veg"]],
  ["Cow Ghee", "Amul", "dairy-eggs", "Butter & Ghee", "🫙", "#FFF1CE", 320, 385, "500 ml", 4.6, 2200, ["veg"]],

  ["Whole Wheat Atta", "Aashirvaad", "atta-rice", "Atta", "🌾", "#FFF6E0", 265, 315, "5 kg", 4.6, 9100, ["veg"]],
  ["Multigrain Atta", "Aashirvaad", "atta-rice", "Atta", "🌾", "#FFF3D8", 315, 380, "5 kg", 4.4, 1400, ["veg", "high-protein"]],
  ["Basmati Rice", "India Gate", "atta-rice", "Rice", "🍚", "#FFFBEA", 399, 520, "5 kg", 4.5, 3300, ["veg", "gluten-free"]],
  ["Sona Masoori Rice", "Daawat", "atta-rice", "Rice", "🍚", "#FFFAE6", 289, 340, "5 kg", 4.2, 870, ["veg", "gluten-free"]],
  ["Toor Dal", "Tata Sampann", "atta-rice", "Dals & Pulses", "🫘", "#FFF1D9", 179, 210, "1 kg", 4.4, 2400, ["veg", "high-protein"]],
  ["Rajma Chitra", "Tata Sampann", "atta-rice", "Dals & Pulses", "🫘", "#F6EADA", 165, 195, "1 kg", 4.3, 760, ["veg", "high-protein", "gluten-free"]],
  ["Sunflower Oil", "Fortune", "atta-rice", "Oils", "🛢️", "#FFF8DC", 145, 175, "1 L", 4.1, 5600, ["veg", "vegan"]],
  ["Cold Pressed Mustard Oil", "Organic Valley", "atta-rice", "Oils", "🛢️", "#FFF4CC", 229, 275, "1 L", 4.4, 430, ["veg", "vegan", "organic"]],

  ["Classic Salted Chips", "Lay's", "snacks", "Chips", "🥔", "#FFEEE2", 20, 20, "52 g", 4.3, 12400, ["veg"]],
  ["Magic Masala Chips", "Lay's", "snacks", "Chips", "🍟", "#FFE9DB", 20, 20, "52 g", 4.5, 15200, ["veg"]],
  ["Aloo Bhujia", "Haldiram's", "snacks", "Namkeen", "🥨", "#FFEFD9", 52, 60, "200 g", 4.5, 6800, ["veg"]],
  ["Roasted Makhana", "Farmley", "snacks", "Namkeen", "🌰", "#FBF0E2", 149, 199, "100 g", 4.4, 1120, ["veg", "high-protein", "gluten-free"]],
  ["Good Day Cashew", "Britannia", "snacks", "Biscuits", "🍪", "#FFF1DE", 45, 50, "200 g", 4.4, 5300, ["veg"]],
  ["Marie Gold", "Britannia", "snacks", "Biscuits", "🍘", "#FFF4E4", 35, 40, "250 g", 4.2, 4200, ["veg"]],
  ["Butter Popcorn", "Act II", "snacks", "Popcorn", "🍿", "#FFF7E8", 40, 45, "70 g", 4.0, 1900, ["veg"]],
  ["Peanut Butter Crunchy", "Pintola", "snacks", "Namkeen", "🥜", "#F7EBD8", 349, 450, "1 kg", 4.6, 2100, ["veg", "high-protein", "gluten-free"]],

  ["Coca-Cola", "Coca-Cola", "beverages", "Soft Drinks", "🥤", "#FDE6E6", 40, 45, "750 ml", 4.4, 8800, ["veg"]],
  ["Sprite", "Coca-Cola", "beverages", "Soft Drinks", "🥤", "#E6F6EC", 40, 45, "750 ml", 4.3, 5200, ["veg"]],
  ["Orange Juice", "Real", "beverages", "Juices", "🧃", "#FFEEDC", 110, 130, "1 L", 4.2, 3100, ["veg", "vegan"]],
  ["Tender Coconut Water", "Cocofly", "beverages", "Juices", "🥥", "#EEF7F4", 55, 70, "200 ml", 4.3, 640, ["veg", "vegan", "gluten-free"]],
  ["Red Label Tea", "Brooke Bond", "beverages", "Tea & Coffee", "🍵", "#F6E9DC", 265, 310, "1 kg", 4.5, 4400, ["veg", "vegan"]],
  ["Instant Coffee", "Nescafé", "beverages", "Tea & Coffee", "☕", "#F2E7DC", 320, 380, "100 g", 4.5, 3900, ["veg", "vegan"]],
  ["Energy Drink", "Red Bull", "beverages", "Energy Drinks", "⚡", "#EAF0FF", 125, 135, "250 ml", 4.1, 1500, ["veg"], 2],

  ["Chicken Breast Boneless", "Licious", "chicken-fish", "Chicken", "🍗", "#FDE9EA", 289, 350, "450 g", 4.5, 3200, ["high-protein"]],
  ["Chicken Curry Cut", "Licious", "chicken-fish", "Chicken", "🍗", "#FCE6E6", 249, 299, "500 g", 4.4, 2800, ["high-protein"]],
  ["Rohu Fish Curry Cut", "Fresh Catch", "chicken-fish", "Fish", "🐟", "#E9F3FA", 299, 360, "500 g", 4.2, 780, ["high-protein"]],
  ["Prawns Medium", "Fresh Catch", "chicken-fish", "Fish", "🦐", "#FFECEA", 419, 499, "300 g", 4.3, 410, ["high-protein"], 0],
  ["Chicken Seekh Kebab", "Licious", "chicken-fish", "Ready to Cook", "🍢", "#FBEADA", 265, 320, "400 g", 4.4, 960, ["high-protein"]],

  ["Maggi 2-Minute Noodles", "Nestlé", "instant-food", "Noodles", "🍜", "#FFF0E2", 60, 72, "8 pack", 4.6, 21000, ["veg"]],
  ["Korean Ramen Hot", "Samyang", "instant-food", "Noodles", "🍲", "#FFE9E6", 189, 220, "2 pack", 4.3, 1200, ["veg"]],
  ["Frozen Green Peas", "Safal", "instant-food", "Frozen", "🫛", "#EAF7E4", 85, 99, "500 g", 4.3, 2600, ["veg", "vegan", "high-protein"]],
  ["French Fries Frozen", "McCain", "instant-food", "Frozen", "🍟", "#FFF3DC", 149, 180, "750 g", 4.2, 1900, ["veg"]],
  ["Tomato Soup", "Knorr", "instant-food", "Soups", "🥫", "#FDE8E4", 65, 75, "53 g", 4.1, 1300, ["veg"]],

  ["Dairy Milk Silk", "Cadbury", "sweet-tooth", "Chocolates", "🍫", "#F3EAFE", 175, 195, "150 g", 4.7, 9800, ["veg"]],
  ["KitKat Multipack", "Nestlé", "sweet-tooth", "Chocolates", "🍫", "#F6EAFB", 90, 100, "4 pack", 4.5, 4300, ["veg"]],
  ["Butterscotch Ice Cream", "Amul", "sweet-tooth", "Ice Cream", "🍨", "#FFF3E8", 199, 245, "700 ml", 4.4, 2100, ["veg"]],
  ["Kaju Katli", "Haldiram's", "sweet-tooth", "Indian Sweets", "🍬", "#FFF6E0", 399, 460, "400 g", 4.5, 1500, ["veg", "gluten-free"], 3],

  ["Brown Bread", "Britannia", "bakery", "Bread", "🍞", "#FBF0DC", 45, 50, "400 g", 4.2, 5100, ["veg"]],
  ["Multigrain Bread", "The Health Factory", "bakery", "Bread", "🥖", "#F8EDD8", 89, 110, "350 g", 4.4, 890, ["veg", "high-protein"]],
  ["Pav Buns", "Modern", "bakery", "Buns & Pav", "🥐", "#FBF2E0", 38, 45, "6 pcs", 4.1, 2400, ["veg"]],
  ["Chocolate Truffle Cake", "Bakers Lane", "bakery", "Cakes", "🍰", "#F9E9F0", 449, 549, "500 g", 4.6, 620, ["veg"], 2],

  ["Baby Diapers Pants M", "Pampers", "baby-care", "Diapers", "🧷", "#EAF7F5", 699, 899, "58 pcs", 4.5, 3300, []],
  ["Baby Cereal Apple", "Nestlé", "baby-care", "Baby Food", "🍼", "#EDF7F4", 285, 330, "300 g", 4.4, 1100, ["veg"]],
  ["Liquid Detergent", "Surf Excel", "cleaning", "Detergents", "🧴", "#E9F1FF", 249, 315, "2 L", 4.5, 4700, []],
  ["Floor Cleaner Citrus", "Lizol", "cleaning", "Cleaners", "🧽", "#EAF2FE", 189, 230, "975 ml", 4.4, 3200, []],
  ["Dishwash Gel", "Vim", "cleaning", "Dishwash", "🧼", "#EBF3FF", 115, 140, "750 ml", 4.3, 5600, []],
  ["Anti-Hairfall Shampoo", "Dove", "personal-care", "Hair Care", "🧴", "#FDECF3", 299, 375, "650 ml", 4.4, 4100, []],
  ["Face Wash Neem", "Himalaya", "personal-care", "Skin Care", "🧴", "#FCEDF2", 145, 180, "150 ml", 4.3, 3800, ["vegan"]],
  ["Toothpaste Advanced", "Colgate", "personal-care", "Oral Care", "🪥", "#FBEDF4", 99, 120, "200 g", 4.5, 6200, ["veg"]],
  ["Adult Dog Food Chicken", "Pedigree", "pet-care", "Dog Food", "🐶", "#F0F0E8", 549, 650, "3 kg", 4.5, 1400, []],
  ["Cat Food Tuna", "Whiskas", "pet-care", "Cat Food", "🐱", "#EFF0E9", 385, 450, "1.2 kg", 4.3, 720, []],
  ["Vitamin C Tablets", "Limcee", "pharmacy", "Vitamins", "💊", "#E7F4EC", 42, 50, "15 tabs", 4.4, 2900, ["veg"]],
  ["Electrolyte Powder", "ORS", "pharmacy", "Wellness", "💊", "#E8F5EE", 25, 30, "21 g", 4.5, 3400, ["veg"]],
  ["Band-Aid Washproof", "Band-Aid", "pharmacy", "First Aid", "🩹", "#E9F5EF", 95, 110, "20 pcs", 4.4, 1800, []],
];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function buildUnits(price: number, mrp: number, label: string): Unit[] {
  const base: Unit = { label, price, mrp };
  const big: Unit = {
    label: label.replace(/^(\d+)/, (m) => String(Number(m) * 2)),
    price: Math.round(price * 1.85),
    mrp: Math.round(mrp * 1.85),
  };
  return big.label === label ? [base] : [base, big];
}

export const products: Product[] = seeds.map((s) => {
  const [name, brand, category, subCategory, emoji, tint, price, mrp, unit, rating, ratingCount, tags, stock] = s;
  return {
    id: slug(`${brand}-${name}`),
    name,
    brand,
    category,
    subCategory,
    emoji,
    tint,
    units: buildUnits(price, mrp, unit),
    rating,
    ratingCount,
    tags,
    nutrition: [
      { label: "Energy", value: `${80 + (name.length * 7) % 220} kcal` },
      { label: "Protein", value: `${(1 + (name.length % 12)).toFixed(1)} g` },
      { label: "Carbs", value: `${(4 + (name.length % 30)).toFixed(1)} g` },
      { label: "Fat", value: `${(0.5 + (name.length % 9)).toFixed(1)} g` },
    ],
    description: `${name} from ${brand}. Freshly picked and quality checked, delivered to your door in minutes.`,
    stock: stock ?? 20,
    deliveryMins: 8 + (name.length % 5),
  };
});

export const productById = (id: string) => products.find((p) => p.id === id);

export const discountPct = (u: Unit) =>
  u.mrp > u.price ? Math.round(((u.mrp - u.price) / u.mrp) * 100) : 0;

export const byIds = (ids: string[]) =>
  ids.map((id) => productById(id)).filter(Boolean) as Product[];
