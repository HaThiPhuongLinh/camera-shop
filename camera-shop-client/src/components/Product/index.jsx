import ProductCard from "./ProductCard";

const products = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2f6ce8bf476d14cdce89d6cab80979a6685993ac3b4e64eb9e02b34a4e96db49?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    isHot: true,
    productName: "Sony ZV-E10",
    price: "$950",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1fa7fdf3826f61ec206571949c7fe319621c5addd29f67161b979502c40bfe07?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2f6ce8bf476d14cdce89d6cab80979a6685993ac3b4e64eb9e02b34a4e96db49?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    isHot: true,
    productName: "Sony ZV-E10",
    price: "$950",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d7f56963a397843c4875e5a6524553dbe058ecd73decc0672f8c09e2d3eb94ee?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2f6ce8bf476d14cdce89d6cab80979a6685993ac3b4e64eb9e02b34a4e96db49?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    isHot: true,
    productName: "Sony ZV-E10",
    price: "$950",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d7f56963a397843c4875e5a6524553dbe058ecd73decc0672f8c09e2d3eb94ee?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2f6ce8bf476d14cdce89d6cab80979a6685993ac3b4e64eb9e02b34a4e96db49?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
    isHot: true,
    productName: "Sony ZV-E10",
    price: "$950",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d7f56963a397843c4875e5a6524553dbe058ecd73decc0672f8c09e2d3eb94ee?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
];

const ProductSection = () => {
  return (
    <div>
      <h3 className="self-center text-3xl font-semibold tracking-widest text-white">
        PRODUCTS
      </h3>
      <div className="mt-12 max-md:mt-10 max-md:max-w-full">
        <section className="flex gap-5 max-md:flex-col max-md:gap-0">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col w-[33%] max-md:ml-0 max-md:w-full ${
                index > 0 ? "ml-5" : ""
              }`}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductSection;
