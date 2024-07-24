import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";

const NotiSuccess = () => {
  const location = useLocation();
  const order = location.state.order;
  const orderData = location.state.orderData;

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap divide-x divide-gray-200 removed mt-28 mb-10">
        <div className="w-full lg:flex-1 p-8">
          <div className="flex flex-col justify-center px-4 text-center h-full">
            <div className="max-w-xl mx-auto removed">
              <div className="mb-12 text-7xl">🎉</div>
              <span className="mb-5 inline-block text-gray-400">
                You have successfully ordered all items
              </span>
              <h2 className="mb-5 font-heading text-5xl text-">
                Thank you for the order
              </h2>
              <p className="mb-20 text-gray-400">
                Thank you so much for placing your order with us! Your support
                means a lot to us, and we are committed to ensuring you receive
                the best possible experience. Rest assured, we will ship your
                items as quickly as possible, and we are here to assist you
                every step of the way. We look forward to your next visit!
              </p>
              <div className="flex flex-wrap justify-center -m-2.5 mb-4">
                <button
                  onClick={openModal}
                  className="bg-gray-900 rounded-full hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 text-white text-xs font-semibold px-4 h-9 inline-flex items-center transition duration-200"
                >
                  View Your Order
                </button>
              </div>
              <Link to="/camera">
                <div
                  href="#"
                  className="bg-gray-200 rounded-full hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 text-black text-xs font-semibold px-4 h-9 inline-flex items-center transition duration-200"
                >
                  Continue Shopping
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <OrderDetailsModal
          order={order}
          orderData={orderData}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default NotiSuccess;
