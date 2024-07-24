import { useState, useEffect } from "react";
import postApi from "../../api/postApi";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postApi
      .getAllPosts()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-[#2E2F31] rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-white rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <section className="relative py-10 mt-5 overflow-hidden">
              <div className="relative container px-4 mx-auto max-w-xl lg:max-w-7xl">
                <div className="max-w-2xl mx-auto mb-12 text-center">
                  <h1 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold">
                    <span>News &</span>
                    <span className="font-serif italic">Articles</span>
                  </h1>
                </div>
                <div className="flex flex-wrap -mx-4 mb-18 text-left">
                  {/* Large article */}
                  {posts.length > 0 && (
                    <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
                      <a
                        className="block group w-full"
                        href={`/blog/${posts[0].id}`}
                      >
                        <img
                          className="block w-full mb-5 rounded-md"
                          src={posts[0].image}
                          alt={posts[0].title}
                        />
                        <span className="block text-gray-500 mb-5">
                          {new Date(posts[0].publishedAt).toLocaleDateString()}
                        </span>
                        <h4 className="text-3xl font-semibold text-gray-900 group-hover:text-orange-900 mb-5">
                          {posts[0].title}
                        </h4>
                        <p className="max-w-xl text-lg text-gray-500">
                          {posts[0].summary}
                        </p>
                      </a>
                    </div>
                  )}

                  {/* Small articles */}
                  <div className="w-full lg:w-1/2 px-4 text-left">
                    {posts.slice(1).map((post) => (
                      <a
                        className="md:flex group mb-8"
                        href={`/blog/${post.id}`}
                        key={post.id}
                      >
                        <img
                          className="w-48 h-40 object-cover rounded-md"
                          src={post.image}
                          alt={post.title}
                        />
                        <div className="mt-4 md:mt-0 md:ml-6 pt-2">
                          <span className="block text-gray-500 mb-2">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <h4 className="text-xl font-semibold text-gray-900 group-hover:text-orange-900">
                            {post.title}
                          </h4>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default BlogPage;
