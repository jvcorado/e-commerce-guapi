"use client";

import { ProductType } from "@/types/productType";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "../store";
import AddToCart from "./AddToCart";
import Link from "next/link";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="h-96 flex flex-col gap-5  bg-slate-800 p-3 rounded-lg"
    >
      <ProductImage fill product={product} />
      <div className="flex flex-col gap-3 text-white ">
        <h1 className="font-bold text-base">{product.name}</h1>
        <h2 className="text-base font-bold">{formatPrice(product.price)}</h2>
        <AddToCart product={product} />
      </div>
    </Link>
  );
}
