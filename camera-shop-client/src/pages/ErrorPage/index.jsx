import { Link } from "react-router-dom";

const ErroPage = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-lg mx-auto text-center mt-12">
        <h1 className="text-8xl font-bold text-teal-700 mb-4">404</h1>
        <h4 className="text-4xl font-bold text-black mb-4">
          Oops. That page doesn’t exist.
        </h4>
        <p className="text-xl text-gray-400 mb-10">
          Something went wrong, so this page is broken.
        </p>
        <Link
          to="/"
          className="inline-block text-base font-bold text-blue-600 hover:text-blue-700 underline"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErroPage;
