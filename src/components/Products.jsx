import { useState, useEffect } from "react";
import { productList } from "../utills/contest";
import Shimmer from "./Shimmer";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    const filteredProducts = productList.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 w-full mb-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {loading ? (
                <Shimmer />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                                >
                                    <img
                                        src={product.mainImage}
                                        alt={product.title}
                                        className="w-full h-48 object-cover mb-4 rounded-md"
                                    />
                                    <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <p className="text-lg font-bold text-gray-800 mb-2">${product.price}</p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Manufacturer: {product.manufacturer}
                                    </p>
                                    <p
                                        className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Category: {product.category.name}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">
                                No products found matching your search.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
