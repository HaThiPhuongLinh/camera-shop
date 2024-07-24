import { useState, useEffect } from "react";
import postApi from "../../api/postApi";
import AddPostModal from "./Modal/AddPostModal";
import EditPostModal from "./Modal/EditPostModal";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getAllPosts();
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postApi.deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeletePostWithConfirmation = (postId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
      handleDeletePost(postId);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    fetchPosts();
  };

  const handleOpenUpdateModal = (postId) => {
    setSelectedPostId(postId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPostId(null);
    fetchPosts();
  };

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200">
      <div className="mb-4 flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Posts</strong>
        <button
        onClick={handleOpenAddModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Post
        </button>
      </div>

      <table className="w-full text-gray-700 border-collapse text-left">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border-b border-gray-300">ID</th>
            <th className="px-4 py-2 border-b border-gray-300">Title</th>
            <th className="px-4 py-2 border-b border-gray-300">Summary</th>
            <th className="px-4 py-2 border-b border-gray-300">Author Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Published At</th>
            <th className="px-4 py-2 border-b border-gray-300">Image</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-100 text-sm">
              <td className="px-4 py-3 border-b border-gray-300">{post.id}</td>
              <td className="px-4 py-3 border-b border-gray-300">
                {post.title}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {post.summary}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {post.authorName}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                {new Date(post.publishedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                <img src={post.image} alt={post.title} width="400" />
              </td>
              <td className="px-4 py-3 border-b border-gray-300">
                <div className="flex gap-2">
                  <button
                   onClick={() => handleOpenUpdateModal(post.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                  onClick={() => handleDeletePostWithConfirmation(post.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 rounded"
                  >
                    Detele
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddPostModal
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
   
      />
      <EditPostModal
        isOpen={isUpdateModalOpen}
        onRequestClose={handleCloseUpdateModal}
        postId={selectedPostId}
      />
    </div>
  );
}
