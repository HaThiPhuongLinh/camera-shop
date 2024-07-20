import { useLocation } from "react-router-dom";
import { useState } from "react";
import orderApi from "../../api/orderApi";
import useAuthStore from "../../hooks/authStore";
import cartApi from "../../api/cartApi";

const CheckoutPage = () => {
  const location = useLocation();
  const checkoutData = location.state.checkedCartItems;
  const { userId } = useAuthStore();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const itemTotals = checkoutData.map((item) => ({
    ...item,
    totalPrice: (
      item.price *
      (1 - item.discount / 100) *
      item.quantity
    ).toFixed(2),
  }));

  const grandTotal = itemTotals.reduce(
    (sum, item) => parseFloat(sum) + parseFloat(item.totalPrice),
    0
  );

  const totalWithShipping = grandTotal + 30;

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        userId,
        total: totalWithShipping,
        quantity: checkoutData.reduce(
          (totalQuantity, item) => totalQuantity + item.quantity,
          0
        ),
        orderDetails: itemTotals.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
          discount: item.discount,
          price: item.price,
        })),
        shipAddress: formData.address,
        customerName: formData.full_name,
        customerPhone: formData.phone_number,
      };

      const response = await orderApi.createOrder(orderData);
      console.log("Order created successfully!", response);

      const cartResponse = await cartApi.getCartByUserId(userId);
      const totalItems = cartResponse.totalItems;
      const totalPrice = cartResponse.totalPrice;

      useAuthStore.getState().updateTotalItems(totalItems);
      useAuthStore.getState().updateTotalPrice(totalPrice);
    } catch (error) {
      setOrderError(error.response.data);
      setShowErrorAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowErrorAlert(false);
  };

  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-[#2E2F31] rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="pt-9 pb-16">
              <div className="container mx-auto px-4">
                <h1 className="mb-8 text-4xl font-semibold text-center">
                  Checkout
                </h1>
                <form onSubmit={handleOrder}>
                  <div className="flex flex-wrap -m-8 xl:-m-16 text-left">
                    <div className="w-full md:w-6/12 p-8 xl:p-16">
                      <h6 className="mb-8 text-lg font-semibold">
                        Shipping address
                      </h6>
                      <div className="flex flex-wrap -m-4 mb-2">
                        <div className="w-full p-4">
                          <div className="mb-6">
                            <label
                              htmlFor="input-full-name"
                              className="mb-1.5 inline-block text-sm font-semibold"
                            >
                              Full name
                            </label>
                            <input
                              id="input-full-name"
                              name="full_name"
                              type="text"
                              className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                              placeholder="Enter your full name"
                              value={formData.full_name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="mb-6">
                            <div>
                              <label
                                htmlFor="input-phone-number"
                                className="mb-1.5 inline-block text-sm font-semibold"
                              >
                                Phone number
                              </label>
                              <input
                                id="input-phone-number"
                                name="phone_number"
                                type="text"
                                className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                                placeholder="Enter your phone number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="input-address"
                              className="mb-1.5 inline-block text-sm font-semibold"
                            >
                              Address
                            </label>
                            <input
                              id="input-address"
                              name="address"
                              type="text"
                              className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                              placeholder="Enter your address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <h6 className="mb-4 text-lg font-semibold">
                        Shipping method
                      </h6>
                      <div className="flex justify-between -m-4 mb-2">
                        <div className="w-7/12 p-4">
                          <label className="relative flex items-center gap-4">
                            <input
                              id="default-radio-1"
                              type="radio"
                              name="default-radio"
                              className="w-4 h-4 bg-gray-100 border-gray-300"
                              defaultChecked
                            />
                            <span>
                              <span
                                className="mb-1 font-semibold block"
                                htmlFor="default-radio-1"
                              >
                                Free shipping
                              </span>
                              <span className="text-sm text-gray-500 block">
                                8-30 business days
                              </span>
                            </span>
                          </label>
                        </div>
                        <div className="w-1/12 p-4">
                          <span className="font-semibold">$30</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-6/12 p-8 xl:p-16">
                      <h6 className="mb-4 text-lg font-semibold">
                        Billing Address
                      </h6>
                      <div className="pb-6 border-b border-dashed border-gray-300">
                        {itemTotals.map((item) => (
                          <div
                            key={item.variantId}
                            className="flex flex-wrap -m-2 mb-2"
                          >
                            <div className="w-full md:w-3/4 p-2">
                              <div className="flex flex-wrap -m-2">
                                <div className="w-auto p-2">
                                  <img
                                    className="w-24 h-24 object-cover rounded-lg"
                                    src={item.images}
                                    alt={item.cameraName}
                                  />
                                </div>
                                <div className="flex-1 p-2">
                                  <p className="mb-1.5">{item.cameraName}</p>
                                  <div className="flex space-x-3 text-gray-400">
                                    {item.color && (
                                      <p className="mb-1.5">{item.color}</p>
                                    )}
                                    {item.style && (
                                      <>
                                        <p className="mb-1.5">{item.style}</p>
                                        {item.set && (
                                          <span className="comma">,</span>
                                        )}
                                      </>
                                    )}
                                    {item.set && (
                                      <p className="mb-1.5">{item.set}</p>
                                    )}
                                  </div>
                                  <p>x{item.quantity}</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-1/4 p-2">
                              <p className="flex justify-end font-semibold">
                                ${item.totalPrice}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="py-2 border-b border-dashed border-gray-300">
                        <div className="flex flex-wrap justify-between -m-2">
                          <div className="w-auto p-2">
                            <span className="text-black">Subtotal</span>
                          </div>
                          <div className="w-auto p-2">
                            <span className="font-semibold">
                              $ {grandTotal}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between -m-2">
                          <div className="w-auto p-2">
                            <span className="text-black">Shipment cost</span>
                          </div>
                          <div className="w-auto p-2">
                            <span className="font-semibold text-gray-300">
                              $30
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2.5 mb-9">
                        <div className="flex flex-wrap items-center justify-between -m-2">
                          <div className="w-auto p-2">
                            <p className="font-semibold">Grand total</p>
                          </div>
                          <div className="w-auto p-2">
                            <p className="text-2xl font-semibold">
                              $ {totalWithShipping}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="py-3 px-7 w-full text-sm text-white font-semibold bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 focus:ring-4 focus:ring-gray-200 rounded-4xl transition duration-300"
                      >
                        Order
                      </button>
                    </div>
                    {showErrorAlert && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-5 rounded-md shadow-lg text-center">
                          <svg
                            height="48"
                            version="1.1"
                            width="48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-500 mx-auto"
                          >
                            <g transform="translate(0 -1028.4)">
                              <path
                                d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                                fill="#c0392b"
                                transform="translate(0 1029.4)"
                              />
                              <path
                                d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z"
                                fill="#e74c3c"
                                transform="translate(0 1028.4)"
                              />
                              <path
                                d="m7.0503 1037.8 3.5357 3.6-3.5357 3.5 1.4142 1.4 3.5355-3.5 3.536 3.5 1.414-1.4-3.536-3.5 3.536-3.6-1.414-1.4-3.536 3.5-3.5355-3.5-1.4142 1.4z"
                                fill="#c0392b"
                              />
                              <path
                                d="m7.0503 1036.8 3.5357 3.6-3.5357 3.5 1.4142 1.4 3.5355-3.5 3.536 3.5 1.414-1.4-3.536-3.5 3.536-3.6-1.414-1.4-3.536 3.5-3.5355-3.5-1.4142 1.4z"
                                fill="#ecf0f1"
                              />
                            </g>
                          </svg>
                          <p className="text-lg font-semibold text-gray-800 mb-4 max-w-md mx-auto">
                            {orderError.message}
                          </p>
                          <button
                            onClick={handleCloseAlert}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default CheckoutPage;
