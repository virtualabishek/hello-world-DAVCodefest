import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';

const MarketplaceSidebar = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7180/community/getproduct?limit=4") // Fetch only 4 items
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.data.products);
                }
            })
            .catch(error => console.error("Error fetching sidebar products:", error));
    }, []);

    return (
        <div className="rounded-xl bg-white p-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <BuildingStorefrontIcon className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-bold text-slate-800">Marketplace Highlights</h3>
            </div>
            <div className="mt-4 space-y-4">
                {products.length > 0 ? products.map(product => (
                    <Link to={`/marketplace/${product._id}`} key={product._id} className="group flex items-center gap-3">
                        <img 
                            src={product.image} 
                            alt={product.productName} 
                            className="h-14 w-14 flex-shrink-0 rounded-lg bg-slate-200 object-cover" 
                        />
                        <div>
                            <p className="text-sm font-semibold text-slate-700 group-hover:text-green-600">{product.productName}</p>
                            <p className="text-sm font-bold text-green-700">NPR {product.price}</p>
                        </div>
                    </Link>
                )) : (
                    <p className="text-sm text-slate-500">No products to show right now.</p>
                )}
            </div>
             <Link to="/marketplace" className="mt-4 block w-full rounded-lg bg-slate-100 py-2 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200">
                View All
            </Link>
        </div>
    );
}

export default MarketplaceSidebar;