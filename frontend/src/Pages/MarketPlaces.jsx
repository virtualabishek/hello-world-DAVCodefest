  import React, { useState, useEffect } from "react";
  import { FaMapMarkerAlt } from "react-icons/fa";
  import Button from "../components/Button";
  import axios from "axios";
import { Link } from "react-router-dom";
  import { userAuthStore } from "../store/authStore";


  export const Marketplace = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("Whole Nepal");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user } = userAuthStore();

    useEffect(() => {
      axios.get("http://localhost:7180/community/getproduct")
        .then(response => {
          if (response.data.success) {
            setProducts(response.data.data.products);
            setCategories(["All", ...response.data.data.categories.map(cat => cat.category)]);
          }
        })
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    const filteredProducts = products.filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (selectedLocation === "Whole Nepal" || product.productLocation === selectedLocation)
    );

    return (
      <div className="p-1/2 bg-gray-100 min-h-screen flex flex-col items-center w-full max-w-5xl mx-auto">

        <div className="font-bold text-xl flex   flex-col  justify-center  items-center h-70 w-full bg-[url('/vectorImg/Marketplace.png')] bg-cover bg-center">
          <h1 className="text-2xl font-bold  text-black font-serif text-5xl flex gap-3 justify-center bg-gray-200 items-center   mb-4 p-2 rounded">
            
            <img
              className="h-8 w-10"
              // className="w-10 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"

              src="https://img.icons8.com/?size=100&id=77118&format=png&color=000000" />
            
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-serif">
              Marketplace
            </span>

            </h1>
          
          
          </div>
      
        <div className="flex items-center space-x-2 mb-6 w-full justify-start">
          <FaMapMarkerAlt className="text-red-500" />
          <select
            className="p-2 border rounded-md"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="Whole Nepal">Whole Nepal</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Pokhara">Pokhara</option>
            <option value="janakpur">Janakpur</option>
            <option value="birgunj">Birgunj</option>
          </select>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2 mb-4 w-full justify-start md:justify-center">
          {categories.map((name) => (
            <div key={name} className="flex flex-col items-center cursor-pointer flex-shrink-0" onClick={() => setSelectedCategory(name)}>
              <span className={`text-md mt-1 ${selectedCategory === name ? "font-bold" : ""}`}>{name}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {filteredProducts.map((product) => (
              
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col justify-between h-64">
              <img src={product.image} alt={product.productName} className="w-full h-32 object-cover rounded-md" />
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-lg font-semibold mt-2">{product.productName}</h2>
                  <p className="text-sm text-gray-500">{product.category} - {product.productLocation}</p>
                  <p className="text-lg font-bold text-green-600">NPR {product.price}</p>
                            </div>
                            <Button className="mt-2 bg-red-500 text-white w-full">   <Link to={`/marketplace/${product._id}`}>   Buy Now </Link></Button>
    
              </div>
            </div>
          ))}
        </div>


                   {/* Create Post Button */}
                        {user && (
                            <button className="fixed bottom-17 right-5 flex items-center   bg-green-700 text-white w-12 h-12 rounded-full text-2xl transition-transform transform md:bottom-5">
            <Link to={`/addproduct`}>    <div><img className="h-10 w-10" src="https://img.icons8.com/?size=100&id=4TJ2TiJ3AGQy&format=png&color=000000" /> </div>
              </Link>
                            </button>
                        )}
      </div>
    );
  };

  export default Marketplace;