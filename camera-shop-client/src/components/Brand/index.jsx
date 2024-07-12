import BrandLogo from "./BrandLogo";

const brands = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51f064dc5e199ed73f6b171fb39a776c80e03b71d00a0255fd6061c13fb86f37?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    alt: "Brand 1 logo",
    className: "aspect-[5.88] w-[129px]",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5d87491a560e0b701763a6369495a751e0d7baa83af9714e7edf3a54f2599bb8?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    alt: "Brand 2 logo",
    className: "aspect-[6.67] w-[156px]",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2232c6d51a82fc5b22f39e8e7bcd7afcd7f694918ab45ca6c14a72a7745ef043?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    alt: "Brand 3 logo",
    className: "aspect-[4.76] w-[130px]",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4255551b1db9bd9f2aca1a464640b124084aa7d7b6d2b23da0c4a633cebd0919?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    alt: "Brand 4 logo",
    className: "aspect-[5.56] w-[134px]",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/66c23dacb996a6fd02c53c8a4b9a61e456290258b8d99f22d8c84bffc4768d7f?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    alt: "Brand 5 logo",
    className: "aspect-[3.85] w-[125px] fill-white",
  },
];

const BrandSection = () => {
  return (
    <section className="flex flex-col w-full max-md:max-w-full">
      <h2 className="w-full text-3xl font-semibold tracking-widest text-white max-md:max-w-full text-left">
        Brands
      </h2>
      <div className="flex gap-5 justify-between items-center self-end pr-20 mt-10 max-w-full w-[1135px] max-md:flex-wrap max-md:pr-5">
        {brands.map((brand, index) => (
          <BrandLogo key={index} {...brand} />
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
