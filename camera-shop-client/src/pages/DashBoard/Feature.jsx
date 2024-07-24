import { useState, useEffect } from "react";
import featureApi from "../../api/featureApi";
import { Link } from "react-router-dom";
import AddFeatureModal from "./Modal/AddFeatureModal";
import EditFeatureModal from "./Modal/EditFeatureModal";

export default function Features() {
  const [features, setFeatures] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);

  const fetchFeatures = async () => {
    try {
      const response = await featureApi.getAllFeatures();
      setFeatures(response);
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  useEffect(() => {  
    fetchFeatures();
  }, []);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    fetchFeatures();
  };

  const handleOpenUpdateModal = (featureId) => {
    setSelectedFeatureId(featureId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedFeatureId(null);
    fetchFeatures();
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Features</strong>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Feature
        </button>
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border-b border-gray-300">ID</th>
            <th className="px-4 py-2 border-b border-gray-300">Feature Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Code</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.id} className="hover:bg-gray-100 text-sm">
              <td className="px-4 py-3 border-b border-gray-300">
                {feature.id}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {feature.featureName}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {feature.code}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                <div className="flex gap-2">
                  <Link
                     onClick={() => handleOpenUpdateModal(feature.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Update
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddFeatureModal
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
      />
      <EditFeatureModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleCloseUpdateModal}
        featureId={selectedFeatureId}
      />
    </div>
  );
}
