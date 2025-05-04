"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { IProduct } from "@/Interfaces/IProduct";
// import { ICategories } from "@/Interfaces/ICategories";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const Cardlist: React.FC = () => {
  const { GetProducts } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  //! Category
  const categoryNames: Record<number, string> = {
    1: "Phones",
    2: "Computers",
    3: "Watches",
    4: "Tablets",
    5: "Air-Pods",
    6: "Home-Pods",
  };

  //! Fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await GetProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      }
    };
    fetchProducts();
  }, [GetProducts]);

  //! Memo to save Categories
  const categories = useMemo(() => {
    const setIds = new Set<number>();
    products.forEach(product => setIds.add(product.categoryId));
    return Array.from(setIds); 
  }, [products]);

  //! Filter to render
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (p) => p.categoryId.toString() === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {error && <p className="text-red-500">{error}</p>}

      {/* //? Buttons Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          className={`px-2 py-2 rounded ${
            selectedCategory === "all" ? "bg-blue-900 text-white font-semibold" : "bg-white text-gray-800 font-semibold"
          } border`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        {categories.map((CategotyID) => (
          <button
            key={CategotyID}
            className={`px-2 py-2 rounded ${
              selectedCategory === CategotyID.toString()
                ? " Button-Category-Selected"
                : "Button-Category-NOSelected"
            } border`}
            onClick={() => setSelectedCategory(CategotyID.toString())}
          >
            {categoryNames[CategotyID]}
          </button>

          
        ))}
      </div>

      {/* //? Product Image */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
              {/* Product Image */}
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* //? Product Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-4">
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cardlist;


