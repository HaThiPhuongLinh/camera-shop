import { useState, useEffect } from "react";
import featureApi from "../../../api/featureApi";
import Modal from "react-modal";

const EditFeatureModal = ({
  isOpen,
  onRequestClose,
  featureId
}) => {
  const [initialFeature, setInitialFeature] = useState(null);
  const [feature, setFeature] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const response = await featureApi.getFeatureById(featureId);
        setFeature(response);
        setInitialFeature(response);
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    if (featureId) {
      fetchFeature();
    }
  }, [featureId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeature((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      featureName: !feature.featureName.trim(),
      code: !feature.code.trim(),
    };
    setFormErrors(errors);
    if (
      JSON.stringify(feature) !== JSON.stringify(initialFeature) &&
      !Object.values(errors).includes(true)
    ) {
      try {
        await featureApi.updateFeature(featureId, feature);
        onRequestClose();
      } catch (error) {
        console.error("Error updating feature:", error);
      }
    }
    onRequestClose();
  };

  if (!feature) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Feature"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Feature</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-bold mb-1">Feature Name</label>
            <input
              type="text"
              name="featureName"
              value={feature.featureName}
              onChange={handleInputChange}
              placeholder="Feature Name"
              className={`px-4 py-2 border rounded w-full ${
                formErrors.featureName ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Code</label>
            <input
              type="text"
              name="code"
              value={feature.code}
              onChange={handleInputChange}
              placeholder="Code"
              className={`px-4 py-2 border rounded w-full ${
                formErrors.code ? "border-red-500" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
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

export default EditFeatureModal;
