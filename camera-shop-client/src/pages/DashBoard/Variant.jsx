import { useState, useEffect, useRef } from "react";
import variantApi from "../../api/variantApi";
import cameraApi from "../../api/cameraApi";
import { getActive } from "../../helpers";
import AddVariantModal from "./Modal/AddVariantModal";
import EditVariantModal from "./Modal/EditVariantModal";

export default function Variants() {
  const [variants, setVariants] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("ALL");
  const [cameras, setCameras] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editVariantId, setEditVariantId] = useState(null);
  const variantsRef = useRef({});

  const fetchVariants = async () => {
    try {
      const response = await variantApi.getAllVariants();
      setVariants(response);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  const fetchCameras = async () => {
    try {
      const response = await cameraApi.getAllCameras();
      setCameras(response.map((camera) => camera.name));
    } catch (error) {
      console.error("Error fetching cameras:", error);
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchCameras();
  }, []);

  const handleDeleteVariant = async (id) => {
    try {
      await variantApi.deleteVariant(id);
      fetchVariants();
    } catch (error) {
      console.error("Error deleting variant:", error);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchVariants();
  };

  const openEditModal = (id) => {
    setEditVariantId(id);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditVariantId(null);
    setEditModalIsOpen(false);
    fetchVariants();
  };

  const filteredVariants =
    selectedCamera === "ALL"
      ? variants
      : variants.filter((variant) => variant.camera.name === selectedCamera);

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Variants</strong>
        <div className="flex items-center">
          <select
            className="border border-slate-700 p-2 rounded"
            value={selectedCamera}
            onChange={handleCameraChange}
          >
            <option value="ALL">All Cameras</option>
            {cameras.map((cameraName) => (
              <option key={cameraName} value={cameraName}>
                {cameraName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Camera name..."
            className="ml-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={openModal}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Variant
          </button>
        </div>
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-2 py-2 border-b border-gray-300">ID</th>
            <th className="px-2 py-2 border-b border-gray-300">Camera Name</th>
            <th className="px-2 py-2 border-b border-gray-300">Source</th>
            <th className="px-2 py-2 border-b border-gray-300">Color</th>
            <th className="px-2 py-2 border-b border-gray-300">Style</th>
            <th className="px-2 py-2 border-b border-gray-300">Set</th>
            <th className="px-2 py-2 border-b border-gray-300">Quantity</th>
            <th className="px-2 py-2 border-b border-gray-300">Discount</th>
            <th className="px-2 py-2 border-b border-gray-300">Price</th>
            <th className="px-2 py-2 border-b border-gray-300">Active</th>
            <th className="px-2 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVariants
            .filter((variant) =>
              variant.camera.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((variant) => {
              return (
                <tr
                  key={variant.id}
                  ref={(el) => (variantsRef.current[variant.id] = el)}
                  className="hover:bg-gray-100 text-sm"
                >
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.id}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.camera.name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.source || ""}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.color || ""}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.style || ""}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.set || ""}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.quantity}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.discount}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {variant.price}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {getActive(variant.active)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(variant.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteVariant(variant.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <AddVariantModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      <EditVariantModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        variantId={editVariantId}
      />
    </div>
  );
}
