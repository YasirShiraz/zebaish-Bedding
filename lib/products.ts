// Product price mapping
export const productPrices: { [key: string]: number } = {
  "H2D+C": 299.99,
  "A10": 349.99,
  "KBH311": 249.99,
  "C002": 279.99,
  "UP650X": 399.99,
  "AP9405": 199.99,
  "DC02": 229.99,
  "TY-02": 219.99,
  "TY01": 189.99,
  "X177": 159.99,
};

// Product image mapping
const imageMap: { [key: string]: string } = {
  "H2D+C": "/images/004_Kidilo H2D 2-in-1 Convertible Cribs and Strollers Flat Padded Sleep Surface Bed .webp",
  "A10": "/images/003_2025 Stylish Stroller High-fashion Design Foldable Traveling Pushchair With Shoc.webp",
  "KBH311": "/images/001_Kidilo Convertible Infant Seat Stroller Baby Travel Pram FMVSS ASTM Certificated.webp",
  "C002": "/images/005_3-in-1 Car Seat and Stroller Anti-rebound Safety-certified Materials With Fashio.webp",
  "UP650X": "/images/015_3-in-1 Foldable Crib Stroller Lightweight Aluminum Alloy Frame Newborn Bassinet .webp",
  "AP9405": "/images/016_Baby Bassinet UPF 50+ sunshade CPSC Certificated Infant Stroller Safe and Comfor.webp",
  "DC02": "/images/002_2-in-1 Convertible Chair Stroller Mobile Durable Adjustable Backrest Baby Pushch.webp",
  "TY-02": "/images/006_Kidilo 2-in-1 Cheap Car Seat Stroller ASTM F833 Certificated Baby Pram With Safe.webp",
  "TY01": "/images/007_Kidilo 3-in-1 Stroller and Car Seat UPF50+ Premium Buggy Easy to Carry.webp",
  "X177": "/images/008_3-in-1 Stroller with Car Seat Global Standards Safety Baby Carriage With Univers.webp",
};

// Helper function to get product price by code
export function getProductPrice(code: string): number {
  return productPrices[code] || 199.99;
}

// Helper function to get product image by code
export function getProductImage(code: string): string {
  return imageMap[code] || "/images/001_Kidilo Convertible Infant Seat Stroller Baby Travel Pram FMVSS ASTM Certificated.webp";
}

// Helper function to get product slug from code
export function getProductSlug(code: string): string {
  const slugMap: { [key: string]: string } = {
    "H2D+C": "stroller-h2dc",
    "A10": "stroller-a10",
    "KBH311": "car-seat-kbh311",
    "C002": "car-seat-c002",
    "UP650X": "crib-up650x",
    "AP9405": "crib-ap9405",
    "DC02": "high-chair-dc02",
    "TY-02": "high-chair-ty02",
    "TY01": "swing-ty01",
    "X177": "walker-x177",
  };
  return slugMap[code] || "";
}

