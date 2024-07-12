import PropTypes from "prop-types";

const BrandLogo = ({ src, alt, className }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`shrink-0 self-stretch my-auto max-w-full ${className}`}
    />
  );
};

BrandLogo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default BrandLogo;
