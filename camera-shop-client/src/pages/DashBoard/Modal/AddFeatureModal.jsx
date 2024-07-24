import { useState } from "react";
import featureApi from "../../../api/featureApi";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddFeatureModal = ({ isOpen, onRequestClose }) => {
  const [feature, setFeature] = useState({
    featureName: "",
    code: "",
  });
  const [formErrors, setFormErrors] = useState({});

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
    if (!Object.values(errors).includes(true)) {
      try {
        await featureApi.addFeature(feature);
        onRequestClose();
      } catch (error) {
        console.error("Error adding feature:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Feature"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Feature</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
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

export default AddFeatureModal;
