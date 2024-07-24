import { useState, useEffect, useRef } from "react";
import orderApi from "../../api/orderApi";
import itemStatusApi from "../../api/itemStatusApi";
import { getOrderStatus } from "../../helpers";
import OrderModal from "./Modal/OrderModal";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const orderRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusUpdates, setStatusUpdates] = useState({});
  const [isDetalsModalOpen, setIsDetalsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderApi.getAllOrders();
      const ordersWithStatus = await Promise.all(
        response.map(async (order) => {
          const statusResponse = await itemStatusApi.getStatusByOrderId(
            order.id
          );
          const statusData = statusResponse.state;
          return { ...order, statusData };
        })
      );
      setOrders(ordersWithStatus);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderApi.updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                statusData: [...order.statusData, { status: newStatus }],
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusOptions = (currentStatus) => {
    const statusOptions = {
      PENDING: ["SHIPPING", "CANCEL"],
      SHIPPING: ["DELIVERED"],
      CANCEL: [],
      DELIVERED: [],
    };

    return statusOptions[currentStatus] || [];
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsDetalsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetalsModalOpen(false);
    setSelectedOrderId(null);
    fetchOrders();
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Orders</strong>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
        />
      </div>

      {/* Orders List */}
      <div className="overflow-y-auto h-[calc(100vh-200px)]">
        <table className="w-full text-gray-700 border-collapse text-left">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border-b border-gray-300">ID</th>
              <th className="px-4 py-2 border-b border-gray-300">Total</th>
              <th className="px-4 py-2 border-b border-gray-300">Create At</th>
              <th className="px-4 py-2 border-b border-gray-300">Quantity</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Customer Name
              </th>
              <th className="px-4 py-2 border-b border-gray-300">
                Customer Phone
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Status</th>
              <th className="px-4 py-2 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((order) => {
                const latestStatus =
                  order.statusData[order.statusData.length - 1]?.status ||
                  "Unknown";

                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-100 text-sm"
                    ref={(el) => (orderRefs.current[order.id] = el)}
                  >
                    <td className="px-4 py-3 border-b border-gray-300">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      {new Date(order.createAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      {order.customerPhone}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      {getOrderStatus(latestStatus)}
                      {latestStatus !== "CANCEL" &&
                        latestStatus !== "DELIVERED" && (
                          <select
                            className="ml-1 border border-gray-300 rounded-md px-1 py-1"
                            value={statusUpdates[order.id] || ""}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                          >
                            <option value="">Update</option>
                            {getStatusOptions(latestStatus).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        )}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-300">
                      <button
                        onClick={() => handleOpenModal(order.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <OrderModal
        isOpen={isDetalsModalOpen}
        onRequestClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </div>
  );
}
