"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const ShoppingCart: React.FC = () => {
  const { items, removeItemFromCart, updateItemQuantity, emptyCart, countItems } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();

  // Filter all products in one array
  const uniqueItems = items.reduce((acc, item) => {
    const exists = acc.find((i) => i.id === item.id);
    if (!exists) acc.push(item);
    return acc;
  }, [] as typeof items);

  // SubTotal
  const subtotal = uniqueItems.reduce(
    (total, item) => total + item.price * countItems(item.id),
    0
  );

  // Shipping
  const Shipping = 0;

  // Total
  const total = subtotal + Shipping;

  const CheckoutHandler = async () => {
    if (!user) {
      Swal.fire({
        title: "Access Required",
        text: "You need to log in to proceed with the checkout.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then(() => {
        router.push("/login");
      });
      return;
    }

    const productNames = uniqueItems
      .map((item) => `${item.name} (x${countItems(item.id)})`)
      .join("\n");

    Swal.fire({
      title: "Transaction Details",
      text: `Products:\n${productNames}\n\nTotal: $${total.toFixed(2)}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_APIFETCH}/orders`,
            {
              userId: user.id,
              products: uniqueItems.map((e) => e.id),
            },
            {
              headers: { Authorization: token },
            }
          );

          Swal.fire({
            title: "Order Confirmed!",
            text: "Your purchase has been successful.",
            icon: "success",
          });

          emptyCart();
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong with your order.",
            icon: "error",
          });
        }
      }
    });
  };

  const confirmClearCart = () => {
    const productNames = uniqueItems
      .map((item) => `${item.name} (x${countItems(item.id)})`)
      .join("\n");

    Swal.fire({
      title: "Clear Cart Confirmation",
      text: `You are about to remove all items from your cart:\n${productNames}\n\nAre you sure you want to clear the cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
        Swal.fire({
          title: "Cart Cleared",
          text: "All items have been removed from your cart.",
          icon: "success",
        });
        router.push("/");
      }
    });
  };

  if (uniqueItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty!</h2>
        <p className="text-gray-600 mb-6 text-lg">You have no items in your cart. Start shopping now!</p>
        <Link href="/">
        
          <span className="px-6 py-3 bg-teal-800 text-white rounded-lg shadow-md hover:bg-teal-950 transition duration-300">
            Back to Home
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          {uniqueItems.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-4"
            >
              <div className="flex items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                  width={64}
                  height={64}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600"
                    onClick={() => updateItemQuantity(product.id, countItems(product.id) - 1)}
                  >
                    -
                  </button>
                  <span className="text-lg font-bold text-red-800">
                    {countItems(product.id)}
                  </span>
                  <button
                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600"
                    onClick={() => updateItemQuantity(product.id, countItems(product.id) + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="mt-2 text-red-600 hover:underline"
                  onClick={() => removeItemFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Checkout Information */}
            <div className="mb-6">
              <p className="text-lg font-bold text-gray-800">Checkout Information</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping service:</span>
                  <span>${Shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <button
              className="w-full py-3 bg-red-600 text-white rounded-lg mt-4"
              onClick={confirmClearCart}
            >
              Clear Cart
            </button>
            <button
              className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4"
              onClick={CheckoutHandler}
            >
              Proceed to Checkout
            </button>
            <button className="w-full py-3 bg-teal-800 text-white rounded-lg mt-4">
              <Link href="/" passHref>
                <span className="block text-center w-full h-full">
                  Back to Home
                </span>
              </Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
