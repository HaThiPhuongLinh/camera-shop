import { useState } from "react";
import postApi from "../../../api/postApi";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddPostModal = ({ isOpen, onRequestClose }) => {
  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    authorName: "",
    publishedAt: new Date().toISOString().split("T")[0], 
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      title: !post.title.trim(),
      summary: !post.summary.trim(),
      content: !post.content.trim(),
      authorName: !post.authorName.trim(),
      image: !post.image.trim(),
    };
    setFormErrors(errors);
    if (!Object.values(errors).includes(true)) {
      try {
        const formattedPublishedAt = new Date(post.publishedAt).toISOString(); 
        await postApi.addPost({
          ...post,
          publishedAt: formattedPublishedAt,
        });
        setPost({
            title: "",
            summary: "",
            content: "",
            authorName: "",
            publishedAt: "",
            image: "",
        });
        onRequestClose(); 
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Post"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 overflow-y-auto h-[calc(100vh-200px)]">
          <div>
            <label className="block font-bold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="Title"
              className={`px-4 py-2 border rounded w-full ${
                formErrors.title ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Summary</label>
            <textarea
              name="summary"
              value={post.summary}
              onChange={handleInputChange}
              placeholder="Summary"
              className={`px-4 py-2 border rounded w-full ${
                formErrors.summary ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Content</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
              placeholder="Content"
              className={`px-4 py-2 border rounded w-full ${
                formErrors.content ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Author Name</label>
            <input
              type="text"
              name="authorName"
              value={post.authorName}
              onChange={handleInputChange}
              placeholder="Author Name"
              className={`px-4 py-2 border rounded w-1/2 ${
                formErrors.authorName ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Published At</label>
            <input
              type="date"
              name="publishedAt"
              value={post.publishedAt}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded w-1/5 ${
                formErrors.publishedAt ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={post.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className={`px-4 py-2 border rounded w-full ${
                formErrors.image ? "border-red-500" : ""
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

export default AddPostModal;