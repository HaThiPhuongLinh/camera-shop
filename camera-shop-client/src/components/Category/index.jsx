import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Selfie & Travel",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/79318274d18e4ddafb29fe32f73c7c05a029274ce0a7340750a8e67a5a1bc8ec?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
  {
    title: "Landscape & Travel",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4778807b9c9b61b36559ad9ce9a571db4e78c3b8a1818929f34885eb6e06cfe2?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
  {
    title: "Professional & Sports",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e891af45fbc81c6992b976234ca053b1c45d664bfb03c08466acacd5dbc555ca?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&",
  },
];

const CategorySection = () => {
  return (
    <section className="flex flex-col mt-14 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 w-full text-3xl font-semibold tracking-widest text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <h2 className="flex-auto my-auto text-left">Categories</h2>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf119bc4b71007ef6cd81578968dd9c3277ee27cd2f6ca9222a96c6dafd50dd4?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
          alt=""
          className="shrink-0 max-w-full aspect-[1.82] w-[106px]"
        />
      </div>
      <div className="self-center px-5 mt-8 w-full max-w-[1206px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {categories.map((category, index) => (
            <div
            key={index}
            className={`flex flex-col w-[33%] max-md:ml-0 max-md:w-full ${
              index > 0 ? "ml-5" : ""
            }`}
          >
            <CategoryCard key={index} {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
