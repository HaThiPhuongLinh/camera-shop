import { useState, useEffect } from "react";
import brandApi from "../../../api/brandApi";
import Modal from "react-modal";

const EditBrandModal = ({ isOpen, onRequestClose, brandId }) => {
  const [initialBrand, setInitialBrand] = useState(null);
  const [brand, setBrand] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await brandApi.getBrandById(brandId);
        setBrand(response);
        setInitialBrand(response);
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    if (brandId) {
      fetchBrand();
    }
  }, [brandId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setBrand((prevState) => ({ ...prevState, [name]: Number(value) }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: Number(value) === 0,
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
    if (
      JSON.stringify(brand) !== JSON.stringify(initialBrand) &&
      !Object.values(errors).includes(true)
    ) {
      try {
        await brandApi.updateBrand(brandId, brand);
      } catch (error) {
        console.error("Error updating brand:", error);
      }
    }
    onRequestClose();
  };

  if (!brand) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Brand"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Update Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-bold mb-1">Brand Name</label>
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
          </div>
          <div>
            <label className="block font-bold mb-1">Image URL</label>
            <img
                  src={brand.image}
          
                  className="w-20 h-20 object-contain border rounded bg-slate-700 p-2"
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
          </div>
          <div>
            <label className="block font-bold mb-1">Code</label>
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
          <select
            name="active"
            value={brand.active ? 1 : 0}
            onChange={handleSelectChange}
            className="w-1/5 px-4 py-2 border rounded"
          >
            <option value={1}>Active</option>
            <option value={0}>InActive</option>
          </select>
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

export default EditBrandModal;
