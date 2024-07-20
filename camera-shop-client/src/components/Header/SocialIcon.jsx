import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./../../hooks/authStore";
import userApi from "../../api/userApi";

const SocialIcon = ({ src, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const logout = useAuthStore((state) => state.logout);
  const userId = useAuthStore((state) => state.userId);
  const totalItems = useAuthStore((state) => state.totalItems);

  useEffect(() => {
    if (userId) {
      userApi
        .getUserById(userId)
        .then((response) => {
          setUserData(response);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    } else {
      setUserData(null);
    }
  }, [userId]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/signin");
  };

  const handleClick = () => {
    if (index === 2 && !userId) {
      navigate("/signin");
    } else if(index === 1) {
      navigate("/cart");
    }
    else {
      toggleDropdown();
    }
  };

  return (
    <div className="relative">
      <img
        loading="lazy"
        src={src}
        alt="Social Icon"
        className="shrink-0 aspect-square w-[26px] cursor-pointer hover:opacity-75"
        onClick={handleClick}
      />
      {index === 1 && totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {totalItems}
        </span>
      )}
      {isOpen && index === 2 && userId && (
        <div className="absolute z-10 right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-sm text-gray-900 ">
            {userData && <div>{userData.fullName}</div>}
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Account
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialIcon;
