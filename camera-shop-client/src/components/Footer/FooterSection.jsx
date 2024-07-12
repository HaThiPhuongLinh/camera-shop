import PropTypes from "prop-types";

const FooterSection = ({ title, items }) => (
  <section className="flex flex-col w-2/6 max-md:ml-0 max-md:w-full text-left mt-3">
    <h3 className="text-lg font-semibold tracking-wider">{title}</h3>
    <div className="flex flex-col text-base font-medium tracking-wider text-black text-opacity-60 max-md:mt-10">
      {items.map((item, index) => (
        <div key={index} className={`mt-${index === 0 ? "7" : "5"}`}>
          {item}
        </div>
      ))}
    </div>
  </section>
);

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FooterSection;
