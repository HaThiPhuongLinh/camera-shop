import { formatDateTime } from "../../utils/Format";
import { useState, useRef, useEffect } from "react";
import reviewApi from "../../api/reviewApi";
import FeedbackModal from "./FeedbackModal";

const OrdersModal = ({ orders, onClose, orderData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [reviews, setReviews] = useState({});
  const orderRefs = useRef({});

  // useEffect(() => {
  //   const filteredOrders = orders.filter((order) =>
  //     order.id.includes(searchTerm)
  //   );

  //   if (filteredOrders.length > 0) {
  //     const firstMatchingOrderId = filteredOrders[0].id;
  //     const orderElement = orderRefs.current[firstMatchingOrderId];
  //     if (orderElement) {
  //       orderElement.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }
  //   }
  // }, [searchTerm, orders]);

  useEffect(() => {
    fetchReviewsForAllOrders();
  }, [orders]);

  const fetchReviewsForAllOrders = async () => {
    const reviewsData = {};

    for (const order of orders) {
      const { id } = order;
      try {
        const response = await reviewApi.getReviewByOrderId(id);
        reviewsData[id] = response;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          reviewsData[id] = null;
        } else {
          console.error(`Failed to fetch review for orderId ${id}:`, error);
        }
      }
    }
    setReviews(reviewsData);
  };

  const handleSendFeedback = (orderId, cameraIds) => {
    setFeedbackData({ orderId, cameraIds });
    setFeedbackModalOpen(true);
  };

  const handleSeeFeedback = (orderId) => {
    const review = reviews[orderId];
    setFeedbackData(review);
    setFeedbackModalOpen(true);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative container mx-auto px-4">
        <div className="relative border border-gray-200 bg-white rounded-2xl px-6 md:px-12 py-6 overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search by Order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
            />
          </div>

          {/* Orders List */}
          <div className="overflow-y-auto h-[calc(100vh-200px)]">
            {orders
              .filter((order) => order.id.includes(searchTerm))
              .map((order) => {
                const latestStatus =
                  order.statusData[order.statusData.length - 1].status;

                const cameraIds = order.orderDetails.map(
                  (item) => item.variant.camera.id
                );

                return (
                  <div
                    key={order.id}
                    ref={(el) => (orderRefs.current[order.id] = el)}
                    className="mb-8 border-b pb-6 p-2 rounded-lg bg-gray-200"
                  >
                    <div className="py-6 text-left pl-3 border-b border-gray-300">
                      <div className="flex flex-wrap -m-4">
                        <div className="w-full md:w-1/5 p-4">
                          <p className="text-gray-500 mb-2">Order Date</p>
                          <p className="font-semibold">
                            {formatDateTime(order.createAt)}
                          </p>
                        </div>
                        <div className="w-full md:w-1/5 p-4">
                          <p className="text-gray-500 mb-2">Order Number</p>
                          <p className="font-semibold">{order.id}</p>
                        </div>
                        <div className="w-full md:w-1/5 p-4">
                          <p className="text-gray-500 mb-2">Phone</p>
                          <p className="font-semibold">{order.customerPhone}</p>
                        </div>
                        <div className="w-full md:w-1/5 p-4">
                          <p className="text-gray-500 mb-2">Address</p>
                          <p className="font-semibold">{order.shipAddress}</p>
                        </div>
                        <div className="w-full md:w-1/5 p-4">
                          <p className="text-gray-500 mb-2">Status</p>
                          <p
                            className={`font-semibold w-1/2 p-2 rounded ${
                              latestStatus === "PENDING"
                                ? "bg-yellow-400 text-yellow-900"
                                : latestStatus === "SHIPPING"
                                ? "bg-teal-500 text-teal-900"
                                : latestStatus === "DELIVERED"
                                ? "bg-green-500 text-green-900"
                                : latestStatus === "CANCEL"
                                ? "bg-red-600 text-red-900"
                                : "text-gray-800"
                            }`}
                          >
                            {latestStatus}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="py-4 border-t border-gray-200">
                      <div className="flex flex-wrap -m-4">
                        {order.statusData.map((statusObj, index) => (
                          <div key={index} className="w-full md:w-1/5 p-4 ml-6">
                            <div className="relative">
                              <div className="bg-purple-600 rounded-lg shadow-md p-2">
                                <p className="text-white mb-2">
                                  {statusObj.status}
                                </p>
                                <p className="font-semibold text-white">
                                  {formatDateTime(statusObj.time)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="py-2 border-t border-gray-200">
                      {order.orderDetails.map((item) => (
                        <div
                          key={item.variant.id}
                          className="flex flex-wrap items-center mb-4"
                        >
                          <div className="w-full md:w-1/3 p-4">
                            <div className="flex items-center gap-4">
                              <img
                                className="h-20 rounded-xl"
                                src={item.variant.images[0]}
                                alt={item.variant.camera.name}
                              />
                              <div className="text-left">
                                <p className="font-semibold mb-1">
                                  {item.variant.camera.name}
                                </p>
                                <div className="flex space-x-3 text-gray-400">
                                  {item.variant.color && (
                                    <p className="mb-1.5">
                                      {item.variant.color}
                                    </p>
                                  )}
                                  {item.variant.style && (
                                    <p className="mb-1.5">
                                      {item.variant.style}
                                    </p>
                                  )}
                                  {item.variant.set && (
                                    <p className="mb-1.5">{item.variant.set}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full md:w-1/3 p-4">
                            <div className="flex md:justify-center">
                              <p>
                                <span>Quantity:</span>
                                <span className="font-semibold">
                                  {item.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-full md:w-1/3 p-4">
                            <p className="text-green-900 font-semibold md:text-right">
                              $
                              {(
                                item.price *
                                (1 - item.discount / 100) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="py-2 border-t border-gray-200 p-4">
                      <div className="flex justify-between flex-wrap pb-4">
                        <p className="text-gray-500">Subtotal</p>
                        <p className="font-semibold">${order.total}</p>
                      </div>
                      <div className="flex justify-between flex-wrap pb-4">
                        <p className="text-gray-500">Express Shipping</p>
                        <p className="font-semibold">$30</p>
                      </div>
                      <div className="flex justify-between flex-wrap">
                        <p className="text-gray-500">Total</p>
                        <p className="text-green-900 font-semibold">
                          ${order.total + 30}
                        </p>
                      </div>
                      {latestStatus === "DELIVERED" && (
                        <div className="py-2 flex justify-end">
                          {reviews[order.id] === null ? (
                            <button
                              onClick={() =>
                                handleSendFeedback(order.id, cameraIds)
                              }
                              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                            >
                              Send Feedback
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSeeFeedback(order.id)}
                              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                            >
                              See Review
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {feedbackModalOpen && (
        <FeedbackModal
          onClose={() => setFeedbackModalOpen(false)}
          feedbackData={feedbackData}
          orderData={orderData}
        />
      )}
    </div>
  );
};

export default OrdersModal;
