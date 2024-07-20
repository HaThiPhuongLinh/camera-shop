import FooterSection from "./FooterSection";
import IconButton from "./IconButton";
import { SocialMediaIcons } from "../../constants/socialMediaIcons";
import { useState } from "react";
import emailApi from "../../api/emailApi";

const Footer = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      await emailApi.sendEmail(email);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      emailInput.value = "";
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <footer className="flex flex-col justify-center bg-[#f4f4f5]">
      <div className="flex flex-col items-center pt-5 pr-4 pb-3 pl-20 w-full bg-[#f4f4f5] max-md:pl-5 max-md:max-w-full">
        <div className="self-start max-md:max-w-full w-full">
          <div className="flex max-md:flex-col max-md:gap-0">
            <FooterSection
              title="COMPANY"
              items={["About Us", "Blog", "Store Locations", "Contact"]}
            />
            <FooterSection title="HELP" items={["Order Tracking", "FAQs"]} />
            <FooterSection title="STORE" items={["Cameras"]} />
            <section className="flex flex-col ml-5 w-4/12 max-md:ml-0 max-md:w-full shrink-0 mt-3">
              <div className="flex flex-col max-md:mt-10">
                <h3 className="text-lg font-semibold tracking-wider text-black">
                  FOLLOW US
                </h3>
                <div className="flex gap-3 justify-center mt-7">
                  {SocialMediaIcons.map((icon, index) => (
                    <IconButton key={index} {...icon} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-wide text-center text-black w-[750px] max-md:mt-10 max-md:max-w-full">
          Subscribe to our newsletter to get updates <br /> to our latest
          collections
        </h2>
        <p className="mt-5 text-sm font-semibold tracking-wider text-center text-black max-md:max-w-full">
          Get 20% off on your first order just by subscribing to our newslatter
        </p>
        <form className="flex gap-2 mt-5 max-md:flex-wrap" onSubmit={handleSubmit}>
          <div className="flex flex-col grow shrink-0 justify-center text-base tracking-wider text-zinc-300 w-fit">
            <div className="flex gap-2 px-5 py-4 bg-white rounded-xl border border-solid border-zinc-300 border-opacity-90 w-[350px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/59e1709c30042b949d9504e02caaf794f787c089b14828ccccbcda995c8ad0b1?apiKey=53e4b1c7e8314bb0af1a0d344422a86a&"
                alt=""
                className="shrink-0 self-start w-[30px]"
              />
              <label htmlFor="emailInput" className="sr-only">
                Enter your email
              </label>
              <input
                type="email"
                id="emailInput"
                placeholder="Enter your email"
                className="flex-auto bg-transparent border-none outline-none text-black"
                aria-label="Enter your email"
                required
              />
            </div>
          </div>
          <button type="submit" className="text-base tracking-wider text-white whitespace-nowrap px-4 py-4 bg-black rounded-xl border border-solid border-zinc-300 max-md:px-5">
            Subscribe
          </button>
        </form>
        <p className="mt-5 text-sm font-semibold tracking-wider text-center text-zinc-600">
          You will be able to unsubscribe at any time
        </p>
        <p className="self-end mt-6 text-sm font-semibold tracking-wider text-black">
          Copyright © 2024
        </p>
      </div>
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold text-green-500">
              Thank you for subscribing!
            </h2>
            <button
              className="mt-3 px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
