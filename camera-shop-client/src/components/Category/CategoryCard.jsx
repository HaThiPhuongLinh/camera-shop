import PropTypes from "prop-types";

const CategoryCard = ({ title, imageSrc }) => {
  return (
    <div className="flex flex-col grow justify-center text-xl font-semibold tracking-wider text-black max-md:mt-10">
      <div className="flex overflow-hidden relative flex-col px-6 pt-20 pb-4 w-full max-md:px-5">
        <img
          loading="lazy"
          src={imageSrc}
          alt={`${title} category`}
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col justify-center mt-56 max-md:mt-10">
          <div className="flex gap-5 py-3.5 pr-7 pl-3 bg-white rounded-xl max-md:pr-5">
            <div className="flex-auto my-auto">{title}</div>
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
