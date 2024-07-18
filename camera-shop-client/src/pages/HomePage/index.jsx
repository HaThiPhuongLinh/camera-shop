import BrandSection from "../../components/Brand";
import ProductSection from "../../components/Product";
import CategorySection from "../../components/Category/index";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-20 border border-black border-solid shadow-sm bg-zinc-800 rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch px-10 pt-14 pb-8 bg-[#dfdfdf] rounded-[90px] max-md:px-5 max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f81e0101ec3ca0114e69dbd748db8033ae38ddcc4fbf73b7e34ffc161f57f4b?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
              alt="Main content image"
              className="mt-10 w-full aspect-[2.17] max-md:mt-10 max-md:mr-1.5 max-md:max-w-full"
            />
          </div>
          <div className="mt-16 w-full max-w-[1325px] max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-20 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full ml-5">
                <h2 className="text-6xl font-black tracking-tighter text-white leading-[65.28px] max-md:mt-10 max-md:text-4xl text-left">
                  PHOTO OF THE DAY BY LEICA
                </h2>
              </div>
              <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
                <p className="mt-3 text-4xl text-white font-[350] leading-[70px] max-md:mt-10 max-md:max-w-full text-left">
                  Exchange tips, swap stories, and celebrate the art of
                  photography in its purest form.
                </p>
              </div>
            </div>
          </div>
          <div className="self-stretch mx-11 mt-4 max-md:mr-2.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d4f15cda9276cc304f73e74cb972a267e447d85f7acc8e3da33d48202c8e31e?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
                  className="grow w-full shadow-md aspect-[1.33] max-md:mt-10 max-md:max-w-full"
                  alt="Featured photograph"
                />
              </div>
              <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad0be5992188688b3c68fc44ef8dff66913d92ba1608b6f23c6c5ba4d019dc66?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
                  className="z-10 grow w-full aspect-[2.08] max-md:mt-10 max-md:max-w-full"
                  alt="Secondary photograph"
                />
              </div>
            </div>
          </div>
          <section className="self-stretch mx-11 mt-4 max-md:mr-2.5 max-md:max-w-full">
            <BrandSection />
            <CategorySection />
          </section>
          <section className="flex flex-col py-px mt-7 w-full max-w-[1204px] max-md:max-w-full">
            <ProductSection />
            <button className="self-center w-1/6 max-md:w-1/3 flex justify-center p-2 mt-10 text-base font-semibold tracking-wider text-white border-2 border-white border-solid shadow-sm max-md:px-5 max-md:mt-10 hover:bg-gray-700">
              <Link to="/camera">SHOP ALL </Link>
            </button>
          </section>
          <section className="flex flex-col justify-center self-center mt-16 mb-2 w-full max-w-[1204px] max-md:mt-10 max-md:max-w-full">
            <div className="pr-16 rounded-lg bg-zinc-900 max-md:pr-5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/76028201e2a0f2374229831867c23222000b12ae437f52756a13e3a429476528?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
                    className="grow w-full max-md:max-w-full"
                    alt="New arrivals showcase"
                  />
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col justify-center self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
                    <h4 className="text-lg font-medium tracking-wider max-md:max-w-full">
                      NEW ARRIVALS
                    </h4>
                    <h2 className="mt-10 text-4xl font-semibold tracking-wider max-md:mt-10 max-md:max-w-full">
                      Discover the Latest Cameras
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </nav>
      </header>
    </div>
  );
};

export default HomePage;
