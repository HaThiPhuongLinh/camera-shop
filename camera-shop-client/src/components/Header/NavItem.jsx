import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ label, link, onClick }) => (
  <NavLink
    to={link}
    className={({ isActive }) =>
      `text-base tracking-wider uppercase ${
        isActive ? "text-red-800 font-bold rounded-md" : "text-black font-normal"
      } hover:bg-gray-100 hover:rounded-md p-2`
    }
    onClick={onClick}
  >
    {label}
  </NavLink>
);

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NavItem;
