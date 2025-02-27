"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { UserPlus2, LucideSquareEqual, LucideEdit, LucideDelete } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  telephone: string;
  role: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    fetchUsers();
    setDetails();
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/users/getUsers`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Fetching users failed!", error);
    } finally {
      setLoading(false);
    }
  };

  const setDetails = () => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setTelephone(currentUser.telephone);
      setRole(currentUser.role);
    }
  };

  const updateUser = async () => {
    if (!currentUser) return;
    try {
      const response = await axios.put(
        `${baseUrl}/users/updateUser/${currentUser._id}`,
        {
          name,
          email,
          telephone,
          role,
        }
      );
      if (response.status === 200) {
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error("Update user failed", error);
    }
  };

  const deleteUser = async () => {
    if (!currentUser) return;
    try {
      const response = await axios.delete(
        `${baseUrl}/users/deleteUser/${currentUser._id}`
      );
      if (response.status === 200) {
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Delete user failed", error);
    }
  };

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-950 h-screen p-4">
      <div className="flex flex-row items-center justify-between ml-4 mr-4 mt-6 mb-20">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => router.push("/registeruser")}
        >
          <UserPlus2 className="w-4 h-4 mr-2" /> Add user
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Manage</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="p-2 border-b last:border-none h-16">
                  <td className="p-2 border">{user._id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    <div className="flex flex-row justify-between">
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        <LucideSquareEqual color="green" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        <LucideEdit color="orange" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentUser(user);
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

      {isDetailsModalOpen && currentUser && (
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
                  <td>{currentUser._id}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Name</p>
                  </td>
                  <td>{currentUser.name}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Email</p>
                  </td>
                  <td>{currentUser.email}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Telephone</p>
                  </td>
                  <td>{currentUser.telephone}</td>
                </tr>
                <tr className="h-12">
                  <td>
                    <p className="font-semibold">Role</p>
                  </td>
                  <td>{currentUser.role}</td>
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

      {isUpdateModalOpen && currentUser && (
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
              className="mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Telephone"
            />
            <input
              className="mb-4 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-600"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
            />
            <div className="flex justify-between mt-10 p-4">
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={updateUser}
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

      {isDeleteModalOpen && currentUser && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 bg-slate-50 dark:bg-opacity-50 dark:bg-slate-700">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
            </div>
            <div className="w-full">
              <p>Are you sure you want to delete {currentUser.name}?</p>
            </div>
            <div className="flex justify-between mt-10 p-4">
              <button
                className="bg-blue-700 pl-10 pr-10 pt-2 pb-2 text-white rounded-lg"
                onClick={deleteUser}
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
