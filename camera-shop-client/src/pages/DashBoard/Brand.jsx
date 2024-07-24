import { useState, useEffect } from "react";
import brandApi from "../../api/brandApi";
import { getActive } from "../../helpers";
import AddBrandModal from "./Modal/AddBrandModal";
import EditBrandModal from "./Modal/EditBrandModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await brandApi.getAllBrands();
      setBrands(response);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await brandApi.deleteBrand(id);
      fetchBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    fetchBrands();
  };

  const handleOpenUpdateModal = (brandId) => {
    setSelectedBrandId(brandId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBrandId(null);
    fetchBrands();
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Brands</strong>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Brand
        </button>
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-2 py-2 border-b border-gray-300">ID</th>
            <th className="px-2 py-2 border-b border-gray-300">Brand Name</th>
            <th className="px-2 py-2 border-b border-gray-300">Code</th>
            <th className="px-2 py-2 border-b border-gray-300">Active</th>
            <th className="px-2 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-100 text-sm">
              <td className="px-4 py-3 border-b border-gray-300">{brand.id}</td>
              <td className="px-4 py-3 border-b border-gray-300">
                {brand.brandName}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {brand.code}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {getActive(brand.active)}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenUpdateModal(brand.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(brand.id)}
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
      <AddBrandModal
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
      />
      <EditBrandModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleCloseUpdateModal}
        brandId={selectedBrandId}
      />
    </div>
  );
}
