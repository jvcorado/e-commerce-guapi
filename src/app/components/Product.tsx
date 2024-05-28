"use client";

import { ProductType } from "@/types/productType";
import { ProductImage } from "./ProductImage";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  return (
    <div
      key={product.id}
      className="h-96 flex flex-col gap-5  bg-slate-800 p-3 rounded-lg"
    >
      <ProductImage fill product={product} />
      <div className="flex flex-col gap-3 text-white ">
        <h1 className="font-bold text-base">{product.title}</h1>
        {/*   <p>{product.description}</p> */}
        <h2 className="text-base font-bold">R${product.price}</h2>
        <button className="bg-teal-600 hover:bg-teal-800 transition duration-300 text-white p-4 rounded-lg w-full">
          Comprar
        </button>
      </div>
    </div>
  );
}
