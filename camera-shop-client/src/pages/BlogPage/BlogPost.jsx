import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postApi from "../../api/postApi";

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    postApi
      .getPostById(postId)
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  const paragraphs = post.content
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-zinc-800 rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="relative py-14 overflow-hidden">
              {/* Blog title and metadata */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold mb-4 px-24">{post.title}</h1>
                <p className="text-gray-500">
                  Published on {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
              {/* Blog image */}
              <img
                className="block mx-auto mb-8 w-[60%] max-md:w-full"
                src={post.image}
                alt={post.title}
              />
              {/* Blog content */}
              <div className="max-w-5xl mx-auto">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base text-gray-700 leading-relaxed text-justify mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default BlogPost;
