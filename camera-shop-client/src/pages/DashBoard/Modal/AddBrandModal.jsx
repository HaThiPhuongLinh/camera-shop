import { useState } from "react";
import brandApi from "../../../api/brandApi";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddBrandModal = ({ isOpen, onRequestClose }) => {
  const [brand, setBrand] = useState({
    brandName: "",
    image: "",
    code: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      brandName: !brand.brandName.trim(),
      image: !brand.image.trim(),
      code: !brand.code.trim(),
    };
    setFormErrors(errors);
    if (!Object.values(errors).includes(true)) {
      try {
        await brandApi.addBrand(brand);
        onRequestClose();
        setBrand({ 
            brandName: "",
            image: "",
            code: "",
        });
      } catch (error) {
        console.error("Error adding brand:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Brand"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="brandName"
            value={brand.brandName}
            onChange={handleInputChange}
            placeholder="Brand Name"
            className={`px-4 py-2 border rounded w-full ${
              formErrors.brandName ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            name="image"
            value={brand.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className={`px-4 py-2 border rounded w-full ${
              formErrors.image ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            name="code"
            value={brand.code}
            onChange={handleInputChange}
            placeholder="Code"
            className={`px-4 py-2 border rounded w-full ${
              formErrors.code ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-3 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBrandModal;
