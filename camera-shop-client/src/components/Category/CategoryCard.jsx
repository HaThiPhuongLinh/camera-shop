import PropTypes from "prop-types";

const CategoryCard = ({ title, imageSrc }) => {
  return (
    <div className="flex flex-col grow justify-center text-base font-semibold tracking-wider text-black max-md:mt-10">
      <div className="flex overflow-hidden relative flex-col px-6 pt-20 pb-4 w-full max-md:px-5 h-full"> 
        <img
          loading="lazy"
          src={imageSrc}
          alt={`${title} category`}
          className="object-cover absolute inset-0 size-full rounded-sm" 
        />
        <div className="flex relative flex-col justify-center mt-56 max-md:mt-10">
          <div className="flex gap-5 py-2 pr-4 pl-2 bg-white rounded-xl max-md:pr-5 hover:cursor-pointer hover:bg-red-500">
            <div className="flex-auto my-auto text-ellipsis overflow-hidden whitespace-nowrap">{title}</div> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 my-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default CategoryCard;