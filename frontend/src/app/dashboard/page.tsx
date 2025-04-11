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

import {
  ArchiveBoxIcon,
  UserIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between dark:bg-gray-800">
          <div>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Total Items
            </p>
            <h2 className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {itemCount}
            </h2>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <ArchiveBoxIcon className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between dark:bg-gray-800">
          <div>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Total Users
            </p>
            <h2 className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {userCount}
            </h2>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <UserIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between dark:bg-gray-800">
          <div>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Low Stock
            </p>
            <h2 className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {lowStockItems.length}
            </h2>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between dark:bg-gray-800">
          <div>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Out of Stock
            </p>
            <h2 className="mt-5 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {outOfStockItems.length}
            </h2>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-300" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 max-h-fit gap-6 pt-10">
        <div className="flex h-full flex-col justify-between gap-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Low Stock Items
            </h2>
            <table className="mt-2 text-gray-600 dark:text-gray-400 w-full">
              <thead>
                <tr>
                  <th className="text-left">Item Name</th>
                  <th className="text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity} left</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Out of Stock Items
            </h2>
            <table className="mt-2 text-gray-600 dark:text-gray-400 w-full">
              <thead>
                <tr>
                  <th className="text-left">Item Name</th>
                  <th className="text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {outOfStockItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity} left</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 rounded-2xl shadow h-[360px] flex flex-col justify-between dark:bg-gray-800">
            <h2 className="text-gray-700 font-bold text-xl dark:text-gray-300">
              Inventory
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" stroke="#4A5568" />
                <YAxis allowDecimals={false} stroke="#4A5568" />
                <Tooltip />
                <Bar dataKey="count" fill="#3182CE" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow h-[36px] flex flex-row items-center justify-center dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300">InvenTrack Soft.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
