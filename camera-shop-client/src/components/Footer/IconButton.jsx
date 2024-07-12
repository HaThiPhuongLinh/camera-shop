import PropTypes from "prop-types";

const IconButton = ({ src, alt, className }) => (
  <button className="flex justify-center items-center p-4 border border-black border-solid rounded-[50px]">
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`fill-black ${className}`}
    />
  </button>
);

IconButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default IconButton;
