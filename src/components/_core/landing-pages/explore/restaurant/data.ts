import { EXPLORE_BUSINESSES, type Business, type FooterState } from "../data";

export type MenuCategory = {
  id: string;
  label: string;
  imageSrc: string;
};

export type MenuProduct = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
};

export type RestaurantDetail = Business & {
  slug: string;
  categories: MenuCategory[];
  products: MenuProduct[];
};

const DEFAULT_CATEGORIES: MenuCategory[] = [
  {
    id: "all",
    label: "All",
    imageSrc:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "owo-soup",
    label: "Owo Soup",
    imageSrc:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "fish-cuisine",
    label: "Fish Cuisine",
    imageSrc:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "fish-cuisine-2",
    label: "Fish Cuisine",
    imageSrc:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "fish-cuisine-3",
    label: "Fish Cuisine",
    imageSrc:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=80&q=80",
  },
];

const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80";

function buildProducts(restaurantId: string): MenuProduct[] {
  const categories = ["all", "owo-soup", "fish-cuisine", "fish-cuisine-2"];
  return Array.from({ length: 9 }, (_, i) => ({
    id: `${restaurantId}-product-${i + 1}`,
    name: "Jollof Rice & Chicken",
    price: 4500,
    imageSrc: PRODUCT_IMAGE,
    imageAlt: "Jollof rice and grilled chicken",
    categoryId: categories[i % categories.length] ?? "all",
  }));
}

export function getRestaurantById(id: string): RestaurantDetail | undefined {
  const business = EXPLORE_BUSINESSES.find(
    (b) => b.id === id && b.category === "Restaurant",
  );
  if (!business) return undefined;

  return {
    ...business,
    slug: id,
    categories: DEFAULT_CATEGORIES,
    products: buildProducts(id),
  };
}

export function formatMenuPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function formatMenuPriceDecimal(value: number) {
  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export type RestaurantReview = {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  relativeTime: string;
  imageSrc: string;
  imageAlt: string;
};

export type RatingDistribution = {
  stars: number;
  count: number;
};

const REVIEW_IMAGE =
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80";

const REVIEW_COMMENT =
  "This product is super except for the very few Apps that comes with it. It worths the money.";

const REVIEW_AUTHORS = [
  "Kathryn Murphy",
  "Leslie Alexander",
  "Cameron Williamson",
  "Brooklyn Simmons",
  "Esther Howard",
  "Jenny Wilson",
  "Robert Fox",
  "Darlene Robertson",
];

const REVIEW_TIMES = [
  "2 days ago",
  "4 days ago",
  "1 week ago",
  "2 weeks ago",
  "3 weeks ago",
];

export function getRatingDistribution(reviewCount: number): RatingDistribution[] {
  const weights = [0.82, 0.1, 0.04, 0.02, 0.02];
  const counts = weights.map((weight) => Math.round(reviewCount * weight));
  const distributed = counts.reduce((sum, count) => sum + count, 0);
  if (distributed !== reviewCount && counts[0] !== undefined) {
    counts[0] += reviewCount - distributed;
  }

  return [5, 4, 3, 2, 1].map((stars, index) => ({
    stars,
    count: counts[index] ?? 0,
  }));
}

export function getRestaurantReviews(restaurantId: string): RestaurantReview[] {
  return Array.from({ length: 12 }, (_, index) => ({
    id: `${restaurantId}-review-${index + 1}`,
    rating: 5,
    comment: REVIEW_COMMENT,
    authorName: REVIEW_AUTHORS[index % REVIEW_AUTHORS.length] ?? "Guest",
    relativeTime: REVIEW_TIMES[index % REVIEW_TIMES.length] ?? "Recently",
    imageSrc: REVIEW_IMAGE,
    imageAlt: "Plated grilled dish with garnish",
  }));
}

export function getRestaurantStatus(footer: FooterState) {
  if (footer.type === "open") {
    return { label: `Open • Closes ${footer.closesAt}`, isOpen: true };
  }
  if (footer.type === "closed") {
    return { label: "Closed", isOpen: false };
  }
  return { label: footer.label, isOpen: true };
}
