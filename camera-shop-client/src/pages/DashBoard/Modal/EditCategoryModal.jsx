import { useState, useEffect } from "react";
import categoryApi from "../../../api/categoryApi"; 
import Modal from "react-modal";

Modal.setAppElement("#root");

const EditCategoryModal = ({ isOpen, onRequestClose, categoryId }) => {
  const [initialCategory, setInitialCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryApi.getCategoryById(categoryId);
        setCategory(response);
        setInitialCategory(response);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({ ...prevState, [name]: Number(value) }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: Number(value) === 0,
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
    if (
      JSON.stringify(category) !== JSON.stringify(initialCategory) &&
      !Object.values(errors).includes(true)
    ) {
      try {
        await categoryApi.updateCategory(categoryId, category);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
    onRequestClose();
  };

  if (!category) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Category"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-bold mb-1">Category Name</label>
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
          </div>
          <div>
            <label className="block font-bold mb-1">Image URL</label>
            <img
                  src={category.image}
          
                  className="w-20 h-20 object-contain border rounded bg-slate-700 p-2"
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
          </div>
          <div>
            <label className="block font-bold mb-1">Code</label>
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
          <select
            name="active"
            value={category.active ? 1 : 0}
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

export default EditCategoryModal;