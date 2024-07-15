import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import variantApi from "./../../api/variantApi";

const ProductSection = () => {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const fetchedVariants = await variantApi.getVariantsByHotCameras();
        setVariants(fetchedVariants.slice(0, 4));
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchVariants();
  }, []);

  return (
    <div>
      <h3 className="self-center text-3xl font-semibold tracking-widest text-white">
        PRODUCTS
      </h3>
      <div className="mt-12 max-md:mt-10 max-md:max-w-full">
        <section className="flex gap-5 max-md:flex-col max-md:gap-0 rounded-md">
          {variants.map((variant, index) => (
            <div
              key={index}
              className={`flex flex-col w-[33%] max-md:ml-0 max-md:w-full ${
                index > 0 ? "ml-5" : ""
              }`}
            >
              <ProductCard
                imageSrc={variant.images[0]}
                isHot={variant.camera.hot}
                productName={variant.camera.name}
                price={variant.price}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductSection;
