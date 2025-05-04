"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image"; 

export default function CartStatus() {
  const { items } = useCart();
  const cartItems = items.length;

  return (
    <div>
      <Link href="/cart">
        <div className="relative cursor-pointer">
          <Image
            src="/cart.svg"
            alt="cart"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full hover:opacity-90 transition-opacity"
          />

          {/* //! Items */}
          <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems}
          </span>
        </div>
      </Link>
    </div>
  );
}

