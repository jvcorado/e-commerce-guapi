"use client";

import { ProductType } from "@/types/productType";
import { useCartStore } from "../store";

type ProductProps = {
  product: ProductType;
};

export default function AddToCart({ product }: ProductProps) {
  const useStore = useCartStore();

  return (
    <>
      <button
        key={product.id}
        onClick={(e) => useStore.addToCart(product)}
        className="bg-green-600 hover:bg-green-800 transition duration-300 text-white p-4 rounded-lg w-full"
      >
        Adicionar
      </button>
    </>
  );
}
