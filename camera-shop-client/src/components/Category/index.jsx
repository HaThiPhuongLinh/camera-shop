import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import categoryApi from "./../../api/categoryApi";
import Loading from "./../Header/Loading";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryApi.getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleNext = () => {
    if (startIndex + 4 < categories.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const handlePrev = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex(startIndex - 4);
    }
  };

  const visibleCategories = categories.slice(startIndex, startIndex + 4);

  return (
    <section className="flex flex-col mt-14 w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 w-full text-3xl font-semibold tracking-widest text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <h2 className="flex-auto my-auto text-left">Categories</h2>
      </div>
      {visibleCategories.length === 0 ? (
        <Loading />
      ) : (
        <div className="self-center px-5 mt-8 w-full max-w-[1205px] max-md:max-w-full">
          <div className="flex gap-4 max-md:flex-col max-md:gap-0">
            {visibleCategories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col w-[25%] max-md:ml-0 max-md:w-full 
              }`}
              >
                <CategoryCard
                  key={category.id}
                  title={category.categoryName}
                  imageSrc={category.image}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between mt-5">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300 ${
            startIndex !== 0 ? "hover:bg-gray-600" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + 4 >= categories.length}
          className={`px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300 ${
            startIndex + 4 < categories.length ? "hover:bg-gray-600" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
