"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/productType";

interface ProductImageProps {
  product: ProductType;
  fill?: boolean;
}

export const ProductImage = ({ product, fill }: ProductImageProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full flex items-center justify-center max-h-72 flex-1 bg-slate-500 rounded-lg">
      {fill ? (
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-cover ${
            loading
              ? "scale-110 blur-3xl grayscale animate-pulse"
              : "scale-100 blur-0 grayscale-0 animate-none"
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      ) : (
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={700}
          className={`object-cover ${
            loading
              ? "scale-110 blur-3xl grayscale animate-pulse"
              : " scale-100 blur-0 grayscale-0 animate-none"
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      )}
    </div>
  );
};
