import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type RestaurantCartQuantities = Record<string, number>;

type RestaurantCartState = {
    cartsByRestaurant: Record<string, RestaurantCartQuantities>;
    setQuantity: (
        restaurantId: string,
        productId: string,
        quantity: number,
    ) => void;
    clearRestaurantCart: (restaurantId: string) => void;
};

const EMPTY_QUANTITIES: RestaurantCartQuantities = {};

export const useRestaurantCartStore = create<RestaurantCartState>()(
    persist(
        (set) => ({
            cartsByRestaurant: {},
            setQuantity: (restaurantId, productId, quantity) => {
                set((state) => {
                    const restaurantCart = {
                        ...state.cartsByRestaurant[restaurantId],
                    };

                    if (quantity <= 0) {
                        delete restaurantCart[productId];
                    } else {
                        restaurantCart[productId] = quantity;
                    }

                    const cartsByRestaurant = { ...state.cartsByRestaurant };

                    if (Object.keys(restaurantCart).length === 0) {
                        delete cartsByRestaurant[restaurantId];
                    } else {
                        cartsByRestaurant[restaurantId] = restaurantCart;
                    }

                    return { cartsByRestaurant };
                });
            },
            clearRestaurantCart: (restaurantId) => {
                set((state) => {
                    if (!state.cartsByRestaurant[restaurantId]) {
                        return state;
                    }

                    const cartsByRestaurant = { ...state.cartsByRestaurant };
                    delete cartsByRestaurant[restaurantId];
                    return { cartsByRestaurant };
                });
            },
        }),
        {
            name: "restaurant-cart",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                cartsByRestaurant: state.cartsByRestaurant,
            }),
        },
    ),
);

export function useRestaurantCart(restaurantId: string) {
    const quantities = useRestaurantCartStore(
        (state) => state.cartsByRestaurant[restaurantId] ?? EMPTY_QUANTITIES,
    );
    const setQuantity = useRestaurantCartStore((state) => state.setQuantity);
    const clearCart = useRestaurantCartStore(
        (state) => state.clearRestaurantCart,
    );

    const cartCount = Object.values(quantities).reduce(
        (sum, qty) => sum + qty,
        0,
    );

    return {
        quantities,
        cartCount,
        setProductQuantity: (productId: string, quantity: number) =>
            setQuantity(restaurantId, productId, quantity),
        clearCart: () => clearCart(restaurantId),
    };
}
