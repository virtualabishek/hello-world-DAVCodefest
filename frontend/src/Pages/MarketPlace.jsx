import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import {
  MapPinIcon,
  BuildingStorefrontIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Button from "../components/Button";

export const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("Whole Nepal");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = userAuthStore();

  useEffect(() => {
    axios
      .get("http://localhost:7180/community/getproduct")
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.data.products);
          const uniqueCategories = [
            ...new Set(response.data.data.categories.map((cat) => cat.category)),
          ];
          setCategories(["All", ...uniqueCategories]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (selectedLocation === "Whole Nepal" ||
        product.productLocation === selectedLocation)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative flex h-56 w-full flex-col items-center justify-center bg-[url('/vectorImg/Marketplace.png')] bg-cover bg-center md:h-64">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 rounded-lg bg-white/50 p-4 backdrop-blur-sm">
            <BuildingStorefrontIcon className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-slate-800 md:text-5xl">
              Marketplace
            </h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="-mt-8 relative z-20 flex flex-col gap-6 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-green-600" />
            <select
              className="w-full rounded-lg border-slate-300 py-2 pl-3 pr-10 text-base text-slate-700 focus:border-green-500 focus:outline-none focus:ring-green-500 md:w-auto"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>Whole Nepal</option>
              <option>Kathmandu</option>
              <option>Pokhara</option>
              <option>Janakpur</option>
              <option>Birgunj</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2">
            {categories.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                  selectedCategory === name
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-grow flex-col p-4">
                <div className="flex-grow">
                  <h2 className="text-base font-semibold text-slate-800">
                    {product.productName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {product.productLocation}
                  </p>
                  <p className="mt-2 text-lg font-bold text-green-700">
                    NPR {product.price}
                  </p>
                </div>
                <Link
                  to={`/marketplace/${product._id}`}
                  className="mt-4 block w-full rounded-lg bg-slate-100 py-2 text-center text-sm font-semibold text-slate-700 transition-colors group-hover:bg-amber-400 group-hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {user && (
        <Link
          to={`/addproduct`}
          aria-label="Add new product"
          className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-green-700 md:bottom-8 md:right-8"
        >
          <PlusIcon className="h-7 w-7" />
        </Link>
      )}
    </div>
  );
};

export default Marketplace;