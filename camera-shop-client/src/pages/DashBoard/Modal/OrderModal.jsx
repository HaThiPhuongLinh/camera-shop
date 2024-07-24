import { formatDateTime } from "../../../utils/Format";
import { useState, useEffect } from "react";
import reviewApi from "../../../api/reviewApi";
import orderApi from "../../../api/orderApi";
import itemStatusApi from "../../../api/itemStatusApi";
import Modal from "react-modal";

Modal.setAppElement("#root");

const OrderModal = ({ isOpen, onRequestClose, orderId }) => {
  const [review, setReview] = useState(null);
  const [order, setOrder] = useState(null);
  const [latestStatus, setLatestStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [orderResponse, statusResponse] = await Promise.all([
          orderApi.getOrderById(orderId),
          itemStatusApi.getStatusByOrderId(orderId),
        ]);

        let reviewResponse = null;
        try {
          reviewResponse = await reviewApi.getReviewByOrderId(orderId);
        } catch (reviewError) {
          if (reviewError.response && reviewError.response.status === 404) {
            reviewResponse = null;
          } else {
            throw reviewError;
          }
        }

        setOrder(orderResponse);
        setReview(reviewResponse);
        const latestStatus =
          statusResponse.state[statusResponse.state.length - 1].status;
        setStatus(statusResponse.state);
        setLatestStatus(latestStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchData();
    }
  }, [orderId]);

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        &#9733;
      </span>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (!order || !status) return <div>Loading...</div>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Order Details"
      className="w-11/12 max-w-6xl p-4 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="overflow-y-auto h-[calc(110vh-200px)]">
        <div key={order.id}>
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
          <div className="py-4 border-t border-gray-200">
            <div className="flex flex-wrap -m-4">
              {status.map((statusObj, index) => (
                <div key={index} className="w-full md:w-1/5 p-4 ml-6">
                  <div className="relative">
                    <div className="bg-purple-600 rounded-lg shadow-md p-2">
                      <p className="text-white mb-2">{statusObj.status}</p>
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
                          <p className="mb-1.5">{item.variant.color}</p>
                        )}
                        {item.variant.style && (
                          <p className="mb-1.5">{item.variant.style}</p>
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
                      <span className="font-semibold">{item.quantity}</span>
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
            <div className="py-2 border-t border-gray-200">
              {review ? (
                <div>
                  <div className="review-item pb-2 border-b border-gray-200">
                    <div className="flex items-center mb-2">
                      <div className="text-lg font-semibold">
                        {review.user.fullName}
                      </div>
                      <div className="ml-2">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-600 mb-2">
                      &quot;{review.content}&quot;
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(review.createAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
