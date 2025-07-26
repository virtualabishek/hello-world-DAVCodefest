import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { userAuthStore } from "../store/authStore";
import { v4 as uuidv4 } from 'uuid';
import { 
    ArrowLeftIcon, 
    MapPinIcon, 
    ArchiveBoxIcon, 
    CalendarDaysIcon, 
    PlusIcon, 
    MinusIcon, 
    CheckCircleIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/solid";

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto max-w-5xl animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
            <div className="aspect-square w-full rounded-xl bg-slate-200"></div>
            <div className="space-y-6">
                <div className="h-6 w-1/4 rounded-md bg-slate-200"></div>
                <div className="h-10 w-3/4 rounded-md bg-slate-200"></div>
                <div className="h-8 w-1/3 rounded-md bg-slate-200"></div>
                <div className="h-24 w-full rounded-md bg-slate-200"></div>
                <div className="h-12 w-full rounded-md bg-slate-200"></div>
                <div className="h-12 w-full rounded-md bg-slate-200"></div>
            </div>
        </div>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">An Error Occurred</h2>
            <p className="mt-2 text-slate-500">{message}</p>
        </div>
    </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("eSewa");
  const { khaltiSend } = userAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:7180/community/getsingle-Product/${id}`);
        setProduct(response.data.data);
      } catch (err) { 
        setError("Failed to load product data. It may no longer be available.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const totalAmount = product ? product.price * quantity : 0;

  const handlePayment = () => {
    if (selectedPayment === 'eSewa') {
        handlePaymentEsewa();
    } else if (selectedPayment === 'Khalti') {
        handlePaymentKhalti();
    }
  };

  const handlePaymentEsewa = async () => {
    try {
      const response = await axios.post("http://localhost:7180/esewa/initiate-payment", {
          amount: totalAmount,
          productId: id,
          transactionId: uuidv4(),
        });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating eSewa payment:", error);
    }
  };

  const handlePaymentKhalti = async () => {
    await khaltiSend(id, totalAmount);
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} />;
  if (!product) return <ErrorDisplay message="Product not found." />;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto max-w-5xl px-4">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition-colors hover:text-green-800 mb-6">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Marketplace</span>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-xl bg-white p-4 shadow-lg">
                    <img src={product.image} alt={product.productName} className="aspect-square w-full object-cover rounded-lg" />
                </div>

                <div className="space-y-6">
                    <div>
                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 capitalize">{product.category}</span>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">{product.productName}</h1>
                        <p className="mt-4 text-3xl font-bold text-green-600">NPR {product.price} <span className="text-base font-medium text-slate-500">/ {product.unit}</span></p>
                    </div>

                    <div className="space-y-3 border-t border-slate-200 pt-6">
                         <div className="flex items-center gap-2 text-slate-600"><MapPinIcon className="h-5 w-5 text-slate-400"/><p>{product.productLocation}</p></div>
                         <div className="flex items-center gap-2 text-slate-600"><ArchiveBoxIcon className="h-5 w-5 text-slate-400"/><p>{product.quantity} in stock</p></div>
                         <div className="flex items-center gap-2 text-slate-600"><CalendarDaysIcon className="h-5 w-5 text-slate-400"/><p>Listed on {new Date(product.createdAt).toLocaleDateString()}</p></div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"><MinusIcon className="h-5 w-5"/></button>
                            <span className="w-12 text-center text-lg font-semibold text-slate-800">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"><PlusIcon className="h-5 w-5"/></button>
                        </div>
                        <p className="text-xl font-bold text-slate-800">Total: <span className="text-green-700">NPR {totalAmount.toFixed(2)}</span></p>
                    </div>

                    <div className="space-y-3 border-t border-slate-200 pt-6">
  <h3 className="text-sm font-semibold text-slate-600">Select Payment Method</h3>
  <div className="grid grid-cols-2 gap-4">
    {/* eSewa */}
    <button
      onClick={() => setSelectedPayment('eSewa')}
      className={`flex items-center justify-between w-full rounded-lg border-2 p-3 transition ${
        selectedPayment === 'eSewa' ? 'border-green-500 bg-green-50' : 'border-slate-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <img src="/images/esewa.png" alt="eSewa" className="h-8" />
        <span className="text-sm font-medium text-slate-700">eSewa</span>
      </div>
      {selectedPayment === 'eSewa' && (
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
      )}
    </button>

    {/* Khalti */}
    <button
      onClick={() => setSelectedPayment('Khalti')}
      className={`flex items-center justify-between w-full rounded-lg border-2 p-3 transition ${
        selectedPayment === 'Khalti' ? 'border-green-500 bg-green-50' : 'border-slate-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <img src="/images/Khalti.png" alt="Khalti" className="h-8" />
        <span className="text-sm font-medium text-slate-700">Khalti</span>
      </div>
      {selectedPayment === 'Khalti' && (
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
      )}
    </button>
  </div>
</div>

                    <button onClick={handlePayment} className="w-full rounded-lg bg-green-600 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700">
                        Proceed to Pay with {selectedPayment}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetail;