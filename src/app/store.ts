import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/types/productType"

type CartState = {
    cart: ProductType[];
    addToCart: (product: ProductType) => void;
    removeToCart: (productId: string) => void;
    isOpen: boolean;
    toggleCart: () => void;

}



export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
        addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
        removeToCart: (productId) => set((state) => ({
            cart: state.cart.filter(product => product.id !== productId)
        })),
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })) //SEMPORE QUE CLICAR O STATE VAI SER O OPOSTO DO ATUAL
    }), { name: 'cart-storage' })
)

