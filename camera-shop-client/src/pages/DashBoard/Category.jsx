import { useState, useEffect } from "react";
import categoryApi from "../../api/categoryApi";
import { getActive } from "../../helpers";
import AddCategoryModal from "./Modal/AddCategoryBrand";
import EditCategoryModal from "./Modal/EditCategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    fetchCategories();
  };

  const handleOpenUpdateModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCategoryId(null);
    fetchCategories();
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Categories</strong>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Category
        </button>
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border-b border-gray-300">ID</th>
            <th className="px-4 py-2 border-b border-gray-300">
              Category Name
            </th>
            <th className="px-4 py-2 border-b border-gray-300">Image</th>
            <th className="px-4 py-2 border-b border-gray-300">Code</th>
            <th className="px-4 py-2 border-b border-gray-300">Active</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-100 text-sm">
              <td className="px-4 py-3 border-b border-gray-300">
                {category.id}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {category.categoryName}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {/* Display image */}
                <img
                  src={category.image}
                  alt={category.categoryName}
                  width="90"
                />
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {category.code}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {getActive(category.active)}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenUpdateModal(category.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
      />
      <EditCategoryModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleCloseUpdateModal}
        categoryId={selectedCategoryId}
      />
    </div>
  );
}
