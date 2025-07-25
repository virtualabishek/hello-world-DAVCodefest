import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import { v4 as uuidv4 } from 'uuid';

 function generateUniqueId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setamount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("eSewa");
 const handlePaymentesewa = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7180/esewa/initiate-payment", //server payment route
        {
          amount: amount,
          productId: id,
          transactionId: uuidv4() , //  ID for the product
          
        }
      );
      console.log("amount", amount)
      console.log("productId",id)
      console.log(response.data)
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };
  const { khaltiSend } = userAuthStore()

  const handlePaymentKhalti = async () => {
    
    console.log('khalti working');
    // const itemId = uuidv4();
    const itemId = id
    const totalPrice = amount;

    await khaltiSend(itemId, totalPrice)
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7180/community/getsingle-Product/${id}`
        );
        setProduct(response.data.data);
        console.log("product response", response.data.data);
        setamount(response.data.data.price);
      } catch (error) { 
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  // Update total price when product or quantity changes
  useEffect(() => {
    if (product) {
      setamount(product.price * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  if (loading) return <p className="text-center text-gray-600">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{product.productName}</h2>
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold">{product.productName}</h3>
        <span className="text-lg font-bold">NPR {product.price} /{ product.unit}</span>
      </div>
      {/* <p className="text-sm text-gray-600">Category: {product.category}</p> */}
      <p className="text-sm text-gray-600 text-xl">Location: {product.productLocation}</p>
      <p className="text-sm text-gray-600 text-xl">Stock: {product.quantity}</p>


      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button onClick={() => handleQuantityChange("decrease")} className="px-3 py-1 bg-green-500 text-white rounded">-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange("increase")} className="px-3 py-1 bg-green-500 text-white rounded">+</button>
        </div>
        <span className="text-lg font-bold">Total: NPR {amount}</span>
      </div>

      <div className="flex gap-2 mt-4">
        <img 
          src="/images/esewa.png" 
          alt="eSewa" 
          className={`w-10 h-10 p-1 border ${selectedPayment === "eSewa" ? "border-green-500" : "border-gray-300"} rounded-lg cursor-pointer`} 
          onClick={(e) => {
    e.preventDefault(); // Prevent page refresh
    handlePaymentesewa(e);
  }} 
        />
        <img 
          src="/images/Khalti.png" 
          alt="Khalti" 
          className={`w-10 h-10 p-1 border ${selectedPayment === "Khalti" ? "border-green-500" : "border-gray-300"} rounded-lg cursor-pointer`} 
          onClick={(e) => {
            e.preventDefault()
            handlePaymentKhalti(e)
          }} 
        />
      </div>
    </div>
  );
};

export default ProductDetail;


