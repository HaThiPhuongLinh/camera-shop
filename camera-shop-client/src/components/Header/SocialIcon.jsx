import PropTypes from "prop-types";

const SocialIcon = ({ src }) => (
  <img
    loading="lazy"
    src={src}
    alt=""
    className="shrink-0 aspect-square w-[26px] cursor-pointer hover:opacity-75"
  />
);

SocialIcon.propTypes = {
  src: PropTypes.string.isRequired,
};

export default SocialIcon;
