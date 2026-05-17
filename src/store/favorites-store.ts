import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { EXPLORE_BUSINESSES } from "@/components/_core/landing-pages/explore/data";

const DEFAULT_FAVORITE_IDS = EXPLORE_BUSINESSES.slice(0, 8).map(
    (business) => business.id,
);

type FavoritesState = {
    ids: string[];
    toggle: (id: string) => void;
    isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            ids: DEFAULT_FAVORITE_IDS,
            toggle: (id) =>
                set((state) => ({
                    ids: state.ids.includes(id)
                        ? state.ids.filter((entry) => entry !== id)
                        : [...state.ids, id],
                })),
            isFavorite: (id) => get().ids.includes(id),
        }),
        {
            name: "keep-os-favorites",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ ids: state.ids }),
        },
    ),
);
