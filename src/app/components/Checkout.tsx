"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../store";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const cartStore = useCartStore();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Use .text() to handle potential empty response
      })
      .then((text) => {
        if (!text) {
          throw new Error("Empty response");
        }
        return JSON.parse(text); // Parse the JSON manually
      })
      .then((data) => {
        cartStore.setPaymentIntent(data.paymentIntent.id);
        setClientSecret(data.paymentIntent?.client_secret);
        setLoading(false); // Set loading to false after data is set
      })
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
        setError("Failed to load payment details. Please try again."); // Set error message
        setLoading(false); // Set loading to false in case of error
      });
  }, [cartStore, cartStore.cart, cartStore.paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
      labels: "floating",
    },
  };

  return (
    <div>
      {loading ? (
        <div>
          <h1>Carregando...</h1>
        </div>
      ) : error ? (
        <div>
          <h1>{error}</h1>
        </div>
      ) : (
        clientSecret && (
          <div></div>
          /*    <Elements stripe={stripePromise} options={options}>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
          </Elements> */
        )
      )}
    </div>
  );
}
