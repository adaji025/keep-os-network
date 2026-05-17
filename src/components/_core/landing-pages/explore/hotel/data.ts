import {
  EXPLORE_BUSINESSES,
  ROOM_TYPE_FILTER_OPTIONS,
  type Business,
} from "../data";

export type RoomCategory = {
  id: string;
  label: string;
  imageSrc: string;
};

export type HotelRoom = {
  id: string;
  name: string;
  pricePerNight: number;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
};

export type HotelDetail = Business & {
  slug: string;
  categories: RoomCategory[];
  rooms: HotelRoom[];
};

const ROOM_IMAGE =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80";

const CATEGORY_IMAGES: Record<string, string> = {
  "deluxe-room":
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=80&q=80",
  "executive-suite":
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=80&q=80",
  "conference-room":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=80&q=80",
  "presidential-suite":
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=80&q=80",
  "standard-room":
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=80&q=80",
  "family-suite":
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=80&q=80",
  penthouse:
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=80&q=80",
  "fish-cuisine":
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=80&q=80",
};

const DEFAULT_CATEGORY_IDS = [
  "deluxe-room",
  "executive-suite",
  "conference-room",
  "presidential-suite",
  "fish-cuisine",
];

function buildCategories(hotel: Business): RoomCategory[] {
  const categoryIds = hotel.roomTypes?.length
    ? [...new Set([...DEFAULT_CATEGORY_IDS, ...hotel.roomTypes])]
    : DEFAULT_CATEGORY_IDS;

  const extraLabels: Record<string, string> = {
    "fish-cuisine": "Fish Cuisine",
  };

  const categories = categoryIds
    .map((id) => {
      const option = ROOM_TYPE_FILTER_OPTIONS.find((row) => row.id === id);
      const label = option?.label ?? extraLabels[id];
      if (!label) return null;
      return {
        id,
        label,
        imageSrc: CATEGORY_IMAGES[id] ?? ROOM_IMAGE,
      };
    })
    .filter((category): category is RoomCategory => category !== null);

  return [
    {
      id: "all",
      label: "All",
      imageSrc: hotel.imageSrc,
    },
    ...categories,
  ];
}

function buildRooms(hotel: Business): HotelRoom[] {
  const categoryIds = hotel.roomTypes?.length
    ? hotel.roomTypes
    : DEFAULT_CATEGORY_IDS.filter((id) => id !== "fish-cuisine");

  return Array.from({ length: 12 }, (_, index) => ({
    id: `${hotel.id}-room-${index + 1}`,
    name: hotel.name,
    pricePerNight: 45000,
    imageSrc: hotel.imageSrc,
    imageAlt: hotel.imageAlt,
    categoryId: categoryIds[index % categoryIds.length] ?? "deluxe-room",
  }));
}

export function getHotelById(id: string): HotelDetail | undefined {
  const business = EXPLORE_BUSINESSES.find(
    (entry) => entry.id === id && entry.category === "Hotel",
  );
  if (!business) return undefined;

  return {
    ...business,
    slug: id,
    categories: buildCategories(business),
    rooms: buildRooms(business),
  };
}

export function formatRoomPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")} / night`;
}
