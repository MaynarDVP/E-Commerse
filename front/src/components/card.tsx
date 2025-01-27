"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetProducts } from "@/api/DataFetchs"
import { IProduct } from "@/Interfaces/IProduct";



const Cardlist: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await GetProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {error && <p className="text-red-500">{error}</p>} 

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
              {/* Product Image */}
              <div className="relative w-full h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-4">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cardlist;