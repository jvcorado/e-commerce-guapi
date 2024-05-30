import React from "react";
import { useCartStore } from "../store";
import { formatPrice } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();
  const { user } = useUser();
  const cartStore = useCartStore();

  const handleCheckout = async () => {
    if (!user) {
      cartStore.toggleCart();
      router.push(`/sign-in?redirectUrl=`);
      return;
    }
    cartStore.setCheckout("checkout");
  };

  return (
    <div>
      {
        cartStore.cart.length > 0 && (
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl">
              Total:
              {formatPrice(
                cartStore.cart.reduce((acc, item) => {
                  if (item.price == null || item.quantity == null) {
                    return acc; // Ignora itens com valores nulos
                  }
                  return acc + item.price * item.quantity; // Retorna o subtotal atualizado
                }, 0)
              )}
            </h1>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-800 transition duration-300 text-white p-4 rounded-lg w-full"
            >
              FINALIZAR COMPRAR
            </button>
          </div>
        ) /* : (
            <>
              <span className="text-center">Carrinho vazio!</span>
              <Link
                href={"/"}
                className="text-center"
                onClick={() => cartStore.toggleCart()}
              >
                Voltar paara loja
              </Link>
            </>
          ) */
      }
    </div>
  );
}
