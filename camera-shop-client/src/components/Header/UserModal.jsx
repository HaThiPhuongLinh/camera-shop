import { useState } from "react";
import userApi from "../../api/userApi";
import {
  isValidFullName,
  isValidEmail,
  isValidPhone,
  isValidAddress,
} from "../../utils/Validate";
import useAuthStore from "./../../hooks/authStore";

const UserModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    dateOfBirth: user.dateOfBirth.split("-"),
  });

  const userId = useAuthStore((state) => state.userId);
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "fullName")
      setFormErrors({ ...formErrors, fullName: !isValidFullName(value) });
    if (name === "email")
      setFormErrors({ ...formErrors, email: !isValidEmail(value) });
    if (name === "phone")
      setFormErrors({ ...formErrors, phone: !isValidPhone(value) });
    if (name === "address")
      setFormErrors({ ...formErrors, address: !isValidAddress(value) });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedDate = [...formData.dateOfBirth];
    if (name === "day") updatedDate[2] = value;
    if (name === "month") updatedDate[1] = value;
    if (name === "year") updatedDate[0] = value;
    setFormData({ ...formData, dateOfBirth: updatedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      fullName: !isValidFullName(formData.fullName),
      email: !isValidEmail(formData.email),
      phone: !isValidPhone(formData.phone),
      address: !isValidAddress(formData.address),
    };

    setFormErrors(errors);

    const isFormChanged =
      formData.fullName !== user.fullName ||
      formData.email !== user.email ||
      formData.phone !== user.phone ||
      formData.address !== user.address ||
      formData.dateOfBirth.join("-") !== user.dateOfBirth;

    if (!Object.values(errors).includes(true) && isFormChanged) {
      userApi
        .updateUser(userId, {
          ...formData,
          dateOfBirth: formData.dateOfBirth.join("-"),
        })
        .then(() => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            onClose();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full text-left">
        <h2 className="text-3xl mb-4 text-center font-semibold">
          Update Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full border ${
                formErrors.fullName ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              Full name must be at least 2 words, with the first letter of each
              word capitalized.
            </p>
          </div>
          <div className="mb-2">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              e.g., example@email.com
            </p>
          </div>
          <div className="mb-2">
            <label className="block text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full border ${
                formErrors.phone ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              Phone number must start with 0 and have 10 or 11 digits.
            </p>
          </div>
          <div className="mb-2">
            <label className="block text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full border ${
                formErrors.address ? "border-red-500" : "border-gray-300"
              } p-2 rounded`}
              required
            />
            <p className="text-gray-500 text-xs mt-1">
              Address must contain numbers, letters, and spaces.
            </p>
          </div>
          <div className="mb-2">
            <label className="block text-sm">Date of Birth</label>
            <div className="flex gap-2">
              <select
                name="day"
                value={formData.dateOfBirth[2]}
                onChange={handleDateChange}
                className="w-full border p-2 rounded"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={formData.dateOfBirth[1]}
                onChange={handleDateChange}
                className="w-full border p-2 rounded"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={formData.dateOfBirth[0]}
                onChange={handleDateChange}
                className="w-full border p-2 rounded"
              >
                {Array.from({ length: 62 }, (_, i) => (
                  <option key={1945 + i} value={1945 + i}>
                    {1945 + i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg text-center">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 block mx-auto mb-3"
            >
              <g data-name="Layer 28">
                <path
                  d="M16 31a15 15 0 1 1 15-15 15 15 0 0 1-15 15Zm0-28a13 13 0 1 0 13 13A13 13 0 0 0 16 3Z"
                  fill="#4ea359"
                  className="fill-101820 "
                ></path>
                <path
                  d="M13.67 22a1 1 0 0 1-.73-.32l-4.67-5a1 1 0 0 1 1.46-1.36l3.94 4.21 8.6-9.21a1 1 0 1 1 1.46 1.36l-9.33 10a1 1 0 0 1-.73.32Z"
                  fill="#4ea359"
                  className="fill-101820 "
                ></path>
              </g>
            </svg>
            <p className="text-lg font-semibold text-gray-800 mb-4 max-w-sm mx-auto">
              Update successful!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModal;
