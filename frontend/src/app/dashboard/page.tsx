"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  role: string;
}

interface Item {
  _id: string;
  name: string;
  quantity: string;
  description: string;
  category: string;
}

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [userCount, setUserCount] = useState<number>();
  const [itemCount, setItemCount] = useState<number>();
  const [lowStockItems, setLowStockItems] = useState<Item[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<Item[]>([]);

  useEffect(() => {
    getItemCount();
    getUserCount();
  }, []);

  const getUserCount = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/getUsers`);
      const userData = response.data.users;
      setUsers(userData);
      setUserCount(userData.length);
    } catch (error) {
      console.error("Failed to retrieve users count! Error: ", error);
    }
  };

  const getItemCount = async () => {
    try {
      const response = await axios.get(`${baseUrl}/items/getItems`);
      const itemData = response.data.items;
      setItems(itemData);
      setItemCount(itemData.length);

      setLowStockItems(
        itemData.filter(
          (item: Item) =>
            parseInt(item.quantity) > 0 && parseInt(item.quantity) < 5
        )
      );
      setOutOfStockItems(
        itemData.filter((item: Item) => parseInt(item.quantity) === 0)
      );
    } catch (error) {
      console.error("Failed to retrieve items count! Error: ", error);
    }
  };

  const categoryData = items.reduce(
    (acc: { name: string; count: number }[], item) => {
      const existingCategory = acc.find((c) => c.name === item.category);
      if (existingCategory) {
        existingCategory.count += 1;
      } else {
        acc.push({ name: item.category, count: 1 });
      }
      return acc;
    },
    []
  );

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-950 h-screen p-4">
      <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6 mb-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-4 m-auto gap-10">
        <div className="w-72">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Total Items
            </h2>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {itemCount}
            </p>
          </div>
        </div>
        <div className="w-72">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
              {userCount}
            </p>
          </div>
        </div>
        <div className="w-72">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Low Stock
            </h2>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {lowStockItems.length}
            </p>
          </div>
        </div>
        <div className="w-72">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Out-of-Stock
            </h2>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {outOfStockItems.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <div className="mt-10 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Low Stock Items
              </h2>
              <ul className="mt-2 text-gray-600 dark:text-gray-400">
                {lowStockItems.map((item) => (
                  <li key={item._id}>
                    {item.name} - {item.quantity} left
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Out of Stock Items
              </h2>
              <ul className="mt-2 text-gray-600 dark:text-gray-400">
                {outOfStockItems.map((item) => (
                  <li key={item._id}>
                    {item.name} - {item.quantity} left
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-blue-700 font-bold text-xl">Inventory</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" stroke="#4A5568" />
              <YAxis allowDecimals={false} stroke="#4A5568" />
              <Tooltip />
              <Bar dataKey="count" fill="#3182CE" barSize={40} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              InveTrack helps you efficiently manage stock levels, track items,
              and stay informed about low or out-of-stock products. Gain
              valuable insights into your inventory with real-time analytics and
              a seamless user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
