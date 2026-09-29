import { products, type Product } from "./products";

export type Recipe = {
  id: string;
  name: string;
  emoji: string;
  tint: string;
  minutes: number;
  serves: number;
  ingredients: string[]; // product names
};

export const recipes: Recipe[] = [
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    emoji: "🍛",
    tint: "#FFE9D9",
    minutes: 30,
    serves: 4,
    ingredients: ["Malai Paneer", "Tomato Hybrid", "Onion", "Amul Butter", "Fresh Curd", "Coriander Bunch"],
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    emoji: "🍗",
    tint: "#FDE3E1",
    minutes: 45,
    serves: 4,
    ingredients: ["Chicken Breast Boneless", "Amul Butter", "Tomato Hybrid", "Fresh Curd", "Onion", "Cow Ghee"],
  },
  {
    id: "veg-pulao",
    name: "Veg Pulao",
    emoji: "🍚",
    tint: "#FFF4DA",
    minutes: 25,
    serves: 3,
    ingredients: ["Basmati Rice", "Frozen Green Peas", "Onion", "Capsicum Green", "Cow Ghee"],
  },
  {
    id: "masala-maggi",
    name: "Cheesy Masala Maggi",
    emoji: "🍜",
    tint: "#FFF0E0",
    minutes: 10,
    serves: 2,
    ingredients: ["Maggi 2-Minute Noodles", "Cheese Slices", "Onion", "Tomato Hybrid", "Capsicum Green"],
  },
  {
    id: "protein-breakfast",
    name: "High-Protein Breakfast",
    emoji: "🍳",
    tint: "#EAF5FF",
    minutes: 15,
    serves: 2,
    ingredients: ["Farm Eggs", "Multigrain Bread", "Greek Yogurt", "Peanut Butter Crunchy", "Banana Robusta"],
  },
  {
    id: "rajma-chawal",
    name: "Rajma Chawal",
    emoji: "🫘",
    tint: "#F4EADA",
    minutes: 50,
    serves: 4,
    ingredients: ["Rajma Chitra", "Sona Masoori Rice", "Onion", "Tomato Hybrid", "Sunflower Oil"],
  },
  {
    id: "pav-bhaji",
    name: "Pav Bhaji",
    emoji: "🍲",
    tint: "#FFEDD8",
    minutes: 35,
    serves: 4,
    ingredients: ["Pav Buns", "Potato", "Frozen Green Peas", "Capsicum Green", "Amul Butter", "Tomato Hybrid"],
  },
  {
    id: "smoothie-bowl",
    name: "Berry Banana Smoothie",
    emoji: "🥤",
    tint: "#F5EAFB",
    minutes: 8,
    serves: 2,
    ingredients: ["Banana Robusta", "Greek Yogurt", "Toned Milk", "Roasted Makhana"],
  },
];

export const productsByNames = (names: string[]): Product[] =>
  names
    .map((n) => products.find((p) => p.name.toLowerCase() === n.toLowerCase()))
    .filter(Boolean) as Product[];
