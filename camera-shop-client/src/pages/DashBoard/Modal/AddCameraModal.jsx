import { useState } from "react";
import Modal from "react-modal";
import cameraApi from "../../../api/cameraApi";

Modal.setAppElement("#root");

const AddCameraModal = ({
  isOpen,
  onRequestClose,
  brands,
  categories,
  features,
}) => {
  const [newCamera, setNewCamera] = useState({
    name: "",
    brandId: 0,
    categoryId: 0,
    warrantyPeriod: "",
    features: [],
    description: "",
    shootingSpeed: "",
    stabilization: "",
    resolution: "",
    sensorType: "",
    videoResolution: "",
    battery: "",
    weight: "",
    images: [""],
    active: 1,
    iso: "",
    size: "",
    hot: 0,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCamera((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewCamera((prevState) => ({
      ...prevState,
      features: checked
        ? [...prevState.features, Number(value)]
        : prevState.features.filter((feature) => feature !== Number(value)),
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      features: newCamera.features.length === 0,
    }));
  };

  const handleHotCheckboxChange = (e) => {
    setNewCamera({ ...newCamera, hot: e.target.checked ? 1 : 0 });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...newCamera.images];
    newImages[index] = value;
    setNewCamera({ ...newCamera, images: newImages });
  };

  const addImageField = () => {
    setNewCamera({ ...newCamera, images: [...newCamera.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = newCamera.images.filter((_, i) => i !== index);
    setNewCamera({ ...newCamera, images: newImages });
  };

  const handleSaveCamera = async (e) => {
    e.preventDefault();
    const errors = {
      name: !newCamera.name.trim(),
      brandId: newCamera.brandId === 0,
      categoryId: newCamera.categoryId === 0,
      warrantyPeriod: !newCamera.warrantyPeriod.trim(),
      features: newCamera.features.length === 0,
      description: !newCamera.description.trim(),
      shootingSpeed: !newCamera.shootingSpeed.trim(),
      stabilization: !newCamera.stabilization.trim(),
      resolution: !newCamera.resolution.trim(),
      sensorType: !newCamera.sensorType.trim(),
      videoResolution: !newCamera.videoResolution.trim(),
      battery: !newCamera.battery.trim(),
      weight: !newCamera.weight.trim(),
      images: newCamera.images.some((image) => !image.trim()),
      iso: !newCamera.iso.trim(),
      size: !newCamera.size.trim(),
    };

    setFormErrors(errors);
    if (!Object.values(errors).includes(true)) {
      try {
        await cameraApi.saveCamera(newCamera);
        onRequestClose();
        setNewCamera({
          name: "",
          brandId: 0,
          categoryId: 0,
          warrantyPeriod: "",
          features: [],
          description: "",
          shootingSpeed: "",
          stabilization: "",
          resolution: "",
          sensorType: "",
          videoResolution: "",
          battery: "",
          weight: "",
          images: [""],
          active: 1,
          iso: "",
          size: "",
          hot: 0,
        });
      } catch (error) {
        console.error("Error adding camera:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Camera"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Camera</h2>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-200px)]">
        <input
          type="text"
          name="name"
          value={newCamera.name}
          onChange={handleInputChange}
          placeholder="Camera Name"
          className={`px-4 py-2 border rounded ${
            formErrors.name ? "border-red-500" : ""
          }`}
        />
        <select
          name="brandId"
          value={newCamera.brandId}
          onChange={handleInputChange}
          className={`px-4 py-2 border rounded ${
            formErrors.brandId ? "border-red-500" : ""
          }`}
        >
          <option value={0}>Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.brandName}
            </option>
          ))}
        </select>
        <select
          name="categoryId"
          value={newCamera.categoryId}
          onChange={handleInputChange}
          className={`px-4 py-2 border rounded ${
            formErrors.categoryId ? "border-red-500" : ""
          }`}
        >
          <option value={0}>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <div className="col-span-3">
          <label className="block font-bold mb-1">Features</label>
          <div className="flex flex-wrap gap-4">
            {features.map((feature) => (
              <label key={feature.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={feature.id}
                  checked={newCamera.features.includes(feature.id)}
                  onChange={handleCheckboxChange}
                />
                {feature.featureName}
              </label>
            ))}
          </div>
          {formErrors.features && (
            <p className="text-red-500 text-sm">Select at least one feature</p>
          )}
        </div>
        <div className="col-span-3 flex items-center gap-2">
          <label>
            <input
              className="mr-2"
              type="checkbox"
              name="hot"
              checked={newCamera.hot === 1}
              onChange={handleHotCheckboxChange}
            />
            Hot
          </label>
        </div>
        <textarea
          name="description"
          value={newCamera.description}
          onChange={handleInputChange}
          placeholder="Description"
          className={`col-span-3 px-4 py-2 border rounded h-24 ${
            formErrors.description ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="warrantyPeriod"
          value={newCamera.warrantyPeriod}
          onChange={handleInputChange}
          placeholder="Warranty Period"
          className={`col-span-1 px-4 py-2 border rounded ${
            formErrors.warrantyPeriod ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="shootingSpeed"
          value={newCamera.shootingSpeed}
          onChange={handleInputChange}
          placeholder="Shooting Speed"
          className={`col-span-2 px-4 py-2 border rounded ${
            formErrors.shootingSpeed ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="stabilization"
          value={newCamera.stabilization}
          onChange={handleInputChange}
          placeholder="Stabilization"
          className={`col-span-1 px-4 py-2 border rounded ${
            formErrors.stabilization ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="resolution"
          value={newCamera.resolution}
          onChange={handleInputChange}
          placeholder="Resolution"
          className={`col-span-2 px-4 py-2 border rounded ${
            formErrors.resolution ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="sensorType"
          value={newCamera.sensorType}
          onChange={handleInputChange}
          placeholder="Sensor Type"
          className={`col-span-1 px-4 py-2 border rounded ${
            formErrors.sensorType ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="videoResolution"
          value={newCamera.videoResolution}
          onChange={handleInputChange}
          placeholder="Video Resolution"
          className={`col-span-2 px-4 py-2 border rounded ${
            formErrors.videoResolution ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="battery"
          value={newCamera.battery}
          onChange={handleInputChange}
          placeholder="Battery"
          className={`col-span-1 px-4 py-2 border rounded ${
            formErrors.battery ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="weight"
          value={newCamera.weight}
          onChange={handleInputChange}
          placeholder="Weight"
          className={`col-span-1 px-4 py-2 border rounded ${
            formErrors.weight ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="size"
          value={newCamera.size}
          onChange={handleInputChange}
          placeholder="Size"
          className={`col-span-1 px-4 py-2 border rounded ${
            formErrors.size ? "border-red-500" : ""
          }`}
        />
        <input
          type="text"
          name="iso"
          value={newCamera.iso}
          onChange={handleInputChange}
          placeholder="ISO"
          className={`col-span-2 px-4 py-2 border rounded ${
            formErrors.iso ? "border-red-500" : ""
          }`}
        />

        <div className="col-span-3">
          <label className="block font-bold mb-1">Images</label>
          {newCamera.images.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className={`flex-1 px-4 py-2 border rounded ${
                  formErrors.images ? "border-red-500" : ""
                }`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
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
          onClick={handleSaveCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddCameraModal;
