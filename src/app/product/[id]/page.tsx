import AddToCart from "@/app/components/AddToCart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Stripe from "stripe";

type ProductPageProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10",
  });

  const produto = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: produto.id,
  });

  return {
    id: produto.id,
    price: price.data[0].unit_amount,
    name: produto.name,
    image: produto.images[0],
    description: produto.description,
    currency: price.data[0].currency,
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center  bg-slate-900 text-gray-300 w-2/3  gap-10 rounded-lg shadow-lg">
      <Image src={product.image} width={300} height={300} alt={product.name} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-7xl">{product.name}</h1>
          <h2 className="text-3xl">{formatPrice(product.price)}</h2>
        </div>

        <div>
          <p className="text-lg">{product.description}</p>
        </div>
        <AddToCart key={product.id} product={product} />
      </div>
    </div>
  );
}
