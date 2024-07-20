import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ imageSrc, isHot, productName, price }) => {
  return (
    <article className="flex flex-col grow text-white max-md:mt-10">
      <div className="flex overflow-hidden relative flex-col items-start px-3.5 pt-5 pb-20 w-full text-xl font-semibold tracking-wider whitespace-nowrap aspect-[0.97] max-md:pr-5">
        <Link to={`/camera/${productName.toLowerCase().replace(/\s+/g, "-")}`}>
          <img
            loading="lazy"
            src={imageSrc}
            alt={productName}
            className="object-contain absolute inset-0 rounded-md"
          />
        </Link>
        {isHot && (
          <div className="flex relative flex-col justify-center mb-40 max-w-full w-[70px] max-md:mb-10">
            <div className="flex flex-col justify-center rounded-md">
              <div className="justify-center items-start px-2 py-2 bg-red-600 rounded-xl max-md:px-5">
                HOT
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-5 justify-between mt-2">
        <div className="flex flex-col text-left">
          <h2 className="text-xl font-medium tracking-wider">{productName}</h2>
          <p className="mt-2 text-lg font-semibold tracking-wider">${price}</p>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1fa7fdf3826f61ec206571949c7fe319621c5addd29f67161b979502c40bfe07?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
          alt=""
          className="shrink-0 self-start w-9 aspect-square hover:cursor-pointer hover:border hover:border-red-700"
        />
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  isHot: PropTypes.bool,
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
