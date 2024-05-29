import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { IoTrashBin } from "react-icons/io5";
import { useCartStore } from "../store";

import CheckoutButton from "./CheckoutButton";
import Checkout from "./Checkout";

export default function CartDrawer() {
  const useStore = useCartStore();

  return (
    <div
      onClick={() => useStore.toggleCart()}
      className="cursor-pointer fixed w-full top-0 left-0 h-screen bg-black/25 transition-all duration-1000"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute cursor-default rounded-l-3xl flex flex-col gap-5 right-0 top-0 w-2/3 md:w-1/4 min-h-screen !z-[1000] bg-slate-800 py-5   px-10  "
      >
        <div className=" flex items-center justify-between mb-5 text-white">
          <h1 className="text-bold text-lg  md:text-3xl capitalize">
            meu carrinho
          </h1>
        </div>

        <div className="overflow-y-auto flex flex-col gap-5">
          {useStore.cart.map((item) => {
            if (item.price == null || item.quantity == null) {
              return null; // Ignora itens com valores nulos
            }
            const subtotal = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="bg-slate-600 p-5 rounded-lg flex flex-col md:flex-row gap-2 items-center justify-between"
              >
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-lg "
                  />
                  <div className="flex flex-col">
                    <p>{item.name}</p>
                    <p>{formatPrice(item.price)}</p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => useStore.removeToCart(item)}
                        className="h-5 w-5 flex items-center justify-center rounded-full bg-black text-white"
                      >
                        -
                      </button>
                      <p>{item.quantity} </p>
                      <button
                        onClick={(e) => useStore.addToCart(item)}
                        className="h-5 w-5 flex items-center text-xs justify-center rounded-full bg-black text-white"
                      >
                        +
                      </button>
                    </div>

                    <p>Subtotal: {formatPrice(subtotal)}</p>
                  </div>
                </div>

                <button
                  onClick={() => useStore.clearItem(item.id)}
                  className="h-[100%]  bg-red-600 text-white"
                >
                  <IoTrashBin />
                </button>
              </div>
            );
          })}

          {useStore.cart.length > 0 && useStore.onCheckout === "cart" && (
            <CheckoutButton />
          )}

          {useStore.onCheckout === "checkout" && <Checkout />}
        </div>
      </div>
    </div>
  );
}
