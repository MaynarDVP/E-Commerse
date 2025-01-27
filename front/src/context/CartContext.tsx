"use client";

import { IProduct } from "@/Interfaces/IProduct";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  items: IProduct[];
  addItemToCart: (item: IProduct) => void;
  removeItemFromCart: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  emptyCart: () => void;
  countItems: (id: number) => number;
}

const CartContext = createContext<ICartContext>({
  items: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateItemQuantity: () => {},
  emptyCart: () => {},
  countItems: () => 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<IProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedItems = localStorage.getItem("cart");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }else if (!savedItems){
      return ([])
    }
  }, []);

  const updateLocalStorage = (updatedItems: IProduct[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };
  const addItemToCart = (item: IProduct) => {
    const updatedItems = [...items, item];
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const removeItemFromCart = (id: number) => {
    const updatedItems = items.filter((item, index) => {
      return !(item.id === id && index === items.findIndex((i) => i.id === id));
    });
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(id);
      return;
    }

    const updatedItems: IProduct[] = [];
    const existingItems = items.filter((item) => item.id === id);

    if (existingItems.length > 0) {
      // Add the correct quantity
      updatedItems.push(
        ...items.filter((item) => item.id !== id),
        ...new Array(quantity).fill(existingItems[0])
      );
    } else {
      updatedItems.push(...items);
    }

    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const emptyCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
    router.push("/");
  };

  const countItems = (id: number): number => {
    return items.filter((item) => item.id === id).length;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        emptyCart,
        countItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
