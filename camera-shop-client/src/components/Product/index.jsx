import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import cameraApi from "./../../api/cameraApi";

const ProductSection = () => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const fetchCameras = await cameraApi.getHotCameras();
        console.log(fetchCameras);
        setCameras(fetchCameras.slice(0, 4));
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchCameras();
  }, []);

  const getPrimaryImage = (variants) => {
    return variants.length > 0 ? variants[0].images[0] : "";
  };

  const getLowestPrice = (variants) => {
    return variants.reduce(
      (lowest, variant) => (variant.price < lowest ? variant.price : lowest),
      variants[0].price
    );
  };

  return (
    <div>
      <h3 className="self-center text-3xl font-semibold tracking-widest text-white">
        PRODUCTS
      </h3>
      <div className="mt-12 max-md:mt-10 max-md:max-w-full">
        <section className="flex gap-5 max-md:flex-col max-md:gap-0 rounded-md">
          {cameras.map((camera, index) => (
            <div
              key={index}
              className={`flex flex-col w-[33%] max-md:ml-0 max-md:w-full ${
                index > 0 ? "ml-5" : ""
              }`}
            >
              <ProductCard
                imageSrc={getPrimaryImage(camera.variants)}
                isHot={camera.hot}
                productName={camera.name}
                price={(
                  getLowestPrice(camera.variants) *
                  (1 -
                    Math.max(
                      ...camera.variants.map((variant) => variant.discount)
                    ) /
                      100)
                ).toFixed(2)}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductSection;
