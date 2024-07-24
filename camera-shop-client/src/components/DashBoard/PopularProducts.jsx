import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import variantApi from '../../api/variantApi'; 

function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await variantApi.getTopSellingVariants();
        setPopularProducts(response);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200 text-left">
      <strong className="text-gray-700 font-medium">Popular Products</strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProducts.map((product) => (
          <Link
            key={product.variantId} 
            to={`/product/${product.variantId}`} 
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.imgURL} 
                alt={product.cameraName} 
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.cameraName}</p>
              {/* Replace with actual stock data if available */}
              <span
                className={classNames(
                  product.quantitySold === 0
                    ? 'text-red-500'
                    : product.quantitySold > 50
                    ? 'text-green-500'
                    : 'text-orange-500',
                  'text-xs font-medium'
                )}
              >
                {product.quantitySold + ' sold'}
              </span>
            </div>
            <div className="text-sm text-gray-400 pl-1.5">${product.price}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts