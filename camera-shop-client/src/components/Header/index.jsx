import NavItem from "./NavItem";
import SocialIcon from "./SocialIcon";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ menuItems, socialIcons }) => {
  return (
    <header>
        <div className="flex justify-between items-center max-md:flex-wrap">
        <Link
            to="/"
            className="flex gap-3 items-center justify-between self-stretch pr-5 text-3xl font-bold tracking-widest text-black uppercase whitespace-nowrap hover:opacity-75"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/78929a0630538ba906f6374e1027d55b97722b68b43f927528eec437f33bf402?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
              alt="EYESEE logo"
              className="shrink-0 aspect-square w-[52px]"
            />
            <div>EYESEE</div>
          </Link>
          <div className="flex gap-14 justify-between self-stretch pr-5 my-auto">
            {menuItems.map((item, index) => (
              <NavItem key={index} label={item.label} link={item.link} />
            ))}
          </div>
          <div className="flex flex-col justify-center self-stretch my-auto">
            <div className="flex gap-7 justify-between px-5">
              {socialIcons.map((src, index) => (
                <SocialIcon key={index} src={src} index={index}/>
              ))}
            </div>
          </div>
        </div>
    </header>
  );
};

Header.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  socialIcons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
