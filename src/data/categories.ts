export type Category = {
  id: string;
  name: string;
  emoji: string;
  tint: string; // tailwind-safe inline pastel
  subCategories: string[];
};

export const categories: Category[] = [
  { id: "fruits-veg", name: "Fruits & Veg", emoji: "🥬", tint: "#E8F7E4", subCategories: ["Fresh Fruits", "Fresh Vegetables", "Herbs & Seasonings", "Exotics"] },
  { id: "dairy-eggs", name: "Dairy & Eggs", emoji: "🥛", tint: "#EAF2FF", subCategories: ["Milk", "Curd & Yogurt", "Paneer & Cheese", "Eggs", "Butter & Ghee"] },
  { id: "atta-rice", name: "Atta & Rice", emoji: "🌾", tint: "#FFF6E0", subCategories: ["Atta", "Rice", "Dals & Pulses", "Oils"] },
  { id: "snacks", name: "Snacks", emoji: "🍿", tint: "#FFEEE2", subCategories: ["Chips", "Namkeen", "Biscuits", "Popcorn"] },
  { id: "beverages", name: "Beverages", emoji: "🥤", tint: "#E6F6FA", subCategories: ["Soft Drinks", "Juices", "Tea & Coffee", "Energy Drinks"] },
  { id: "chicken-fish", name: "Chicken & Fish", emoji: "🍗", tint: "#FDE9EA", subCategories: ["Chicken", "Fish", "Mutton", "Ready to Cook"] },
  { id: "instant-food", name: "Instant Food", emoji: "🍜", tint: "#FFF0F5", subCategories: ["Noodles", "Frozen", "Soups", "Ready Meals"] },
  { id: "sweet-tooth", name: "Sweet Tooth", emoji: "🍫", tint: "#F3EAFE", subCategories: ["Chocolates", "Ice Cream", "Indian Sweets", "Candy"] },
  { id: "bakery", name: "Bakery", emoji: "🥖", tint: "#FBF0DC", subCategories: ["Bread", "Buns & Pav", "Cakes", "Rusk"] },
  { id: "baby-care", name: "Baby Care", emoji: "🍼", tint: "#EAF7F5", subCategories: ["Diapers", "Baby Food", "Baby Bath"] },
  { id: "cleaning", name: "Cleaning", emoji: "🧼", tint: "#E9F1FF", subCategories: ["Detergents", "Cleaners", "Dishwash"] },
  { id: "personal-care", name: "Personal Care", emoji: "🧴", tint: "#FDECF3", subCategories: ["Hair Care", "Skin Care", "Oral Care"] },
  { id: "pet-care", name: "Pet Care", emoji: "🐾", tint: "#F0F0E8", subCategories: ["Dog Food", "Cat Food", "Treats"] },
  { id: "pharmacy", name: "Pharmacy", emoji: "💊", tint: "#E7F4EC", subCategories: ["Wellness", "First Aid", "Vitamins"] },
];

export const quickFilters = [
  "Under ₹99",
  "Bestsellers",
  "Organic",
  "High Protein",
  "Vegan",
  "New",
] as const;
