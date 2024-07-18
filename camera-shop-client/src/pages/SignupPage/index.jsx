import { useState, useRef, useEffect } from "react";
import {
  isValidFullName,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidAddress,
} from "../../utils/Validate";
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = [useRef(null), useRef(null), useRef(null)];
  const [slideWidth, setSlideWidth] = useState(0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    if (slideRefs[0].current) {
      setSlideWidth(slideRefs[0].current.offsetWidth);
    }
  }, []);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
    setSlideWidth(slideRefs[index].current.offsetWidth * index);
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    setFullNameError(!isValidFullName(value)); 
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!isValidEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!isValidPassword(value));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(!isValidPhone(value));
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    setAddressError(!isValidAddress(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFullNameError(!isValidFullName(fullName));
    setEmailError(!isValidEmail(email));
    setPasswordError(!isValidPassword(password));
    setPhoneError(!isValidPhone(phone));
    setAddressError(!isValidAddress(address));

    if (
      !fullNameError &&
      !emailError &&
      !passwordError &&
      !phoneError &&
      !addressError
    ) {
      navigate("/signin");
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container px-4 mx-auto pt-4">
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
                <div className="max-w-md mx-auto lg:mr-0 text-left">
                  <h3 className="font-heading text-4xl text-gray-900 font-semibold mb-4">
                    Sign up
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-left">
                      <label
                        className="block mb-1.5 text-sm text-gray-900 font-semibold"
                        htmlFor=""
                      >
                        Full Name
                      </label>
                      <input
                        className={`w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg ${
                          fullNameError ? "border-red-500" : ""
                        }`}
                        placeholder="Katty Perry "
                        value={fullName}
                        onChange={handleFullNameChange}
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        Full name must be at least 2 words, with the first
                        letter of each word capitalized.
                      </p>
                    </div>
                    <div className="mb-4 text-left">
                      <label
                        className="block text-sm text-gray-900 font-semibold"
                        htmlFor=""
                      >
                        Email
                      </label>
                      <input
                        className={`w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg ${
                          emailError ? "border-red-500" : ""
                        }`}
                        type="email"
                        placeholder="eyesee@gmail.com"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <p className="text-gray-500 text-xs mt-1">
                        e.g., example@email.com
                      </p>
                    </div>
                    <div className="mb-4">
                      <div className="flex mb-1.5 items-center justify-between">
                        <label
                          className="block text-sm text-gray-900 font-semibold"
                          htmlFor=""
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className={`w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg ${
                            passwordError ? "border-red-500" : ""
                          }`}
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <p className="text-gray-500 text-xs mt-1">
                          Password must be at least 8 characters long, start
                          with a capital letter, and contain numbers and special
                          characters.
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 lg:flex">
                      <div className="lg:flex-1 lg:mr-2">
                        <div className="mb-1.5">
                          <label
                            className="block text-sm text-gray-900 font-semibold"
                            htmlFor=""
                          >
                            Phone
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            className={`w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg ${
                              phoneError ? "border-red-500" : ""
                            }`}
                            type="text" 
                            placeholder="0123456789"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                          <p className="text-gray-500 text-xs mt-1">
                            Phone number must start with 0 and have 10 or 11
                            digits.
                          </p>
                        </div>
                      </div>
                      <div className="lg:flex-2 lg:ml-2">
                        <div className="mb-1.5">
                          <label
                            className="block text-sm text-gray-900 font-semibold"
                            htmlFor=""
                          >
                            Address
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            className={`w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg ${
                              addressError ? "border-red-500" : ""
                            }`}
                            type="text"
                            placeholder="123 San Francisco, USA"
                            value={address}
                            onChange={handleAddressChange}
                          />
                          <p className="text-gray-500 text-xs mt-1">
                            Address must contain numbers, letters, and spaces.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-7">
                      <div className="flex mb-1.5 items-center justify-between">
                        <label
                          className="block text-sm text-gray-900 font-semibold"
                          htmlFor=""
                        >
                          Date of Birth
                        </label>
                      </div>
                      <div className="relative">
                        <div className="flex">
                          <div className="flex-1 mr-2">
                            <select className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg">
                              <option value="">Day</option>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(
                                (day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="flex-1 mr-2">
                            <select className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg">
                              <option value="">Month</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (month) => (
                                  <option key={month} value={month}>
                                    {month}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="flex-1">
                            <select className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg">
                              <option value="">Year</option>
                              {Array.from(
                                { length: 120 },
                                (_, i) => 1900 + i
                              ).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100"></button>
                      </div>
                    </div>
                    <button
                      className="relative group block w-full mb-6 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
                      type="submit"
                    >
                      <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                      <span className="relative">Sign up</span>
                    </button>
                    <span className="text-xs font-semibold text-gray-900">
                      <span>Have an account?</span>
                      <Link to="/signin">
                      <a
                        className="ml-1 inline-block text-orange-900 hover:text-orange-700"
                      >
                        Sign in
                      </a>
                      </Link>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
