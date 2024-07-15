import BrandLogo from "./BrandLogo";
import { useEffect, useState } from 'react';
import brandApi from './../../api/brandApi';

const BrandSection = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await brandApi.getAllBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="flex flex-col w-full max-md:max-w-full">
      <h2 className="w-full text-3xl font-semibold tracking-widest text-white max-md:max-w-full text-left">
        Brands
      </h2>
      <div className="flex gap-5 justify-between items-center self-end pr-20 mt-10 max-w-full w-[1135px] max-md:flex-wrap max-md:pr-5">
        {brands.map((brand, index) => (
          <BrandLogo key={index} src={brand.image} />
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
