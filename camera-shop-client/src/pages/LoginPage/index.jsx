import { useState, useRef, useEffect } from "react";
import loginApi from "./../../api/loginApi";
import cartApi from "../../api/cartApi";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "./../../hooks/authStore";
import userApi from "../../api/userApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = [useRef(null), useRef(null), useRef(null)];
  const [slideWidth, setSlideWidth] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (slideRefs[0].current) {
      setSlideWidth(slideRefs[0].current.offsetWidth);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setEmailError(null);
    setPasswordError(null);
  
    try {
      const response = await loginApi.login({
        email,
        password,
      });
  
      const userId = response.id;
      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
  
      const cartResponse = await cartApi.getCartByUserId(userId);
      const cartId = cartResponse.id;
  
      const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      
      if (savedCartItems.length > 0) {
        const currentCartItems = await cartApi.getCartItemsByCartId(cartId);
  
        for (const item of savedCartItems) {
          const existingCartItem = currentCartItems.find(
            (cartItem) => cartItem.variantId === item.variantId
          );
  
          if (existingCartItem) {
            const updatedQuantity = existingCartItem.quantity + item.quantity;
            const cartItemData = {
              cartId: cartId,
              variantId: item.variantId,
              quantity: updatedQuantity,
            };
            await cartApi.updateCartItem(cartItemData);
          } else {
            const cartItemData = {
              cartId: cartId,
              variantId: item.variantId,
              quantity: item.quantity,
            };
            await cartApi.addCartItem(cartItemData);
          }
        }
  
        localStorage.removeItem("cartItems");
      }
  
      const updatedCartResponse = await cartApi.getCartByUserId(userId);
      const totalItems = updatedCartResponse.totalItems;
      const totalPrice = updatedCartResponse.totalPrice;
  
      const user = await userApi.getUserById(userId);
      login(userId, user.role, cartId, totalItems, totalPrice);
  
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === "Email not found") {
          setEmailError("This email is not associated with any account.");
        } else if (error.response.data.message === "Password is incorrect") {
          setPasswordError("Incorrect password.");
        }
      } else {
        setEmailError("Something went wrong. Please try again later.");
      }
    }
  };
  
  const handleSlideChange = (index) => {
    setActiveSlide(index);
    setSlideWidth(slideRefs[index].current.offsetWidth * index);
  };

  return (
    <div>
      <section className="relative py-5 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -mx-4 xl:items-center">
              <div className="w-full lg:w-1/2 xl:w-3/5 px-4 order-last lg:order-first">
                <div className="relative max-w-xl mx-auto lg:mx-0 lg:max-w-3xl h-full">
                  <img
                    className="block w-full h-80 lg:h-[700px] object-cover rounded-3xl"
                    src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fccf949b856844f84a70e47d297680417"
                    alt=""
                  />
                  <div className="absolute bottom-0 w-full left-0 p-4 sm:p-6">
                    <div className="p-6 sm:p-10 backdrop-blur-md backdrop-filter bg-black bg-opacity-30 rounded-5xl">
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 ease-in-out -m-5"
                          style={{ transform: `translateX(-${slideWidth}px)` }}
                        >
                          <div
                            ref={slideRefs[0]}
                            className="flex-shrink-0 h-full w-full p-5"
                          >
                            <h5 className="text-3xl text-white font-semibold mb-2">
                              Selina Destin
                            </h5>
                            <span className="block text-sm text-white font-semibold mb-6">
                              Web Development Agency
                            </span>
                            <p className="max-w-xl text-2xl text-white font-semibold mb-15">
                              Untitled has become essential in starting every
                              new project, we cannot imagine working without it.
                            </p>
                          </div>
                          <div
                            ref={slideRefs[1]}
                            className="flex-shrink-0 h-full w-full p-5"
                          >
                            <h5 className="text-3xl text-white font-semibold mb-2">
                              Kristin Watson
                            </h5>
                            <span className="block text-sm text-white font-semibold mb-6">
                              Medical Assistant
                            </span>
                            <p className="max-w-xl text-2xl text-white font-semibold mb-15">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna.
                            </p>
                          </div>
                          <div
                            ref={slideRefs[2]}
                            className="flex-shrink-0 h-full w-full p-5"
                          >
                            <h5 className="text-3xl text-white font-semibold mb-2">
                              Darrell Steward
                            </h5>
                            <span className="block text-sm text-white font-semibold mb-6">
                              Marketing Coordinator
                            </span>
                            <p className="max-w-xl text-2xl text-white font-semibold mb-15">
                              Ut enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo
                              consequat.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => handleSlideChange(0)}
                          className={`inline-block mr-2 h-1 w-5 rounded-full cursor-pointer ${
                            activeSlide === 0
                              ? "bg-blue-900"
                              : "bg-white hover:bg-blue-100"
                          }`}
                        ></button>
                        <button
                          onClick={() => handleSlideChange(1)}
                          className={`inline-block mr-2 h-1 w-5 rounded-full cursor-pointer ${
                            activeSlide === 1
                              ? "bg-blue-900"
                              : "bg-white hover:bg-blue-100"
                          }`}
                        ></button>
                        <button
                          onClick={() => handleSlideChange(2)}
                          className={`inline-block h-1 w-5 rounded-full cursor-pointer ${
                            activeSlide === 2
                              ? "bg-blue-900"
                              : "bg-white hover:bg-blue-100"
                          }`}
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 xl:w-2/5 px-4 mb-16 lg:mb-0">
                <div className="max-w-md lg:py-10 mx-auto lg:mr-0">
                  <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
                    Sign in to your account
                  </h3>
                  <p className="text-lg text-gray-500 mb-10">
                    Greetings on your return! We kindly request you to enter
                    your details.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6 text-left">
                      <label
                        className="block mb-1.5 text-sm text-gray-900 font-semibold"
                        htmlFor=""
                      >
                        Email
                      </label>
                      <input
                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                        type="email"
                        placeholder="eyesee@gmail.com"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="email"
                        required
                      />
                      {emailError && (
                        <p className="text-red-500 text-xs mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className="mb-7">
                      <div className="flex mb-1.5 items-center justify-between">
                        <label
                          className="block text-sm text-gray-900 font-semibold"
                          htmlFor=""
                        >
                          Password
                        </label>
                        <a
                          className="inline-block text-xs font-semibold text-orange-900 hover:text-gray-900"
                          href="#"
                        >
                          Forget password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      {passwordError && (
                        <p className="text-red-500 text-xs mt-1 text-left">
                          {passwordError}
                        </p>
                      )}
                    </div>
                    <button
                      className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
                      type="submit"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <span className="relative">Sign in</span>
                    </button>
                    <span className="text-xs font-semibold text-gray-900">
                      <span>Don’t have an account?</span>
                      <Link to="/signup">
                        <div className="ml-1 inline-block text-orange-900 hover:text-orange-700">
                          Sign up
                        </div>
                      </Link>
                    </span>
                  </form>
                  <div className="text-center mt-6">
                    <Link to="/">
                      <button className="py-3 px-5 text-sm font-semibold text-white bg-gray-800 rounded-full hover:bg-gray-700">
                        Continue as guest
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
