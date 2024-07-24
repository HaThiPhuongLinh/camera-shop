import { useState, useEffect } from "react";
import postApi from "../../../api/postApi";
import Modal from "react-modal";

const EditPostModal = ({ isOpen, onRequestClose, postId }) => {
  const [initialPost, setInitialPost] = useState(null);
  const [post, setPost] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postApi.getPostById(postId);
        setPost({
          ...response,
          publishedAt: response.publishedAt
            ? new Date(response.publishedAt).toISOString().split('T')[0]
            : "",
        });
        setInitialPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

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
    if (
      JSON.stringify(post) !== JSON.stringify(initialPost) &&
      !Object.values(errors).includes(true)
    ) {
      try {
        const formattedPublishedAt = post.publishedAt
          ? new Date(post.publishedAt).toISOString()
          : "";
        await postApi.updatePost(postId, {
          ...post,
          publishedAt: formattedPublishedAt,
        });
        onRequestClose();
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      onRequestClose();
    }
  };

  if (!post) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Post"
      className="w-11/12 max-w-4xl p-8 mx-auto my-4 bg-white rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
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
            <img
                  src={post.image}
          
                  className="w-36 h-28 object-contain border rounded "
                />
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

export default EditPostModal;
