import PropTypes from "prop-types";

const BrandLogo = ({ src }) => {
  return (
    <img
      src={src}
      className={`shrink-0 self-stretch my-auto max-w-full w-[129px]`}
    />
  );
};

BrandLogo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default BrandLogo;
