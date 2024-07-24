import { useState, useEffect } from "react";
import Modal from "react-modal";
import cameraApi from "../../../api/cameraApi";

Modal.setAppElement("#root");

const EditCameraModal = ({
  isOpen,
  onRequestClose,
  cameraData,
  brands,
  categories,
  features,
}) => {
  const [camera, setCamera] = useState({
    id: 0,
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
    active: "",
    iso: "",
    size: "",
    hot: false,
  });

  const [initialCameraData, setInitialCameraData] = useState(camera);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (cameraData) {
      const cameraDataParsed = {
        id: cameraData.id,
        name: cameraData.name,
        brandId: cameraData.brand.id,
        categoryId: cameraData.category.id,
        warrantyPeriod: cameraData.warrantyPeriod,
        features: cameraData.features.map((feature) => feature.id),
        description: cameraData.description,
        shootingSpeed: cameraData.shootingSpeed,
        stabilization: cameraData.stabilization,
        resolution: cameraData.resolution,
        sensorType: cameraData.sensorType,
        videoResolution: cameraData.videoResolution,
        battery: cameraData.battery,
        weight: cameraData.weight,
        images: cameraData.images,
        active: cameraData.active,
        iso: cameraData.iso,
        size: cameraData.size,
        hot: cameraData.hot,
      };
      setCamera(cameraDataParsed);
      setInitialCameraData(cameraDataParsed);
    }
  }, [cameraData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCamera((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCamera((prevState) => ({ ...prevState, [name]: Number(value) }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: Number(value) === 0,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCamera((prevState) => ({
      ...prevState,
      features: checked
        ? [...prevState.features, Number(value)]
        : prevState.features.filter((feature) => feature !== Number(value)),
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      features: camera.features.length === 0,
    }));
  };

  const handleHotCheckboxChange = (e) => {
    setCamera({ ...camera, hot: e.target.checked });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...camera.images];
    newImages[index] = value;
    setCamera({ ...camera, images: newImages });
  };

  const addImageField = () => {
    setCamera({ ...camera, images: [...camera.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = camera.images.filter((_, i) => i !== index);
    setCamera({ ...camera, images: newImages });
  };

  const isFormChanged = () => {
    return JSON.stringify(camera) !== JSON.stringify(initialCameraData);
  };

  const handleSaveCamera = async (e) => {
    e.preventDefault();
    const errors = {
      name: !camera.name.trim(),
      brandId: camera.brandId === 0,
      categoryId: camera.categoryId === 0,
      warrantyPeriod: !camera.warrantyPeriod.trim(),
      features: camera.features.length === 0,
      description: !camera.description.trim(),
      shootingSpeed: !camera.shootingSpeed.trim(),
      stabilization: !camera.stabilization.trim(),
      resolution: !camera.resolution.trim(),
      sensorType: !camera.sensorType.trim(),
      videoResolution: !camera.videoResolution.trim(),
      battery: !camera.battery.trim(),
      weight: !camera.weight.trim(),
      images: camera.images.some((image) => !image.trim()),
      iso: !camera.iso.trim(),
      size: !camera.size.trim(),
    };

    setFormErrors(errors);
    if (!Object.values(errors).includes(true) && isFormChanged()) {
      try {
        await cameraApi.updateCamera(camera.id, {
          name: camera.name,
          brandId: camera.brandId,
          categoryId: camera.categoryId,
          warrantyPeriod: camera.warrantyPeriod,
          features: camera.features,
          description: camera.description,
          size: camera.size,
          shootingSpeed: camera.shootingSpeed,
          stabilization: camera.stabilization,
          resolution: camera.resolution,
          sensorType: camera.sensorType,
          videoResolution: camera.videoResolution,
          battery: camera.battery,
          weight: camera.weight,
          hot: camera.hot,
          images: camera.images,
          active: camera.active,
          iso: camera.iso,
        });
        onRequestClose();
      } catch (error) {
        console.error("Error updating camera:", error);
      }
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Camera"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Camera</h2>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-200px)]">
        <input
          type="text"
          name="name"
          value={camera.name}
          onChange={handleInputChange}
          placeholder="Camera Name"
          className={`px-4 py-2 border rounded ${
            formErrors.name ? "border-red-500" : ""
          }`}
        />
        <select
          name="brandId"
          value={camera.brandId}
          onChange={handleSelectChange}
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
          value={camera.categoryId}
          onChange={handleSelectChange}
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
                  checked={camera.features.includes(feature.id)}
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
              checked={camera.hot}
              onChange={handleHotCheckboxChange}
            />
            Hot
          </label>
        </div>
        <select
          name="active"
          value={camera.active ? 1 : 0}
          onChange={handleSelectChange}
          className="px-4 py-2 border rounded"
        >
          <option value={1}>Active</option>
          <option value={0}>InActive</option>
        </select>
        <div className="col-span-3 flex flex-col gap-2">
          <label className="font-semibold"> Description </label>
          <textarea
            name="description"
            value={camera.description}
            onChange={handleInputChange}
            placeholder="Description"
            className={`px-4 py-2 h-24 border rounded ${
              formErrors.description ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> WarrantyPeriod </label>
          <input
            type="text"
            name="warrantyPeriod"
            value={camera.warrantyPeriod}
            onChange={handleInputChange}
            placeholder="Warranty Period"
            className={`col-span-1 px-4 py-2 border rounded ${
              formErrors.warrantyPeriod ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> ShootingSpeed </label>
          <input
            type="text"
            name="shootingSpeed"
            value={camera.shootingSpeed}
            onChange={handleInputChange}
            placeholder="Shooting Speed"
            className={`col-span-2 px-4 py-2 border rounded ${
              formErrors.shootingSpeed ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Stabilization </label>
          <input
            type="text"
            name="stabilization"
            value={camera.stabilization}
            onChange={handleInputChange}
            placeholder="Stabilization"
            className={`col-span-1 px-4 py-2 border rounded ${
              formErrors.stabilization ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Resolution </label>
          <input
            type="text"
            name="resolution"
            value={camera.resolution}
            onChange={handleInputChange}
            placeholder="Resolution"
            className={`col-span-2 px-4 py-2 border rounded ${
              formErrors.resolution ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> SensorType </label>
          <input
            type="text"
            name="sensorType"
            value={camera.sensorType}
            onChange={handleInputChange}
            placeholder="Sensor Type"
            className={`col-span-1 px-4 py-2 border rounded ${
              formErrors.sensorType ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> VideoResolution </label>
          <input
            type="text"
            name="videoResolution"
            value={camera.videoResolution}
            onChange={handleInputChange}
            placeholder="Video Resolution"
            className={`col-span-2 px-4 py-2 border rounded ${
              formErrors.videoResolution ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Battery </label>
          <input
            type="text"
            name="battery"
            value={camera.battery}
            onChange={handleInputChange}
            placeholder="Battery"
            className={`col-span-1 px-4 py-2 border rounded ${
              formErrors.battery ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Weight </label>
          <input
            type="text"
            name="weight"
            value={camera.weight}
            onChange={handleInputChange}
            placeholder="Weight"
            className={`col-span-1 px-4 py-2 border rounded ${
              formErrors.weight ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Weight </label>
          <input
            type="text"
            name="size"
            value={camera.size}
            onChange={handleInputChange}
            placeholder="Size"
            className={`col-span-1 px-4 py-2 border rounded ${
              formErrors.size ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> ISO </label>
          <input
            type="text"
            name="iso"
            value={camera.iso}
            onChange={handleInputChange}
            placeholder="ISO"
            className={`col-span-2 px-4 py-2 border rounded ${
              formErrors.iso ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-3">
          <label className="block font-bold mb-1">Images</label>
          {camera.images.map((image, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              {image && (
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-40 h-20 object-cover border rounded"
                />
              )}
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="px-4 py-2 border rounded flex-1"
              />
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
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
          onClick={handleSaveCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditCameraModal;
