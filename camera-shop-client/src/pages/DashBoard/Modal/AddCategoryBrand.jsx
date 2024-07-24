import { useState } from "react";
import Modal from "react-modal";
import categoryApi from './../../../api/categoryApi'; 

Modal.setAppElement("#root");

const AddCategoryModal = ({ isOpen, onRequestClose }) => {
  const [category, setCategory] = useState({
    categoryName: "",
    image: "",
    code: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      categoryName: !category.categoryName.trim(),
      image: !category.image.trim(),
      code: !category.code.trim(),
    };
    setFormErrors(errors);
    if (!Object.values(errors).includes(true)) {
      try {
        await categoryApi.addCategory(category);
        onRequestClose();
        setCategory({ 
            categoryName: "",
            image: "",
            code: "",
        });
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Category"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="categoryName"
            value={category.categoryName}
            onChange={handleInputChange}
            placeholder="Category Name"
            className={`px-4 py-2 border rounded w-full ${
              formErrors.categoryName ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            name="image"
            value={category.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className={`px-4 py-2 border rounded w-full ${
              formErrors.image ? "border-red-500" : ""
            }`}
          />

          <input
            type="text"
            name="code"
            value={category.code}
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

export default AddCategoryModal;