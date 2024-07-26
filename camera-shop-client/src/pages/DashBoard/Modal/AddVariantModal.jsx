import { useEffect, useState } from "react";
import Modal from "react-modal";
import cameraApi from "../../../api/cameraApi";
import variantApi from "../../../api/variantApi";

Modal.setAppElement("#root");

const AddVariantModal = ({ isOpen, onRequestClose }) => {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [newVariant, setNewVariant] = useState({
    cameraId: 0,
    source: "Import",
    color: "Black",
    style: "",
    set: "",
    quantity: 0,
    discount: 0,
    price: 0,
    images: [""],
  });

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await cameraApi.getAllCameras();
        setCameras(response);
        setFilteredCameras(response);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    };

    fetchCameras();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCameras(cameras);
    } else {
      setFilteredCameras(
        cameras.filter((camera) =>
          camera.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, cameras]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (selectedCamera) {
      setSelectedCamera(null);
    }
  };

  const handleCameraSelect = (camera) => {
    setSelectedCamera(camera);
    setNewVariant((prevState) => ({ ...prevState, cameraId: camera.id }));
    setSearchQuery("");
  };

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVariant((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...newVariant.images];
    newImages[index] = value;
    setNewVariant({ ...newVariant, images: newImages });
  };

  const addImageField = () => {
    setNewVariant({ ...newVariant, images: [...newVariant.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant({ ...newVariant, images: newImages });
  };

  const handleSaveVariant = async (e) => {
    e.preventDefault();
    const errors = {
      cameraId: selectedCamera === null,
      source: !newVariant.source.trim(),
      color: !newVariant.color.trim(),
      price: !newVariant.price,
      images: newVariant.images.some((image) => !image.trim()),
    };

    setFormErrors(errors);
    if (!Object.values(errors).includes(true)) {
      try {
        await variantApi.saveVariant(newVariant);
        onRequestClose();
        setNewVariant({
          cameraId: 0,
          source: "Import",
          color: "Black",
          style: "",
          set: "",
          quantity: 0,
          discount: 0,
          price: 0,
          images: [""],
        });
      } catch (error) {
        console.error("Error adding variant:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Variant"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Variant</h2>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[calc(90vh-200px)]">
        <div className="col-span-3">
          <label className="block font-bold mb-1">Camera</label>
          <input
            type="text"
            value={selectedCamera ? selectedCamera.name : searchQuery}
            onChange={handleSearchChange}
            placeholder="Search camera"
            className={`px-4 py-2 border rounded w-full ${
              formErrors.cameraId ? "border-red-500" : ""
            }`}
          />
          {searchQuery && (
            <div className="border border-gray-300 mt-2 rounded">
              {filteredCameras.map((camera) => (
                <div
                  key={camera.id}
                  onClick={() => handleCameraSelect(camera)}
                  className={`px-4 py-2 cursor-pointer ${
                    camera.id === selectedCamera?.id ? "bg-blue-200" : ""
                  }`}
                >
                  {camera.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          name="source"
          value={newVariant.source}
          onChange={handleInputChange}
          placeholder="Source"
          className={`px-4 py-2 border rounded ${
            formErrors.source ? "border-red-500" : ""
          }`}
        />
        <select
          name="color"
          value={newVariant.color}
          onChange={handleInputChange}
          className={`px-4 py-2 border rounded ${
            formErrors.color ? "border-red-500" : ""
          }`}
        >
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Silver">Silver</option>
        </select>
        <input
          type="text"
          name="style"
          value={newVariant.style}
          onChange={handleInputChange}
          placeholder="Style"
          className="col-span-2 px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="set"
          value={newVariant.set}
          onChange={handleInputChange}
          placeholder="Set"
          className="col-span-3 px-4 py-2 border rounded"
        />
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Quantity </label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={newVariant.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className={`px-4 py-2 border rounded ${
              formErrors.quantity ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Discount </label>
          <input
            type="number"
            name="discount"
            min="0"
            max="100"
            value={newVariant.discount}
            onChange={handleInputChange}
            placeholder="Discount"
            className={`px-4 py-2 border rounded ${
              formErrors.discount ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <label className="font-semibold"> Price </label>
          <input
            type="number"
            min="0"
            name="price"
            value={newVariant.price}
            onChange={handleInputChange}
            placeholder="Price"
            className={`px-4 py-2 border rounded ${
              formErrors.price ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="col-span-3">
          <label className="block font-bold mb-1">Images</label>
          {newVariant.images.map((image, index) => (
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
          onClick={handleSaveVariant}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default AddVariantModal;
