"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleNavigation = () => {
    router.back();
  };

  const handleRegisterUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if (!name || !quantity || !description|| !category) {
        window.alert("Please fill all the fields before register a new user!");
      }
      else {
        const response = await axios.post(`${baseUrl}/items/registeritem`,{
          name,
          quantity,
          description,
          category
        });

        if (response.status === 200) {
          router.push("/dashboard");
        }
        else {
          window.alert("Error occured!");
        }
      }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side (Form Section) */}
      <div className="w-1/2 text-white flex flex-col justify-center items-center p-10">
        {/* Back Button & Header */}
        <div className="w-full flex items-start mb-6">
          <button
            onClick={handleNavigation}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-black dark:text-white text-2xl font-semibold ml-4">Register an item</h1>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <form onSubmit={handleRegisterUsers} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-3 border rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter item name"
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label
                htmlFor="quantity"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 p-3 border rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter item quantity"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-3 border rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter the item description"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Category
              </label>
              <select
                id="role"
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-3 border rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="mobil phones">Mobile Phones</option>
                <option value="laptops">Laptops</option>
                <option value="audio">Audio</option>
                <option value="wearables">Wearables</option>
                <option value="tablets">Tablets</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Right Side (Image Section) */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url(/employee_register.jpg)",
        }}
      />
    </div>
  );
}
