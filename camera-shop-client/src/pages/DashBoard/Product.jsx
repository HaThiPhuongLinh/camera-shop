import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import cameraApi from "../../api/cameraApi";
import brandApi from "../../api/brandApi";
import categoryApi from "../../api/categoryApi";
import featureApi from "../../api/featureApi";
import AddCameraModal from "./Modal/AddCameraModal";
import EditCameraModal from "./Modal/EditCameraModal ";
import { getActive } from "../../helpers";

Modal.setAppElement("#root");

export default function Products() {
  const [cameras, setCameras] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const cameraRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cameraData, setCameraData] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const fetchCameras = async () => {
    try {
      const response = await cameraApi.getAllCameras();
      setCameras(response);
    } catch (error) {
      console.error("Error fetching cameras:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await brandApi.getAllBrands();
      setBrands(response);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await featureApi.getAllFeatures();
      setFeatures(response);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  useEffect(() => {
    fetchCameras();
    fetchBrands();
    fetchCategories();
    fetchFeatures();
  }, []);

  const handleDeleteCamera = async (id) => {
    try {
      await cameraApi.deleteCamera(id);
      fetchCameras();
    } catch (error) {
      console.error("Error deleting camera:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchCameras();
  };

  const openEditModal = (camera) => {
    setCameraData(camera);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    fetchCameras();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Cameras</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={openModal}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Camera
          </button>
        </div>
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-2 py-2 border-b border-gray-300">ID</th>
            <th className="px-2 py-2 border-b border-gray-300">Name</th>
            <th className="px-2 py-2 border-b border-gray-300">Brand Name</th>
            <th className="px-2 py-2 border-b border-gray-300">
              Category Name
            </th>
            <th className="px-2 py-2 border-b border-gray-300">
              Warranty Period
            </th>
            <th className="px-2 py-2 border-b border-gray-300">Active</th>
            <th className="px-2 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {cameras
            .filter((camera) => {
              if (camera.name) {
                return camera.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              } else {
                return false;
              }
            })
            .map((camera) => (
              <tr
                key={camera.id}
                className="hover:bg-gray-100 text-sm"
                ref={(el) => (cameraRefs.current[camera.id] = el)}
              >
                <td className="px-4 py-3 border-b border-gray-300">
                  {camera.id}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {camera.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {camera.brand.brandName}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {camera.category.categoryName}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {camera.warrantyPeriod + " months"}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {getActive(camera.active)}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(camera)}
                      className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteCamera(camera.id)}
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
      <AddCameraModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        brands={brands}
        categories={categories}
        features={features}
      />
      <EditCameraModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        cameraData={cameraData}
        brands={brands}
        categories={categories}
        features={features}
      />
    </div>
  );
}
