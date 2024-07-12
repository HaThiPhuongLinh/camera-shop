const ShopPage = () => {
  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-zinc-800 rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-[#dfdfdf] rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
              alt=""
              className="mt-10 w-full max-md:mt-10 max-md:max-w-full"
            />
            <section className="pt-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4 mb-10 items-center justify-between">
                  <div className="w-full lg:w-auto px-4 mb-12 xl:mb-0">
                    <h2 className="text-3xl font-bold font-heading">
                      <span>Found 125 results for </span>
                      <a className="relative text-blue-300 underline" href="#">
                        Sports
                      </a>
                    </h2>
                  </div>
                  <div className="w-full lg:w-auto px-4 flex flex-wrap items-center">
                    <div className="w-full sm:w-auto mb-4 sm:mb-0 mr-5">
                      <select
                        className="pl-8 py-4 bg-white text-lg border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        name=""
                        id=""
                      >
                        <option value="1">Sort by newest</option>
                        <option value="2">Sort by price</option>
                        <option value="3">Sort by most popular</option>
                      </select>
                    </div>
                    <a
                      className="inline-block mr-3 h-full hover:bg-white p-4 rounded-md border group text-gray-200"
                      href="#"
                    >
                      <svg
                        className="group-hover:text-blue-300"
                        width="20"
                        height="24"
                        viewBox="0 0 20 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="4" height="4" rx="2" fill="currentColor" />
                        <rect
                          x="8"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="16"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="8"
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="16"
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="8"
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="16"
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      className="inline-block h-full p-4 border hover:bg-white rounded-md group bg-white"
                      href="#"
                    >
                      <svg
                        className="text-gray-200 group-hover:text-blue-300"
                        width="28"
                        height="24"
                        viewBox="0 0 28 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="4" height="4" rx="2" fill="currentColor" />
                        <rect
                          x="8"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="16"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="24"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="8"
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="16"
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="24"
                          y="10"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="8"
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="16"
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                        <rect
                          x="24"
                          y="20"
                          width="4"
                          height="4"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-24">
                  <div className="w-full lg:hidden px-3">
                    <div className="flex flex-wrap -mx-2">
                      <div className="w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="py-6 px-2 text-center bg-white">
                          <a className="font-bold font-heading" href="#">
                            Category
                          </a>
                          <ul className="hidden text-left mt-6">
                            <li className="mb-4">
                              <a href="#">New in</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Activewear</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Hoodies & Sweatshirts</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Jackets</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Multipacks</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Bags</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Sports</a>
                            </li>
                            <li className="mb-4">
                              <a href="#">Gifts</a>
                            </li>
                            <li>
                              <a href="#">Notes</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="py-6 px-2 text-center bg-white">
                          <a className="font-bold font-heading" href="#">
                            Colors
                          </a>
                          <div className="hidden mt-6 flex flex-wrap">
                            <button
                              className="mr-4 mb-2 rounded-full border border-blue-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-blue-300 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-orange-300 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-gray-900 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-red-300 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-green-300 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-pink-300 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-yellow-300 w-5 h-5" />
                            </button>
                            <button
                              className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                              href="#"
                            >
                              <div className="rounded-full bg-gray-100 w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="py-6 px-4 text-center bg-white">
                          <a className="font-bold font-heading" href="#">
                            Price
                          </a>
                          <div className="hidden mt-6">
                            <input
                              className="w-full mb-4 outline-none appearance-none bg-gray-100 h-1 rounded cursor-pointer"
                              type="range"
                              min="1"
                              max="289"
                            />
                            <div className="flex justify-between">
                              <span className="inline-block text-lg font-bold font-heading text-blue-300">
                                50$
                              </span>
                              <span className="inline-block text-lg font-bold font-heading text-blue-300">
                                $289
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="py-6 px-4 text-center bg-white">
                          <a className="font-bold font-heading" href="#">
                            Size
                          </a>
                          <div className="hidden mt-6 flex flex-wrap -mx-2 -mb-2">
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              36
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              37
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              38
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              39
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              40
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              41
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              42
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              43
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                            <button
                              className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                              href="#"
                            >
                              44
                              <span className="absolute bottom-0 left-0 w-full py-px" />
                            </button>
                          </div>
                          <div className="hidden mt-4 text-right">
                            <a
                              className="inline-flex underline text-blue-300 hover:text-blue-400"
                              href="#"
                            >
                              <span className="mr-2">Show all</span>
                              <svg
                                width="14"
                                height="27"
                                viewBox="0 0 14 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.83901 26.2775L0.151884 19.5904L0.987775 18.7545L6.66766 24.4343L6.66347 0.782814L7.84208 0.782814L7.84626 24.4343L13.1082 19.1724L13.9441 20.0083L7.6749 26.2775C7.44407 26.5083 7.06985 26.5083 6.83901 26.2775Z"
                                  fill="#3C60D9"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="py-6 px-4 text-center bg-white">
                          <a className="font-bold font-heading" href="#">
                            Location
                          </a>
                          <div className="hidden mt-6">
                            <label className="flex mb-3 items-center text-lg">
                              <input type="checkbox" />
                              <span className="ml-2">Standard</span>
                            </label>
                            <label className="flex items-center text-lg">
                              <input type="checkbox" />
                              <span className="ml-2">Next day (yes!)</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="py-6 px-4 text-center bg-white">
                          <a className="font-bold font-heading" href="#">
                            Location
                          </a>
                          <input
                            className="hidden mt-6 w-full px-8 py-4 bg-white border rounded-md"
                            type="search"
                            placeholder="City"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block w-1/4 px-3">
                    <div className="mb-6 py-10 px-12 bg-white rounded-sm">
                      <h3 className="mb-8 text-2xl font-bold font-heading">
                        Category
                      </h3>
                      <ul className="text-left">
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            New in
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Activewear
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Hoodies & Sweatshirts
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Jackets
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Multipacks
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Bags
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Sports
                          </a>
                        </li>
                        <li className="mb-4">
                          <a className="text-lg" href="#">
                            Gifts
                          </a>
                        </li>
                        <li>
                          <a className="text-lg" href="#">
                            Notes
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-6 py-10 px-12 bg-white rounded-sm">
                      <h3 className="mb-8 text-2xl font-bold font-heading">
                        Colors
                      </h3>
                      <div className="flex flex-wrap">
                        <button
                          className="mr-4 mb-2 rounded-full border border-blue-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-blue-300 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-orange-300 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-gray-900 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-red-300 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-green-300 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-pink-300 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-yellow-300 w-5 h-5" />
                        </button>
                        <button
                          className="mr-4 mb-2 rounded-full border border-transparent hover:border-gray-300 p-1"
                          href="#"
                        >
                          <div className="rounded-full bg-gray-100 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-6 py-10 px-12 bg-white">
                      <h3 className="mb-8 text-2xl font-bold font-heading">
                        Price
                      </h3>
                      <div>
                        <input
                          className="w-full mb-4 outline-none appearance-none bg-gray-100 h-1 rounded cursor-pointer"
                          type="range"
                          min="1"
                          max="289"
                        />
                        <div className="flex justify-between">
                          <span className="inline-block text-lg font-bold font-heading text-blue-300">
                            50$
                          </span>
                          <span className="inline-block text-lg font-bold font-heading text-blue-300">
                            $289
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 py-12 pl-12 pr-6 bg-white rounded-sm">
                      <h3 className="mb-8 text-2xl font-bold font-heading">
                        Size
                      </h3>
                      <div className="flex flex-wrap -mx-2 -mb-2">
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          36
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          37
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          38
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          39
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          40
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          41
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          42
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          43
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                        <button
                          className="relative mb-2 mr-1 w-16 border rounded-md hover:border-gray-400"
                          href="#"
                        >
                          44
                          <span className="absolute bottom-0 left-0 w-full py-px" />
                        </button>
                      </div>
                      <div className="mt-4 text-right">
                        <a
                          className="inline-flex underline text-blue-300 hover:text-blue-400"
                          href="#"
                        >
                          <span className="mr-2">Show all</span>
                          <svg
                            width="14"
                            height="27"
                            viewBox="0 0 14 27"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.83901 26.2775L0.151884 19.5904L0.987775 18.7545L6.66766 24.4343L6.66347 0.782814L7.84208 0.782814L7.84626 24.4343L13.1082 19.1724L13.9441 20.0083L7.6749 26.2775C7.44407 26.5083 7.06985 26.5083 6.83901 26.2775Z"
                              fill="#3C60D9"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="mb-6 py-10 px-12 bg-white rounded-sm">
                      <h3 className="mb-6 text-2xl font-bold font-heading">
                        Location
                      </h3>
                      <label className="flex mb-3 items-center text-lg">
                        <input type="checkbox" />
                        <span className="ml-2">Standard</span>
                      </label>
                      <label className="flex items-center text-lg">
                        <input type="checkbox" />
                        <span className="ml-2">Next day (yes!)</span>
                      </label>
                    </div>
                    <div className="mb-6 py-10 px-12 bg-white">
                      <h3 className="mb-6 text-2xl font-bold font-heading">
                        Location
                      </h3>
                      <input
                        className="w-full px-8 py-4 bg-white border rounded-md"
                        type="search"
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-3/4 px-3">
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719305173/camera/Sony%20ZV-E10/1dd837f6-7392-4716-bef7-eb387644ed76.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-8 lg:w-1/4">
                        <div className="p-3 bg-white h-full rounded-md">
                          <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                            -15%
                          </span>
                          <a className="block mt-2 mb-2" href="#">
                            <img
                              className="mx-auto w-full object-contain"
                              src="https://res.cloudinary.com/dwywbuukd/image/upload/v1719307544/camera/Sony%20ZV-E1/f8bc95b0-d67d-4e21-90e1-9ed2d6db1e7a.png"
                              alt=""
                            />
                            <div className="text-left ml-2">
                              <h3 className="mb-2 text-xl font-bold font-heading">
                                Sony ZV-E10
                              </h3>
                              <p className="text-lg font-bold font-heading text-blue-500">
                                <span>$29.89 </span>
                                <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                                  $33.69
                                </span>
                              </p>
                              <div>
                                <span className="text-yellow-400 text-sm">
                                  ★★★★★
                                </span>
                              </div>
                            </div>
                          </a>
                          <a
                            className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                            href="#"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="5"
                                width="2"
                                height="12"
                                fill="#161616"
                              />
                              <rect
                                x="12"
                                y="5"
                                width="2"
                                height="12"
                                transform="rotate(90 12 5)"
                                fill="#161616"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
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
export default ShopPage;
