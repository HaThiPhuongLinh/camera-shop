import { formatDateTime } from "../../utils/Format";

const OrderDetailsModal = ({ order, orderData, closeModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="container mx-auto px-4 ">
        <div className="border border-gray-200 bg-white rounded-2xl px-6 md:px-12 py-6 "> 
          <div className="max-h-[calc(110vh-200px)] overflow-y-auto p-2">
          <div className="py-6 border-b border-gray-200 ">
            <div className="flex flex-wrap -m-4">
              <div className="w-full md:w-1/4 p-4">
                <p className="text-gray-500 mb-2">Order Date</p>
                <p className="font-semibold">
                  {formatDateTime(order.createAt)}
                </p>
              </div>
              <div className="w-full md:w-1/4 p-4">
                <p className="text-gray-500 mb-2">Order Number</p>
                <p className="font-semibold">{order.id}</p>{" "}
              </div>
              <div className="w-full md:w-1/4 p-4">
                <p className="text-gray-500 mb-2">Phone</p>
                <p className="font-semibold">{order.customerPhone}</p>
              </div>
              <div className="w-full md:w-1/4 p-4">
                <p className="text-gray-500 mb-2">Address</p>
                <p className="font-semibold">{order.shipAddress}</p>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-gray-200">
            {orderData.variantData.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-wrap items-center -m-4"
              >
                <div className="w-full md:w-1/3 p-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <img
                      className="h-20 rounded-xl"
                      src={item.images}
                      alt={item.cameraName}
                    />
                    <div className="text-left">
                      <p className="font-semibold mb-1">{item.cameraName}</p>
                      <div className="flex space-x-3 text-gray-400">
                        {item.color && <p className="mb-1.5">{item.color}</p>}
                        {item.style && <p className="mb-1.5">{item.style}</p>}
                        {item.set && <p className="mb-1.5">{item.set}</p>}
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
          <div className="py-6 border-b border-gray-200">
            <div className="flex justify-between flex-wrap pb-4">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-semibold">${orderData.total}</p>
            </div>
            <div className="flex justify-between flex-wrap pb-4">
              <p className="text-gray-500">Express Shipping</p>
              <p className="font-semibold">$30</p>
            </div>
          </div>
          <div className="py-6 border-b border-gray-50">
            <div className="flex justify-between flex-wrap">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-xl font-semibold">${orderData.total + 30}</p>
            </div>
          </div>
          </div>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;