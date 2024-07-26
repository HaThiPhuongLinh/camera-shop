import { useEffect, useState } from "react";
import Modal from "react-modal";
import variantApi from "../../../api/variantApi";

Modal.setAppElement("#root");

const EditVariantModal = ({ isOpen, onRequestClose, variantId }) => {
  const [initialVariant, setInitialVariant] = useState(null);
  const [variant, setVariant] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const response = await variantApi.getVariantById(variantId);
        setVariant(response);
        setInitialVariant(response);
      } catch (error) {
        console.error("Error fetching variant:", error);
      }
    };

    if (variantId) {
      fetchVariant();
    }
  }, [variantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariant((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...variant.images];
    newImages[index] = value;
    setVariant({ ...variant, images: newImages });
  };

  const addImageField = () => {
    setVariant({ ...variant, images: [...variant.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = variant.images.filter((_, i) => i !== index);
    setVariant({ ...variant, images: newImages });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setVariant((prevState) => ({ ...prevState, [name]: Number(value) }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: Number(value) === 0,
    }));
  };

  const handleSaveVariant = async (e) => {
    e.preventDefault();
    const errors = {
      source: !variant.source.trim(),
      color: !variant.color.trim(),
      price: !variant.price,
      images: variant.images.some((image) => !image.trim()),
    };

    setFormErrors(errors);
    if (
      JSON.stringify(variant) !== JSON.stringify(initialVariant) &&
      !Object.values(errors).includes(true)
    ) {
      try {
        const updatedVariant = {
          cameraId: variant.camera.id,
          source: variant.source,
          color: variant.color,
          style: variant.style,
          set: variant.set,
          quantity: variant.quantity,
          discount: variant.discount,
          price: variant.price,
          active: variant.active,
          images: variant.images,
        };
        await variantApi.updateVariant(variantId, updatedVariant);
        onRequestClose();
      } catch (error) {
        console.error("Error updating variant:", error);
      }
    }
    onRequestClose();
  };

  if (!variant) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Variant"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Variant</h2>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-200px)]">
        <div className="col-span-3">
          <label className="block font-bold mb-1">Camera</label>
          <input
            type="text"
            value={variant.camera.name}
            disabled
            className="px-4 py-2 border rounded w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        <input
          type="text"
          name="source"
          value={variant.source}
          onChange={handleInputChange}
          placeholder="Source"
          className={`px-4 py-2 border rounded ${
            formErrors.source ? "border-red-500" : ""
          }`}
        />
        <select
          name="color"
          value={variant.color}
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
          value={variant.style}
          onChange={handleInputChange}
          placeholder="Style"
          className="col-span-2 px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="set"
          value={variant.set}
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
            value={variant.quantity}
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
            value={variant.discount}
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
            value={variant.price}
            onChange={handleInputChange}
            placeholder="Price"
            className={`px-4 py-2 border rounded ${
              formErrors.price ? "border-red-500" : ""
            }`}
          />
        </div>
        <select
          name="active"
          value={variant.active ? 1 : 0}
          onChange={handleSelectChange}
          className="px-4 py-2 border rounded"
        >
          <option value={1}>Active</option>
          <option value={0}>InActive</option>
        </select>
        <div className="col-span-3">
          <label className="block font-bold mb-1">Images</label>
          {variant.images.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2">
              {image && (
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-contain border rounded"
                />
              )}
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

export default EditVariantModal;
