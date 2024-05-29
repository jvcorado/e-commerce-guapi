"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { IoTrashBin } from "react-icons/io5";

export default function Cart() {
  const useStore = useCartStore();

  return (
    <>
      <div
        onClick={() => useStore.toggleCart()}
        className="relative cursor-pointer"
      >
        <FaShoppingCart size={20} />
        <div className="absolute -top-3 -right-3 flex items-center justify-center bg-green-500 h-5 w-5 rounded-full  text-white text-sm">
          {useStore.cart.length}
        </div>
      </div>

      {useStore.isOpen && (
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
              {useStore.cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-600 p-5 rounded-lg flex gap-2 items-center"
                >
                  <Image
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-lg "
                  />
                  <div className="flex flex-col">
                    <p>{item.name}</p>
                    <p>{formatPrice(item.price)}</p>
                    <button onClick={(e) => useStore.removeToCart(item.id)}>
                      <IoTrashBin fontSizeAdjust={25} color="red" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
