"use client";

import { useCart } from "@/context/CartContext";
import { IProduct } from "@/Interfaces/IProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddProduct({ product }: { product: IProduct }) {
  const { addItemToCart, countItems } = useCart();
  const [disabled, setDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setDisabled(countItems(product.id) >= product.stock);
  }, [product.id, product.stock, countItems]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItemToCart(product);
      console.log(product);
      
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="mt-8">
      <div className="mt-6 flex items-center space-x-4">
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-lg text-gray-800 hover:bg-gray-100"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <p className="text-xl font-medium text-black">{quantity}</p>
        <button
          className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-lg text-gray-800 hover:bg-gray-100"
          onClick={() =>
            setQuantity(Math.min(product.stock - countItems(product.id), quantity + 1))
          }
          disabled={quantity + countItems(product.id) >= product.stock}
        >
          +
        </button>
      </div>
      <div className="mt-4 flex space-x-4 font">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleAddToCart}
          disabled={disabled}
        >
          Add to Cart
        </button>
        <button
          className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-900"
          onClick={handleBuyNow}
          disabled={disabled}
        >
          Buy Now
        </button>

        <Link href="/"
         className="px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-950 text-center"
         >
            <span>
              Go back to Home
            </span>
        </Link>
      </div>
    </div>
  );
}

