import { useState } from "react";

const SocialIcon = ({ src, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <img
        loading="lazy"
        src={src}
        alt="Social Icon"
        className="shrink-0 aspect-square w-[26px] cursor-pointer hover:opacity-75"
        onClick={toggleDropdown}
      />
      {isOpen && index === 2 && (
        <div className="absolute z-10 right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Orders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Account
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
