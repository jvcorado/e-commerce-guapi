import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/types/productType"

type CartState = {
    cart: ProductType[];
    addToCart: (product: ProductType) => void;
    removeToCart: (product: ProductType) => void;
    isOpen: boolean;
    toggleCart: () => void;
    clearItem: (productId: string) => void;
    onCheckout: string;
    setCheckout: (checkout: string) => void
}



export const useCartStore = create<CartState>()(
    persist((set) => ({
        cart: [],
        isOpen: false,
        addToCart: (item) => set((state) => {
            const product = state.cart.find((p) => p.id === item.id)

            if (product) {
                const updateCart = state.cart.map((p) => {
                    if (p.id === product.id) {
                        return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 }
                    }
                    return p
                })

                return { cart: updateCart }


            } else {
                return { cart: [...state.cart, { ...item, quantity: 1 }] }
            }

        }),

        removeToCart: (item) => set((state) => {
            const product = state.cart.find((p) => p.id === item.id);

            if (product) {
                const updatedCart = state.cart
                    .map((p) => {
                        if (p.id === product.id) {
                            const newQuantity = (p.quantity ?? 1) - 1; // Usa 1 como valor padrão se p.quantity for undefined
                            return { ...product, quantity: newQuantity };
                        }
                        return p;
                    })
                    .filter((p) => (p.quantity ?? 0) > 0)

                return { cart: updatedCart };
            } else {
                return { cart: state.cart }; // Se o produto não estiver no carrinho, não faça nada
            }
        }),

        clearItem: (productId) => set((state) => ({
            cart: state.cart.filter(product => product.id !== productId)
        })),

        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })), //SEMPORE QUE CLICAR O STATE VAI SER O OPOSTO DO ATUAL

        onCheckout: 'cart',

        setCheckout: (checkout) => set(() => ({ onCheckout: checkout }))


    }), { name: 'cart-storage' }),








)

