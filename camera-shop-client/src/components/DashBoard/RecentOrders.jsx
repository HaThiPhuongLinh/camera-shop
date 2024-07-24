import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../helpers";
import orderApi from './../../api/orderApi';
import { useState, useEffect } from 'react';

export default function RecentOrders() {
  const [recentOrderData, setRecentOrderData] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await orderApi.getRecentOrders();
        setRecentOrderData(response);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 text-left">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border-b border-gray-300">ID</th>
              <th className="px-4 py-2 border-b border-gray-300">Order Date</th>
              <th className="px-4 py-2 border-b border-gray-300">Total</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Shipping Address
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-100 text-sm">
                <td className="px-4 py-3 border-b border-gray-300">
                  <Link to={`/order/${order.orderId}`}>#{order.orderId}</Link>
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {format(new Date(order.orderDate), "dd MMM yyyy HH:mm")}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  ${order.total}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {order.shippingAddress}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {getOrderStatus(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}