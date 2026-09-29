export const demoUser = {
  name: "Siddhi",
  phone: "+91 98XXX 43210",
  address: {
    label: "Home",
    line: "B-402, Green Meadows, Baner, Pune 411045",
  },
  /** Product names bought before — powers "Buy it again" and recommendations. */
  history: [
    "Toned Milk",
    "Malai Paneer",
    "Maggi 2-Minute Noodles",
    "Farm Eggs",
    "Brown Bread",
    "Banana Robusta",
    "Amul Butter",
    "Classic Salted Chips",
  ],
  preferences: { diet: "veg", budget: 1200, allergies: [] as string[] },
};
