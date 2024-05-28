import Image from "next/image";
import { Key } from "react";
import { ProductType } from "../types/productType";

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products/");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  console.log(products);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {products.map((item: ProductType) => (
        <div key={item.id} className="h-[400px] bg-slate-500">
          <Image
            src={item.image}
            alt={item.title}
            width={100}
            height={100}
          ></Image>
          {item.title}
        </div>
      ))}
    </div>
  );
}
