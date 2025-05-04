"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartStatus from "@/component/CartStatus";

const Navbar = () => {
  const { isAuth, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-teal-700 px-4 py-2 flex justify-between items-center shadow-md flex-wrap">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center space-x-2">
          <div className="rounded-full flex items-center justify-center">
            <Image
              src="/tech.svg"
              alt="DevShop"
              className="object-cover rounded-md"
              width={48} 
              height={48} 
            />
          </div>
          <h1 className="text-2xl font-semibold text-white">DevShop</h1>
        </div>
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
         className="hidden md:flex items-center flex-1 mx-4 max-w-2xl w-auto"
      >
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {isAuth ? (
          <div className="flex items-center space-x-2">
            {/* User Profile with Dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <Image
                  src="/profile.svg"
                  alt="profile"
                  className="rounded-full hover:opacity-80 transition-opacity"
                  width={48} 
                  height={48}
                />
                <span className="ml-2 text-white font-semibold hidden sm:block">
                  Hi, {user?.name}
                </span>
              </button>

              {isDropdownOpen && (
                <ul
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
                  onMouseLeave={closeDropdown}
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-200 text-black font-semibold"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 text-red-950 font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700">
              Login
            </button>
          </Link>
        )}

        <CartStatus />
      </div>
    </nav>
  );
};

export default Navbar;