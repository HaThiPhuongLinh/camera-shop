const BlogPage = () => {
  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-[#2E2F31] rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="relative py-10 overflow-hidden">
              <div className="relative container px-4 mx-auto max-w-xl lg:max-w-7xl">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                  <h1 className="font-heading text-5xl xs:text-6xl md:text-7xl font-bold">
                    <span>News &</span>
                    <span className="font-serif italic">Articles</span>
                  </h1>
                </div>
                <div className="flex flex-wrap -mx-4 mb-18 text-left">
                  {/* Large article */}
                  <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                    <a className="block group w-full" href="#">
                      <img
                        className="block w-full mb-5 rounded-md"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <span className="block text-gray-500 mb-5">
                        Jul 20, 2022
                      </span>
                      <h4 className="text-3xl font-semibold text-gray-900 group-hover:text-orange-900 mb-5">
                        Consectures Dummy Content Velit officia consequat duis
                        enim velit
                      </h4>
                      <p className="max-w-xl text-lg text-gray-500">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit mollit xercitation veniam consequat sunt nostrud
                        amet.
                      </p>
                    </a>
                  </div>

                  {/* Small articles */}
                  <div className="w-full lg:w-1/2 px-4 text-left">
                    <a className="md:flex group mb-8" href="#">
                      <img
                        className="w-48 h-40 object-cover rounded-md"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <div className="mt-4 md:mt-0 md:ml-6 pt-2">
                        <span className="block text-gray-500 mb-2">
                          Jul 20, 2022
                        </span>
                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900">
                          Consectures Content Velitpato officia consequat duis
                          enim velit mollit
                        </h4>
                      </div>
                    </a>

                    <a className="md:flex group mb-8" href="#">
                      <img
                        className="w-48 h-40 object-cover rounded-md"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <div className="mt-4 md:mt-0 md:ml-6 pt-2">
                        <span className="block text-gray-500 mb-2">
                          Jul 20, 2022
                        </span>
                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900">
                          Consectures Content Velitpato officia consequat duis
                          enim velit mollit
                        </h4>
                      </div>
                    </a>
                    <a className="md:flex group mb-8" href="#">
                      <img
                        className="w-48 h-40 object-cover rounded-md"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <div className="mt-4 md:mt-0 md:ml-6 pt-2">
                        <span className="block text-gray-500 mb-2">
                          Jul 20, 2022
                        </span>
                        <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900">
                          Consectures Content Velitpato officia consequat duis
                          enim velit mollit
                        </h4>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Hidden content */}
                <div className="visibility-item flex flex-wrap -mx-4 -mb-8">
                  <div className="w-full md:w-1/2 xl:w-1/4 px-4 mb-12 border-r border-gray-100">
                    <a className="block px-4 group" href="#">
                      <img
                        className="block w-full h-40 mb-4 object-cover rounded-lg"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <span className="block text-gray-500 mb-2">
                        Jul 20, 2022
                      </span>
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900 mb-4">
                        Consectures Content Velit officia consequat duis enim
                        velit mollit
                      </h4>
                      <p className="text-gray-500">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit...
                      </p>
                    </a>
                  </div>

                  <div className="w-full md:w-1/2 xl:w-1/4 px-4 mb-12 xl:border-r border-gray-100">
                    <a className="block px-4 group" href="#">
                      <img
                        className="block w-full h-40 mb-4 object-cover rounded-lg"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <span className="block text-gray-500 mb-2">
                        Jul 20, 2022
                      </span>
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900 mb-4">
                        Consectures Content Velit officia consequat duis enim
                        velit mollit
                      </h4>
                      <p className="text-gray-500">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit...
                      </p>
                    </a>
                  </div>

                  <div className="w-full md:w-1/2 xl:w-1/4 px-4 mb-12 border-r border-gray-100">
                    <a className="block px-4 group" href="#">
                      <img
                        className="block w-full h-40 mb-4 object-cover rounded-lg"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <span className="block text-gray-500 mb-2">
                        Jul 20, 2022
                      </span>
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900 mb-4">
                        Consectures Content Velit officia consequat duis enim
                        velit mollit
                      </h4>
                      <p className="text-gray-500">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit...
                      </p>
                    </a>
                  </div>

                  <div className="w-full md:w-1/2 xl:w-1/4 px-4 mb-12">
                    <a className="block px-4 group" href="#">
                      <img
                        className="block w-full h-40 mb-4 object-cover rounded-lg"
                        src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
                        alt=""
                      />
                      <span className="block text-gray-500 mb-2">
                        Jul 20, 2022
                      </span>
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900 mb-4">
                        Consectures Content Velit officia consequat duis enim
                        velit mollit
                      </h4>
                      <p className="text-gray-500">
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Velit officia consequat duis enim
                        velit...
                      </p>
                    </a>
                  </div>
                </div>

                {/* See More Articles button */}
                <div className="text-center">
                  <a
                    className="relative group inline-block py-4 px-7 font-semibold text-orange-900 hover:text-orange-50 rounded-full bg-orange-50 transition duration-300 overflow-hidden"
                    href="#"
                    onClick={() => {}}
                  >
                    <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                    <span className="relative">See More Articles</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default BlogPage;
``;
