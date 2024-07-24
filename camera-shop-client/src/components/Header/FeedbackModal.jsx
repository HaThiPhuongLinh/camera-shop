import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import reviewApi from "../../api/reviewApi";
import useAuthStore from "./../../hooks/authStore";

const FeedbackModal = ({ feedbackData, onClose, orderData }) => { 
  const userId = useAuthStore((state) => state.userId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  useEffect(() => {
    if (feedbackData && feedbackData.content) {
      setRating(feedbackData.rating);
      setComment(feedbackData.content);
    }
  }, [feedbackData]);

  const handleSubmit = async () => {
    setRatingError(false); 
    setCommentError(false);

    if (rating === 0) {
      setRatingError(true);
    }

    if (comment.trim() === "") {
      setCommentError(true);
    }

    if (rating === 0 || comment.trim() === "") {
      return; 
    }

    try {
      if (feedbackData.orderId && feedbackData.cameraIds) {
        const reviewPromises = feedbackData.cameraIds.map((cameraId) => {
          const reviewData = {
            userId: userId,
            orderId: feedbackData.orderId,
            cameraId,
            content: comment,
            rating,
          };

          return reviewApi.saveReview(reviewData);
        });

        await Promise.all(reviewPromises);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          onClose();
          orderData();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        {feedbackData && feedbackData.content ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review</h2>
            <div className="mb-4 text-left space-y-1">
              <label className="block text-gray-700">Rating</label>
              <StarRating rating={rating} readOnly={true} />
            </div>
            <div className="mb-4 text-left space-y-1">
              <label className="block text-gray-700">Comment</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 ">
                {feedbackData.content}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 ">Send Feedback</h2>
            <div className="mb-4 text-left space-y-1">
              <label className="block text-gray-700">Rating</label>
              <StarRating rating={rating} onRatingChange={setRating} />
              {ratingError && (
                <p className="text-red-500 text-xs">Please select a rating</p>
              )}
            </div>
            <div className="mb-4 text-left space-y-1">
              <label className="block text-gray-700 ">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 ${commentError ? 'border-red-500' : ''}`} 
                rows="4"
              ></textarea>
              {commentError && (
                <p className="text-red-500 text-xs">Please enter a comment</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-md shadow-lg text-center">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 block mx-auto mb-3"
              >
                <g data-name="Layer 28">
                  <path
                    d="M16 31a15 15 0 1 1 15-15 15 15 0 0 1-15 15Zm0-28a13 13 0 1 0 13 13A13 13 0 0 0 16 3Z"
                    fill="#4ea359"
                    className="fill-101820 "
                  ></path>
                  <path
                    d="M13.67 22a1 1 0 0 1-.73-.32l-4.67-5a1 1 0 0 1 1.46-1.36l3.94 4.21 8.6-9.21a1 1 0 1 1 1.46 1.36l-9.33 10a1 1 0 0 1-.73.32Z"
                    fill="#4ea359"
                    className="fill-101820 "
                  ></path>
                </g>
              </svg>
              <p className="text-lg font-semibold text-gray-800 mb-4 max-w-sm mx-auto">
                Send Feedback Successfully
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;