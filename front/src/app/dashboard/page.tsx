"use client";

import { Toast } from "@/component/Toast";
import { useAuth } from "@/context/AuthContext";
import { IOrders } from "@/Interfaces/IOrders";
import { IProduct } from "@/Interfaces/IProduct";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [userOrders, setUserOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_APIFETCH}/users/orders`, {
          headers: { authorization: token },
        })
        .then((res) => {
          setUserOrders(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          Toast.fire({
            title: "Unable to find Orders",
            icon: "error",
          });
          console.error(err);
        });
    }
  }, [token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-teal-800 text-white font-semibold min-h-screen p-6">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="#profile" className="block hover:underline">
                  Profile
                </a>
              </li>
              <li>
                <a href="#orders" className="block hover:underline">
                  Orders
                </a>
              </li>
              <li>
                <a href="#settings" className="block hover:underline">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Welcome, {user.name}</h2>
          {/* Go Home*/}
          <Link href="/">
            <span className="text-white bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-lg transition duration-300 mb-4">
              Go back to Home
            </span>
        </Link>


          <section id="orders" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Orders</h3>
            {userOrders?.length > 0 ? (
              <ul className="space-y-4">
                {userOrders.map((order: IOrders) => (
                  <li className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-black" key={order.id}>
                    <p>
                      <span className="font-bold">Order ID:</span> {order.id}
                    </p>
                    <p>
                      <span className="font-bold">Date:</span> {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-bold">Products:</span>
                    </p>
                    <ul className="pl-6 space-y-2">
                      {order.products.map((product: IProduct) => (
                        <li key={product.id} className="flex items-center space-x-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            layout="fill"
                            objectFit="contain"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{product.name}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have no orders yet.</p>
            )}
          </section>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
