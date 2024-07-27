import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cameraApi from "../../api/cameraApi";
import cartApi from "../../api/cartApi";
import reviewApi from "../../api/reviewApi";
import useAuthStore from "./../../hooks/authStore";

const ProductPage = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Description");
  const [camera, setCamera] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showMaxQuantityAlert, setShowMaxQuantityAlert] = useState(false);
  const { name } = useParams();
  const { cartId, userId } = useAuthStore();

  useEffect(() => {
    const fetchCameraAndReviews = async () => {
      try {
        const cameraResponse = await cameraApi.getCameraByName(
          name.replace(/-/g, " ")
        );
        setCamera(cameraResponse);

        if (!selectedVariant) {
          setSelectedVariant(cameraResponse.variants[0]);
        }
        setQuantity(cameraResponse.variants[0].quantity > 0 ? 1 : 0);

        const reviewsResponse = await reviewApi.findReviewsByCameraId(
          cameraResponse.id
        );

        setReviews(reviewsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCameraAndReviews();
  }, [name]);

  const getAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return null;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const checkCartQuantity = async () => {
    try {
      const cartResponse = await cartApi.getCartItemsByCartId(cartId);
      const cartItems = cartResponse;

      const existingCartItem = cartItems.find(
        (item) => item.variantId === selectedVariant.id
      );

      if (
        existingCartItem &&
        existingCartItem.quantity >= selectedVariant.quantity
      ) {
        console.log(
          "Cannot add more, item already in cart with maximum quantity reached."
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking cart quantity:", error);
      return false;
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!userId) {
        const canAddToCart = checkLocalStorageCartQuantity(
          selectedVariant.id,
          quantity
        );

        if (!canAddToCart) {
          setShowMaxQuantityAlert(true);
          return;
        }

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingCartItem = cartItems.find(
          (item) => item.variantId === selectedVariant.id
        );

        if (existingCartItem) {
          existingCartItem.quantity += quantity;
        } else {
          cartItems.push({
            variantId: selectedVariant.id,
            quantity: quantity,
          });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log("Cart items saved:", JSON.parse(localStorage.getItem('cartItems')));

        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

        useAuthStore.getState().updateTotalItems(totalItems);

        useAuthStore
          .getState()
          .updateTotalPrice(calculateTotalPrice(cartItems));
      } else {
        const canAddToCart = await checkCartQuantity();

        if (!canAddToCart) {
          setShowMaxQuantityAlert(true);
          return;
        }

        await cartApi.addCartItem({
          cartId: cartId,
          variantId: selectedVariant.id,
          quantity: quantity,
        });

        const cartResponse = await cartApi.getCartByUserId(userId);
        const totalItems = cartResponse.totalItems;
        const totalPrice = cartResponse.totalPrice;

        useAuthStore.getState().updateTotalItems(totalItems);
        useAuthStore.getState().updateTotalPrice(totalPrice);
      }
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const product = camera.variants.find((v) => v.id === item.variantId);
      return total + product.price * item.quantity;
    }, 0);
  };

  const checkLocalStorageCartQuantity = (variantId, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingCartItem = cartItems.find(
      (item) => item.variantId === variantId
    );

    if (existingCartItem) {
      return existingCartItem.quantity + quantity <= selectedVariant.quantity;
    }

    return quantity <= selectedVariant.quantity;
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  if (!camera) {
    return (
      <div className="flex flex-col bg-white">
        <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-[#2E2F31] rounded-[100px_100px_0px_0px] max-md:max-w-full">
          <nav className="flex flex-col items-center px-5 max-md:max-w-full">
            <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
              <div role="status" className="py-14">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }

  const getUniqueValues = (array, key) => {
    return [...new Set(array.map((item) => item[key]))];
  };

  const uniqueSources = getUniqueValues(camera.variants, "source");

  const uniqueColors = getUniqueValues(camera.variants, "color");

  const uniqueStyles = getUniqueValues(camera.variants, "style");

  const uniqueSets = getUniqueValues(camera.variants, "set");

  const slides = selectedVariant.images;

  const handleNextSlide = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setActiveSlide(0);
    setQuantity(variant.quantity > 0 ? 1 : 0);
  };

  const handleQuantityChange = (newQuantity) => {
    const maxQuantity = selectedVariant.quantity;
    if (newQuantity > maxQuantity) {
      setQuantity(maxQuantity);
    } else if (newQuantity < 1 && selectedVariant.quantity > 0) {
      setQuantity(1);
    } else if (newQuantity <= 0 && selectedVariant.quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleCloseAlert = () => {
    setShowMaxQuantityAlert(false);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            &#9733;
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-[#2E2F31] rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="mt-10">
              <div className="container mx-auto mb-10">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 px-4 mb-8 mt-10 md:mb-0 md:mt-0">
                    <div className="relative h-[520px] max-sm:h-[360px] -mt-4">
                      <button
                        onClick={handlePrevSlide}
                        className="absolute z-50 top-1/2 left-0 ml-8 transform -translate-y-1/2"
                      >
                        <svg
                          width="10"
                          height="18"
                          viewBox="0 0 10 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 16.0185C9.268 16.2905 9.268 16.7275 9 16.9975C8.732 17.2675 8.299 17.2685 8.031 16.9975L0.201 9.0895C-0.067 8.8195 -0.067 8.3825 0.201 8.1105L8.031 0.2025C8.299 -0.0675 8.732 -0.0675 9 0.2025C9.268 0.4735 9.268 0.9115 9 1.1815L1.859 8.6005L9 16.0185Z"
                            fill="#1F40FF"
                          />
                        </svg>
                      </button>
                      <div className="overflow-hidden h-full">
                        <div
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{
                            transform: `translateX(-${activeSlide * 100}%)`,
                          }}
                        >
                          {slides.map((slide, index) => (
                            <div key={index} className="flex-shrink-0 w-full">
                              <img
                                className="p-16 object-cover w-[full] h-[full]"
                                src={slide}
                                alt={`Slide ${index + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleNextSlide}
                        className="absolute z-50 top-1/2 right-0 mr-8 transform -translate-y-1/2"
                      >
                        <svg
                          width="10"
                          height="18"
                          viewBox="0 0 10 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.19922 1.1817C-0.0687795 0.909696 -0.0687794 0.472695 0.19922 0.202695C0.46722 -0.0673054 0.90022 -0.0683048 1.16822 0.202695L8.99822 8.11069C9.26622 8.3807 9.26622 8.81769 8.99822 9.08969L1.16822 16.9977C0.900219 17.2677 0.467218 17.2677 0.199219 16.9977C-0.0687809 16.7267 -0.0687808 16.2887 0.199219 16.0187L7.34022 8.5997L0.19922 1.1817Z"
                            fill="#1F40FF"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-5">
                      {slides.map((slide, index) => (
                        <div key={index} className="w-1/2 sm:w-1/4 p-2">
                          <button
                            onClick={() => setActiveSlide(index)}
                            className={`block border ${
                              activeSlide === index
                                ? "border-gray-300"
                                : "border-transparent hover:border-gray-400"
                            }`}
                          >
                            <img
                              className="w-full h-32 object-cover"
                              src={slide}
                              alt={`Thumbnail ${index + 1}`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="lg:pl-20">
                      <div className="mb-3 pb-7 border-b text-left">
                        <h2 className="mt-2 mb-4 max-w-xl text-3xl md:text-4xl font-bold font-heading">
                          {camera.name}
                        </h2>
                        <div className="mb-4">
                          {reviews && reviews.length > 0 && (
                            <span className="text-sm">
                              {renderStars(getAverageRating(reviews))}
                            </span>
                          )}
                        </div>
                        <p className="inline-block mb-4 text-2xl font-bold font-heading text-blue-300">
                          <span className="mr-2">
                            $
                            {(
                              selectedVariant.price -
                              (selectedVariant.price *
                                selectedVariant.discount) /
                                100
                            ).toFixed(2)}
                          </span>
                          {selectedVariant.discount > 0 && (
                            <span className="font-normal text-base text-gray-400 line-through">
                              ${selectedVariant.price}
                            </span>
                          )}
                        </p>
                        <p className="max-w-md text-gray-500">
                          {camera.description}
                        </p>
                      </div>
                      <div className="flex mb-6">
                        <div className="flex flex-col items-start text-left">
                          <div className="flex flex-wrap space-x-8 mb-2">
                            {/* Source */}
                            <div>
                              <span className="block mb-2 font-bold font-heading text-gray-400 uppercase">
                                Source
                              </span>
                              {uniqueSources.map((source) => (
                                <button
                                  key={source}
                                  className={`p-2.5 pr-4 py-2 font-semibold font-heading text-black border-2 border-solid ${
                                    selectedVariant.source === source
                                      ? "border-[#007bff]"
                                      : "border-gray-200"
                                  } focus:ring-blue-300 focus:border-blue-300 rounded-md`}
                                  onClick={() =>
                                    handleVariantChange(
                                      camera.variants.find(
                                        (variant) => variant.source === source
                                      )
                                    )
                                  }
                                >
                                  {source}
                                </button>
                              ))}
                            </div>
                            {/* Color */}
                            <div>
                              <span className="block mb-2 font-bold font-heading text-gray-400 uppercase">
                                Color
                              </span>
                              <div className="flex space-x-3">
                                {uniqueColors.map((color) => (
                                  <button
                                    key={color}
                                    className={`p-2.5 pr-10 py-2 font-semibold font-heading text-black border-2 border-solid ${
                                      selectedVariant.color === color
                                        ? "border-[#007bff]"
                                        : "border-gray-200"
                                    } focus:ring-blue-300 focus:border-blue-300 rounded-md`}
                                    onClick={() =>
                                      handleVariantChange(
                                        camera.variants.find(
                                          (variant) => variant.color === color
                                        )
                                      )
                                    }
                                  >
                                    {color}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            {/* Style */}
                            {selectedVariant.style && (
                              <div>
                                <span className="block mb-2 font-bold font-heading text-gray-400 uppercase">
                                  Style
                                </span>
                                <div className="flex space-x-3">
                                  {uniqueStyles.map((style) => (
                                    <button
                                      key={style}
                                      className={`p-2.5 pr-4 py-2 font-semibold font-heading text-black border-2 border-solid ${
                                        selectedVariant.style === style
                                          ? "border-[#007bff]"
                                          : "border-gray-200"
                                      } focus:ring-blue-300 focus:border-blue-300 rounded-md`}
                                      onClick={() =>
                                        handleVariantChange(
                                          camera.variants.find(
                                            (variant) => variant.style === style
                                          )
                                        )
                                      }
                                    >
                                      {style}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            {/* Set */}
                            {selectedVariant.set && (
                              <div>
                                <span className="block mb-2 font-bold font-heading text-gray-400 uppercase">
                                  Set
                                </span>
                                <div className="flex space-x-3">
                                  {uniqueSets.map((set) => (
                                    <button
                                      key={set}
                                      className={`p-2.5 pr-4 py-2 font-semibold font-heading text-black border-2 border-solid ${
                                        selectedVariant.set === set
                                          ? "border-[#007bff]"
                                          : "border-gray-200"
                                      } focus:ring-blue-300 focus:border-blue-300 rounded-md`}
                                      onClick={() =>
                                        handleVariantChange(
                                          camera.variants.find(
                                            (variant) => variant.set === set
                                          )
                                        )
                                      }
                                    >
                                      {set}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap space-x-5">
                            <div>
                              <span className="block mb-2 font-bold font-heading text-gray-400 uppercase">
                                QTY
                              </span>
                              <div className="inline-flex items-center px-4 font-semibold font-heading text-gray-500 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(quantity - 1)
                                  }
                                  className="py-2 hover:text-gray-700"
                                  disabled={
                                    quantity <= 1 ||
                                    selectedVariant.quantity === 0
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="2"
                                    viewBox="0 0 12 2"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g opacity="0.35">
                                      <rect
                                        x="12"
                                        width="2"
                                        height="12"
                                        transform="rotate(90 12 0)"
                                        fill="currentColor"
                                      />
                                    </g>
                                  </svg>
                                </button>
                                <input
                                  className="w-12 m-0 px-2 py-2 text-center md:text-right border-0 focus:ring-transparent focus:outline-none rounded-md"
                                  type="number"
                                  value={quantity}
                                  readOnly
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(quantity + 1)
                                  }
                                  className="py-2 hover:text-gray-700"
                                  disabled={
                                    quantity >= selectedVariant.quantity
                                  }
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g opacity="0.35">
                                      <rect
                                        x="5"
                                        width="2"
                                        height="12"
                                        fill="currentColor"
                                      />
                                      <rect
                                        x="12"
                                        y="5"
                                        width="2"
                                        height="12"
                                        transform="rotate(90 12 5)"
                                        fill="currentColor"
                                      />
                                    </g>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="flex items-end">
                              <div className="px-4 mb-4 xl:mb-0">
                                <button
                                  onClick={handleBuyNow}
                                  className={`block ${
                                    quantity === 0
                                      ? "bg-gray-200 text-gray-400"
                                      : "bg-orange-300 hover:bg-orange-400 "
                                  } text-center text-white font-bold font-heading py-3 px-5 rounded-md uppercase transition duration-200`}
                                  type="button"
                                  disabled={quantity === 0}
                                >
                                  Buy Now
                                </button>
                              </div>
                              <div className="px-4">
                                <a
                                  onClick={
                                    quantity > 0 ? handleAddToCart : null
                                  }
                                  className={`ml-auto sm:ml-0 flex-shrink-0 inline-flex mr-4 items-center justify-center w-12 h-12 rounded-md border hover:border-gray-500 ${
                                    quantity === 0
                                      ? "pointer-events-none"
                                      : "cursor-pointer"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    width="27"
                                    height="27"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                  </svg>
                                </a>
                              </div>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ul className="flex flex-wrap mb-10 border-b-2">
                    <li className="w-1/2 md:w-auto">
                      <button
                        className={`inline-block py-6 px-10 text-gray-500 font-bold font-heading ${
                          tab === "Description" ? "bg-white shadow-2xl" : ""
                        }`}
                        onClick={() => handleTabChange("Description")}
                      >
                        Description
                      </button>
                    </li>
                    <li className="w-1/2 md:w-auto">
                      <button
                        className={`inline-block py-6 px-10 text-gray-500 font-bold font-heading ${
                          tab === "Sample galleries"
                            ? "bg-white shadow-2xl"
                            : ""
                        }`}
                        onClick={() => handleTabChange("Sample galleries")}
                      >
                        Sample galleries
                      </button>
                    </li>
                    <li className="w-1/2 md:w-auto">
                      <button
                        className={`inline-block py-6 px-10 text-gray-500 font-bold font-heading ${
                          tab === "Review" ? "bg-white shadow-2xl" : ""
                        }`}
                        onClick={() => handleTabChange("Review")}
                      >
                        Review
                      </button>
                    </li>
                  </ul>
                  {tab === "Description" && (
                    <div className="text-left">
                      <h3 className="mb-5 text-3xl font-bold font-heading text-blue-300 text-left">
                        Specifications
                      </h3>
                      <table className="border border-gray-300 w-2/3">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 border border-gray-300">
                              Feature
                            </th>
                            <th className="px-4 py-2 border border-gray-300">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              ISO
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.iso}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              Shooting Speed
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.shootingSpeed}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              Stabilization
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.stabilization}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              Resolution
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.resolution}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              SensorType
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.sensorType}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              VideoResolution
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.videoResolution}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              Battery
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.battery}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              Weight
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.weight}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border border-gray-300">
                              Size
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {camera.size}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {tab === "Sample galleries" && (
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center mt-5">
                        {camera.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Sample ${index + 1}`}
                            className="my-2 cursor-pointer w-2/3 h-1/2"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {tab === "Review" && (
                    <div className="text-left">
                      {reviews.length === 0 ? (
                        <p>No reviews available.</p>
                      ) : (
                        reviews.map((review, index) => (
                          <div
                            key={index}
                            className="review-item p-4 border-b border-gray-200"
                          >
                            <div className="flex items-center mb-2">
                              <div className="text-lg font-semibold">
                                {review.user.fullName}
                              </div>
                              <div className="ml-2">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">
                              &quot;{review.content}&quot;
                            </p>
                            <p className="text-gray-400 text-sm">
                              {new Date(review.createAt).toLocaleString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default ProductPage;
