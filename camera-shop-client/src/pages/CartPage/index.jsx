import cartApi from "../../api/cartApi";
import variantApi from "../../api/variantApi";
import useAuthStore from "../../hooks/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const { cartId, userId } = useAuthStore();
  const { totalItems, totalPrice } = useAuthStore();
  const [showMaxQuantityAlert, setShowMaxQuantityAlert] = useState(false);
  const [currentTotalItems, setCurrentTotalItems] = useState(totalItems);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(totalPrice);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (cartId) {
          const cartResponse = await cartApi.getCartItemsByCartId(cartId);

          const updatedCartItems = await Promise.all(
            cartResponse.map(async (item) => {
              const variantResponse = await variantApi.getVariantById(
                item.variantId
              );
              let inStockMessage = "";

              if (variantResponse.quantity === 0) {
                inStockMessage = "Out of stock";
              } else if (item.quantity > variantResponse.quantity) {
                inStockMessage = `Only have ${variantResponse.quantity} in stock`;
              }

              return {
                ...item,
                maxQuantity: variantResponse.quantity,
                inStockMessage: inStockMessage,
              };
            })
          );

          setCartItems(updatedCartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [cartId]);

  useEffect(() => {
    const initialCheckedItems = cartItems
      .filter(
        (item) => item.quantity <= item.maxQuantity && item.maxQuantity > 0
      )
      .map((item) => item.variantId);
    setCheckedItems(initialCheckedItems);
  }, [cartItems]);

  const handleQuantityChange = async (variantId, newQuantity) => {
    try {
      newQuantity = Math.max(1, newQuantity);

      const variantResponse = await variantApi.getVariantById(variantId);

      if (newQuantity > variantResponse.quantity) {
        setShowMaxQuantityAlert(true);
      } else {
        const cartItemData = {
          cartId: cartId,
          variantId: variantId,
          quantity: newQuantity,
        };
        await cartApi.updateCartItem(cartItemData);

        const updatedCartItems = cartItems.map((item) => {
          if (item.variantId === variantId) {
            const inStockMessage =
              newQuantity > variantResponse.quantity
                ? `Only have ${variantResponse.quantity} in stock`
                : "";
            return { ...item, quantity: newQuantity, inStockMessage };
          }
          return item;
        });
        setCartItems(updatedCartItems);

        const cartResponse = await cartApi.getCartByUserId(userId);
        const totalItems = cartResponse.totalItems;
        const totalPrice = cartResponse.totalPrice;

        useAuthStore.getState().updateTotalItems(totalItems);
        useAuthStore.getState().updateTotalPrice(totalPrice);

        const updatedCheckedItems = checkedItems.filter((id) => {
          const item = updatedCartItems.find((item) => item.variantId === id);
          return item && item.inStockMessage === "";
        });
        setCheckedItems(updatedCheckedItems);
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleRemoveItem = async (variantId) => {
    try {
      await cartApi.deleteCartItem(cartId, variantId);

      const updatedCartItems = cartItems.filter(
        (item) => item.variantId !== variantId
      );
      setCartItems(updatedCartItems);

      const cartResponse = await cartApi.getCartByUserId(userId);
      const totalItems = cartResponse.totalItems;
      const totalPrice = cartResponse.totalPrice;

      useAuthStore.getState().updateTotalItems(totalItems);
      useAuthStore.getState().updateTotalPrice(totalPrice);

      const updatedCheckedItems = checkedItems.filter((id) => id !== variantId);
      setCheckedItems(updatedCheckedItems);
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowMaxQuantityAlert(false);
  };

  const handleMasterCheckboxChange = (isChecked) => {
    if (isChecked) {
      const validItems = cartItems
        .filter((item) => item.maxQuantity > 0 && item.inStockMessage === "")
        .map((item) => item.variantId);
      setCheckedItems(validItems);
    } else {
      setCheckedItems([]);
    }
  };

  const handleItemCheckboxChange = (variantId, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, variantId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== variantId));
    }
  };

  const updateTotalItemsAndPrice = () => {
    const checkedCartItems = cartItems.filter((item) =>
      checkedItems.includes(item.variantId)
    );
    const totalItems = checkedCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = checkedCartItems.reduce(
      (sum, item) =>
        sum + item.price * (1 - item.discount / 100) * item.quantity,
      0
    );

    setCurrentTotalItems(totalItems);
    setCurrentTotalPrice(totalPrice);
  };

  useEffect(() => {
    updateTotalItemsAndPrice();
  }, [checkedItems]);

  const handleCheckout = () => {
    const checkedCartItems = cartItems.filter((item) =>
      checkedItems.includes(item.variantId)
    );

    navigate("/cart/checkout", { state: { checkedCartItems } });
  };

  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-[#2E2F31] rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="pt-12 pb-12 bg-blueGray-100">
              <div className="container px-4 mx-auto">
                <div className="pb-2 text-center">
                  <h2 className="text-4xl xl:text-10xl leading-normal font-heading font-medium text-center">
                    Your cart
                  </h2>
                </div>
                <div className="py-8 px-8 md:px-8 mb-14 xl:mb-9 bg-white border-gray-300 rounded-3xl shadow-lg">
                  <div className="lg:px-10">
                    {cartItems.length > 0 ? (
                      <div>
                        <div className="flex items-center mb-4 -ml-4">
                          <input
                            type="checkbox"
                            checked={
                              cartItems.length > 0 &&
                              checkedItems.length ===
                                cartItems.filter(
                                  (item) =>
                                    item.maxQuantity > 0 &&
                                    item.inStockMessage === ""
                                ).length &&
                              cartItems.some(
                                (item) =>
                                  item.maxQuantity > 0 &&
                                  item.inStockMessage === ""
                              )
                            }
                            className="w-4 h-4 rounded"
                            id="masterCheckbox"
                            onChange={(e) =>
                              handleMasterCheckboxChange(e.target.checked)
                            }
                          />

                          <label
                            className="ml-2 text-base font-medium"
                            htmlFor="masterCheckbox"
                          >
                            Selected All
                          </label>
                        </div>
                        {cartItems.map((item) => (
                          <div
                            key={item.variantId}
                            className={`relative flex flex-wrap items-center -mx-4 mb-8 pb-2 border-b border-gray-400 border-opacity-40 ${
                              item.inStockMessage
                                ? "bg-gray-100 rounded mb-5"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(item.variantId)}
                              className="w-3 h-3 rounded"
                              onChange={(e) =>
                                handleItemCheckboxChange(
                                  item.variantId,
                                  e.target.checked
                                )
                              }
                              disabled={
                                item.maxQuantity === 0 ||
                                item.inStockMessage !== ""
                              }
                            />
                            <a className="block mx-auto max-w-max" href="#">
                              <img
                                className="w-28 object-cover"
                                src={item.images}
                                alt={item.cameraName}
                              />
                            </a>

                            <div className="w-full md:w-auto px-4 mb-6 lg:mb-0 text-left">
                            <Link
                                to={`/camera/${item.cameraName
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                              <div
                                className="block mb-5 text-xl font-heading font-medium hover:underline"
                                href="#"
                              >
                                {item.cameraName}
                              </div>
                              </Link>
                              <div className="flex flex-wrap items-center">
                                {item.source && (
                                  <p className="mr-4 mb-2 md:mb-0 text-sm font-medium">
                                    <span className="font-heading">
                                      Source:
                                    </span>
                                    <span className="ml-2 text-gray-400">
                                      {item.source}
                                    </span>
                                  </p>
                                )}
                                {item.color && (
                                  <p className="mr-4 mb-2 md:mb-0 text-sm font-medium">
                                    <span className="font-heading">Color:</span>
                                    <span className="ml-2 text-gray-400">
                                      {item.color}
                                    </span>
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-wrap">
                                {item.style && (
                                  <p className="mr-4 mb-2 md:mb-0 text-sm font-medium">
                                    <span className="font-heading">Style:</span>
                                    <span className="ml-2 text-gray-400">
                                      {item.style}
                                    </span>
                                  </p>
                                )}
                                {item.set && (
                                  <p className="text-sm font-medium">
                                    <span className="font-heading">Set:</span>
                                    <span className="ml-2 text-gray-400">
                                      {item.set}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-auto px-4 flex items-center flex-wrap md:ml-24">
                              {/* Price Section */}
                              <div className="flex flex-col items-start">
                                {/* Original Price (if discounted) */}
                                {item.discount > 0 && (
                                  <span className="line-through text-base font-heading font-medium text-gray-500 mr-4">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                                {/* Discounted Price */}
                                <span className="text-base font-heading font-medium text-gray-700 mr-4">
                                  $
                                  {(
                                    item.price *
                                    (1 - item.discount / 100)
                                  ).toFixed(2)}
                                </span>
                              </div>
                              {/* Quantity Input */}
                              <div className="flex flex-col">
                                <div className="flex items-center mr-4 ml-14">
                                  <button
                                    className={`border border-gray-400 text-gray-700 font-bold py-2 px-4 rounded-l-lg ${
                                      item.maxQuantity === 0
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "hover:bg-gray-300 bg-white "
                                    }`}
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.variantId,
                                        item.quantity - 1
                                      )
                                    }
                                    disabled={item.maxQuantity === 0}
                                  >
                                    -
                                  </button>
                                  <span className="px-6 py-2 bg-white border-t border-b border-gray-400 text-gray-700 font-bold">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className={`border border-gray-400 text-gray-700 font-bold py-2 px-4 rounded-r-lg ${
                                      item.maxQuantity === 0
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : "hover:bg-gray-300 bg-white"
                                    }`}
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.variantId,
                                        item.quantity + 1
                                      )
                                    }
                                    disabled={item.maxQuantity === 0}
                                  >
                                    +
                                  </button>
                                </div>
                                {item.inStockMessage && (
                                  <div className="text-red-500 font-semibold ml-8 mt-2 text-sm ">
                                    {item.inStockMessage}
                                  </div>
                                )}
                              </div>
                              {/* Total Price */}
                              <span className="text-xl font-heading font-medium text-blue-500 ml-36">
                                <span className="text-sm">$</span>
                                <span>
                                  {(
                                    item.price *
                                    (1 - item.discount / 100) *
                                    item.quantity
                                  ).toFixed(2)}
                                </span>
                              </span>
                            </div>
                            {showMaxQuantityAlert && (
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
                                  <p className="text-lg font-semibold text-gray-800 mb-4 max-w-sm mx-auto">
                                    Cannot add more, item already in cart with
                                    maximum quantity reached.
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
                            <button
                              onClick={() => handleRemoveItem(item.variantId)}
                              className="absolute top-0 right-0 lg:mt-2 lg:-mr-4 text-gray-200 hover:text-gray-300"
                            >
                              {/* Remove Button */}
                              <svg
                                width="28"
                                height="28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="27"
                                  height="27"
                                  rx="13.5"
                                  stroke="currentColor"
                                ></rect>
                                <line
                                  x1="20.495"
                                  y1="8.49497"
                                  x2="8.49498"
                                  y2="20.495"
                                  stroke="currentColor"
                                ></line>
                                <line
                                  x1="19.505"
                                  y1="20.495"
                                  x2="7.50503"
                                  y2="8.49498"
                                  stroke="currentColor"
                                ></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg">Your cart is empty.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" bottom-0 left-0 w-full lg:flex xl:items-center">
                  <div className="sm:flex sm:flex-wrap lg:justify-end w-full">
                    <div className="sm:pr-3 lg:px-3 mb-6 xl:mb-0 w-full sm:w-1/2 lg:w-4/12 xl:w-3/12">
                      <div className="relative flex items-center justify-between py-4 px-10 leading-8 bg-gray-300 bg-opacity-50 font-medium rounded-3xl">
                        <div className="absolute left-3 flex justify-center items-center w-20 h-20 bg-white rounded-full">
                          <div className="flex justify-center items-center w-11 h-11 text-xl text-white font-bold bg-blue-500 rounded-full">
                            {currentTotalItems}
                          </div>
                        </div>
                        <span className="ml-16">Products</span>
                      </div>
                    </div>
                    <div className="sm:pr-3 lg:px-3 mb-10 sm:mb-0 w-full sm:w-1/2 lg:w-4/12 xl:w-3/12">
                      <div className="flex items-center justify-between py-4 px-10 leading-8 bg-gray-300 font-heading font-medium rounded-3xl">
                        <span>Total</span>
                        <span className="flex items-center text-blue-500">
                          <span className="mr-3 text-sm">$</span>
                          <span className="text-xl">
                            {currentTotalPrice.toFixed(2)}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="sm:pl-3 w-full sm:w-1/2 lg:max-w-max lg:ml-auto xl:ml-0">
                      <button
                        disabled={currentTotalItems === 0}
                        className={`block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center
              ${
                currentTotalItems === 0
                  ? "text-gray-400 bg-gray-200"
                  : "text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
              } 
              rounded-xl`}
                        href="#"
                        onClick={() => handleCheckout()}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default CartPage;
