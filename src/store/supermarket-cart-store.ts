import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SupermarketCartQuantities = Record<string, number>;

type SupermarketCartState = {
    cartsBySupermarket: Record<string, SupermarketCartQuantities>;
    setQuantity: (
        supermarketId: string,
        productId: string,
        quantity: number,
    ) => void;
    clearSupermarketCart: (supermarketId: string) => void;
};

const EMPTY_QUANTITIES: SupermarketCartQuantities = {};

export const useSupermarketCartStore = create<SupermarketCartState>()(
    persist(
        (set) => ({
            cartsBySupermarket: {},
            setQuantity: (supermarketId, productId, quantity) => {
                set((state) => {
                    const supermarketCart = {
                        ...state.cartsBySupermarket[supermarketId],
                    };

                    if (quantity <= 0) {
                        delete supermarketCart[productId];
                    } else {
                        supermarketCart[productId] = quantity;
                    }

                    const cartsBySupermarket = {
                        ...state.cartsBySupermarket,
                    };

                    if (Object.keys(supermarketCart).length === 0) {
                        delete cartsBySupermarket[supermarketId];
                    } else {
                        cartsBySupermarket[supermarketId] = supermarketCart;
                    }

                    return { cartsBySupermarket };
                });
            },
            clearSupermarketCart: (supermarketId) => {
                set((state) => {
                    if (!state.cartsBySupermarket[supermarketId]) {
                        return state;
                    }

                    const cartsBySupermarket = {
                        ...state.cartsBySupermarket,
                    };
                    delete cartsBySupermarket[supermarketId];
                    return { cartsBySupermarket };
                });
            },
        }),
        {
            name: "supermarket-cart",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                cartsBySupermarket: state.cartsBySupermarket,
            }),
        },
    ),
);

export function useSupermarketCart(supermarketId: string) {
    const quantities = useSupermarketCartStore(
        (state) => state.cartsBySupermarket[supermarketId] ?? EMPTY_QUANTITIES,
    );
    const setQuantity = useSupermarketCartStore((state) => state.setQuantity);

    const cartCount = Object.values(quantities).reduce(
        (sum, qty) => sum + qty,
        0,
    );

    return {
        quantities,
        cartCount,
        setProductQuantity: (productId: string, quantity: number) =>
            setQuantity(supermarketId, productId, quantity),
    };
}
