"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store";
import CartDrawer from "./CartDrawer";

export default function Cart() {
  const useStore = useCartStore();

  return (
    <>
      <div
        onClick={() => {
          /*if (!useStore.isOpen) return; */

          useStore.toggleCart();
        }}
        className=" flex items-center relative cursor-pointer"
      >
        <FaShoppingCart size={20} />
        <div className="absolute -top-3 -right-3 flex items-center justify-center bg-green-600 h-5 w-5 rounded-full  text-white text-sm">
          {useStore.cart.length}
        </div>
      </div>

      {!useStore.isOpen && <CartDrawer />}
    </>
  );
}
