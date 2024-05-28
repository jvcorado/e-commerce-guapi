import Image from "next/image";
import { Key } from "react";
import { ProductType } from "../types/productType";
import Product from "./components/Product";

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products/");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {products.map((item: ProductType) => (
        <Product key={item.id} product={item} />
      ))}
    </div>
  );
}
