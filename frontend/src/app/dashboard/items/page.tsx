"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PackagePlus,
  LucideSquareEqual,
  LucideEdit,
  LucideDelete,
} from "lucide-react";

interface Item {
  _id: string;
  name: string;
  quantity: string;
  description: string;
  category: string;
}

export default function ItemsPage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    fetchItems();
    setDetails();
  }, [currentItem]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/items/getItems`);
      setItems(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const setDetails = () => {
    if (currentItem) {
      setName(currentItem.name);
      setQuantity(currentItem.quantity);
      setDescription(currentItem.description);
      setCategory(currentItem.category);
    }
  };

  const updateItem = async () => {
    if (!currentItem) return;
    try {
      const response = await axios.put(
        `${baseUrl}/items/updateItem/${currentItem._id}`,
        {
          name,
          quantity,
          description,
          category,
        }
      );
      if (response.status === 200) {
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error("Update item failed!", error);
    }
  };

  const deleteItem = async () => {
    if (!currentItem) return;
    try {
      const response = await axios.delete(
        `${baseUrl}/items/deleteItem/${currentItem._id}`
      );
      if (response.status === 200) {
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-950 h-screen p-4">
      <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6 mb-20">
        <h1 className="text-2xl font-bold">Manage Items</h1>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => router.push("/registeritem")}
        >
          <PackagePlus className="w-4 h-4 mr-2" /> Add item
        </button>
      </div>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <table className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="p-2 border-b last:border-none h-16"
                >
                  <td className="p-2 border">{item._id}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">
                    <div className="flex flex-row justify-between">
                      <button
                        onClick={() => {
                          setCurrentItem(item);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        <LucideSquareEqual color="green" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentItem(item);
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        <LucideEdit color="orange" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentItem(item);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <LucideDelete color="red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-2 border text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isDetailsModalOpen && currentItem && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-slate-50 dark:bg-opacity-50 dark:bg-slate-700">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold mb-10">User Details</h2>
            </div>
            <table>
              <tbody>
                <tr className="h-12">
                  <td className="w-28">
                    <p className="font-semibold">ID</p>
                  </td>
                  <td>{currentItem._id}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Name</p>
                  </td>
                  <td>{currentItem.name}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Quantity</p>
                  </td>
                  <td>{currentItem.quantity}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Description</p>
                  </td>
                  <td>{currentItem.description}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Role</p>
                  </td>
                  <td>{currentItem.category}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-10">
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && currentItem && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-slate-50 dark:bg-opacity-50 dark:bg-slate-700">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold mb-4">Update User</h2>
            </div>
            <input
              className="mt-2 mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="number"
              className="mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
            <input
              className="mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              className="mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
            <div className="flex justify-between mt-10 p-4">
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={updateItem}
              >
                Update
              </button>
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && currentItem && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-slate-50 dark:bg-opacity-50 dark:bg-slate-700">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
            </div>
            <div className="w-full">
              <p>Are you sure you want to delete {currentItem.name}?</p>
            </div>
            <div className="flex justify-between mt-10 p-4">
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={deleteItem}
              >
                Delete
              </button>
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
