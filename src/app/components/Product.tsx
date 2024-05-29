"use client";

import { ProductType } from "@/types/productType";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "../store";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  const useStore = useCartStore();

  return (
    <div
      key={product.id}
      className="h-96 flex flex-col gap-5  bg-slate-800 p-3 rounded-lg"
    >
      <ProductImage fill product={product} />
      <div className="flex flex-col gap-3 text-white ">
        <h1 className="font-bold text-base">{product.name}</h1>
        <h2 className="text-base font-bold">{formatPrice(product.price)}</h2>
        <button
          onClick={(e) => useStore.addToCart(product)}
          className="bg-teal-600 hover:bg-teal-800 transition duration-300 text-white p-4 rounded-lg w-full"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
