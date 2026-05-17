import { EXPLORE_BUSINESSES, type Business, type FooterState } from "../data";

export type ProductCategory = {
    id: string;
    label: string;
    imageSrc: string;
};

export type SupermarketProduct = {
    id: string;
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
    categoryId: string;
};

export type SupermarketDetail = Business & {
    slug: string;
    categories: ProductCategory[];
    products: SupermarketProduct[];
};

const PRODUCT_IMAGE =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";

const CATEGORY_IMAGES: Record<string, string> = {
    "fresh-produce":
        "https://images.unsplash.com/photo-1610832958501-7ee272c42d6b?auto=format&fit=crop&w=80&q=80",
    beverages:
        "https://images.unsplash.com/photo-1625772299848-391b6aabe137?auto=format&fit=crop&w=80&q=80",
    household:
        "https://images.unsplash.com/photo-1585421514287-efb74aae4b2d?auto=format&fit=crop&w=80&q=80",
    snacks:
        "https://images.unsplash.com/photo-1621939514649-cee3549115c4?auto=format&fit=crop&w=80&q=80",
    "frozen-foods":
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=80&q=80",
    bakery:
        "https://images.unsplash.com/photo-1509440155596-9c225381d26a?auto=format&fit=crop&w=80&q=80",
};

const CATEGORY_LABELS: Record<string, string> = {
    "fresh-produce": "Fresh Produce",
    beverages: "Beverages",
    household: "Household",
    snacks: "Snacks",
    "frozen-foods": "Frozen Foods",
    bakery: "Bakery",
};

const DEFAULT_CATEGORY_IDS = [
    "fresh-produce",
    "beverages",
    "household",
    "snacks",
    "frozen-foods",
    "bakery",
];

const PRODUCT_NAMES = [
    "Peak Milk 1L",
    "Golden Morn 900g",
    "Fresh Tomatoes 1kg",
    "Indomie Chicken 70g",
    "Dangote Sugar 1kg",
    "Golden Penny Spaghetti",
    "Coca-Cola 50cl",
    "Dettol Soap 3-Pack",
    "Frozen Chicken 1kg",
    "Bread Loaf",
    "Basmati Rice 5kg",
    "Bottled Water 1.5L",
];

function buildCategories(supermarket: Business): ProductCategory[] {
    const categoryIds = supermarket.productCategories?.length
        ? [...new Set([...DEFAULT_CATEGORY_IDS, ...supermarket.productCategories])]
        : DEFAULT_CATEGORY_IDS;

    const categories = categoryIds
        .map((id) => {
            const label = CATEGORY_LABELS[id];
            if (!label) return null;
            return {
                id,
                label,
                imageSrc: CATEGORY_IMAGES[id] ?? supermarket.imageSrc,
            };
        })
        .filter((category): category is ProductCategory => category !== null);

    return [
        {
            id: "all",
            label: "All",
            imageSrc: supermarket.imageSrc,
        },
        ...categories,
    ];
}

function buildProducts(supermarket: Business): SupermarketProduct[] {
    const categoryIds = supermarket.productCategories?.length
        ? supermarket.productCategories
        : DEFAULT_CATEGORY_IDS;

    return Array.from({ length: 12 }, (_, index) => ({
        id: `${supermarket.id}-product-${index + 1}`,
        name: PRODUCT_NAMES[index % PRODUCT_NAMES.length] ?? supermarket.name,
        price: 4500 + (index % 4) * 500,
        imageSrc: supermarket.imageSrc,
        imageAlt: supermarket.imageAlt,
        categoryId: categoryIds[index % categoryIds.length] ?? "fresh-produce",
    }));
}

export function getSupermarketById(id: string): SupermarketDetail | undefined {
    const business = EXPLORE_BUSINESSES.find(
        (entry) => entry.id === id && entry.category === "Supermarket",
    );
    if (!business) return undefined;

    return {
        ...business,
        slug: id,
        categories: buildCategories(business),
        products: buildProducts(business),
    };
}

export function formatProductPrice(value: number) {
    return `₦${value.toLocaleString("en-NG")}`;
}

export function formatProductPriceDecimal(value: number) {
    return `₦${value.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

export function getSupermarketStatus(footer: FooterState) {
    if (footer.type === "open") {
        return { label: `Open • Closes ${footer.closesAt}`, isOpen: true };
    }
    if (footer.type === "closed") {
        return { label: "Closed", isOpen: false };
    }
    return { label: footer.label, isOpen: true };
}
