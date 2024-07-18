import { useEffect, useState } from "react";
import categoryApi from "./../../api/categoryApi";
import brandApi from "./../../api/brandApi";
import cameraApi from "../../api/cameraApi";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [selectedStabilizations, setSelectedStabilizations] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [filteredCamerasCount, setFilteredCamerasCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("1");
  const sensors = ["CMOS", "APS-C", "Full-Frame"];
  const stabilizations = ["Digital", "OIS", "5-Axis"];

  const priceRanges = [
    { label: "Under $500", min: 0, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "$1000 - $1500", min: 1000, max: 1500 },
    { label: "$1500 - $2000", min: 1500, max: 2000 },
    { label: "$2000 - $2500", min: 2000, max: 2500 },
    { label: "Over $2500", min: 2500, max: Infinity },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCategories, fetchedBrands, fetchedCameras] =
          await Promise.all([
            categoryApi.getAllCategories(),
            brandApi.getAllBrands(),
            cameraApi.getAllCameras(),
          ]);
        setCategories(fetchedCategories);
        setBrands(fetchedBrands);
        setCameras(fetchedCameras);
        setFilteredCameras(fetchedCameras);
        setFilteredCamerasCount(fetchedCameras.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (filter) => {
    if (activeFilter === filter && isFilterDropdownOpen) {
      setIsFilterDropdownOpen(false);
      setActiveFilter(null);
      setActiveButton(null);
    } else {
      setIsFilterDropdownOpen(true);
      setActiveFilter(filter);
      setActiveButton(filter);
    }
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    applySorting(event.target.value);
  };

  const applySorting = (sortValue) => {
    let sortedCameras = [...filteredCameras];

    if (sortValue === "1") {
      sortedCameras.sort((a, b) => a.id - b.id);
    } else if (sortValue === "2") {
      sortedCameras.sort((a, b) => {
        const discountA = Math.max(...a.variants.map((v) => v.discount));
        const discountB = Math.max(...b.variants.map((v) => v.discount));
        return discountB - discountA;
      });
    } else if (sortValue === "3") {
      sortedCameras.sort((a, b) => {
        const discountedPriceA =
          getLowestPrice(a.variants) *
          (1 - Math.max(...a.variants.map((v) => v.discount)) / 100);
        const discountedPriceB =
          getLowestPrice(b.variants) *
          (1 - Math.max(...b.variants.map((v) => v.discount)) / 100);
        return discountedPriceA - discountedPriceB;
      });
    } else if (sortValue === "4") {
      sortedCameras.sort((a, b) => {
        const discountedPriceA =
          getLowestPrice(a.variants) *
          (1 - Math.max(...a.variants.map((v) => v.discount)) / 100);
        const discountedPriceB =
          getLowestPrice(b.variants) *
          (1 - Math.max(...b.variants.map((v) => v.discount)) / 100);
        return discountedPriceB - discountedPriceA;
      });
    }

    setFilteredCameras(sortedCameras);
  };

  const deselectCategories = () => {
    setSelectedCategories([]);
    setActiveButton(null);
    calculateFilteredCamerasCount(
      [],
      selectedBrands,
      selectedSensors,
      selectedStabilizations,
      selectedPriceRanges
    );
  };

  const deselectBrands = () => {
    setSelectedBrands([]);
    setActiveButton(null);
    calculateFilteredCamerasCount(
      selectedCategories,
      [],
      selectedSensors,
      selectedStabilizations,
      selectedPriceRanges
    );
  };

  const deselectSensors = () => {
    setSelectedSensors([]);
    setActiveButton(null);
    calculateFilteredCamerasCount(
      selectedCategories,
      selectedBrands,
      [],
      selectedStabilizations,
      selectedPriceRanges
    );
  };

  const deselectStabilizations = () => {
    setSelectedStabilizations([]);
    setActiveButton(null);
    calculateFilteredCamerasCount(
      selectedCategories,
      selectedBrands,
      selectedSensors,
      [],
      selectedPriceRanges
    );
  };

  const deselectPriceRanges = () => {
    setSelectedPriceRanges([]);
    setActiveButton(null);
    calculateFilteredCamerasCount(
      selectedCategories,
      selectedBrands,
      selectedSensors,
      selectedStabilizations,
      []
    );
  };

  const calculateFilteredCamerasCount = (
    categories,
    brands,
    sensors,
    stabilizations,
    priceRanges
  ) => {
    let filteredCamerasCount = cameras.filter(
      (camera) =>
        (categories.length === 0 || categories.includes(camera.categoryId)) &&
        (brands.length === 0 || brands.includes(camera.brandId)) &&
        (sensors.length === 0 || sensors.includes(camera.sensorType)) &&
        (stabilizations.length === 0 ||
          stabilizations.includes(camera.stabilization)) &&
        (priceRanges.length === 0 ||
          priceRanges.some((range) =>
            camera.variants.some(
              (variant) =>
                variant.price >= range.min && variant.price <= range.max
            )
          ))
    ).length;

    setFilteredCamerasCount(filteredCamerasCount);
  };

  const filterCameras = () => {
    setIsLoading(true);
    let filteredCameras = cameras.filter(
      (camera) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(camera.categoryId)) &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(camera.brandId)) &&
        (selectedSensors.length === 0 ||
          selectedSensors.includes(camera.sensorType)) &&
        (selectedStabilizations.length === 0 ||
          selectedStabilizations.includes(camera.stabilization)) &&
        (selectedPriceRanges.length === 0 ||
          selectedPriceRanges.some((range) =>
            camera.variants.some(
              (variant) =>
                variant.price >= range.min && variant.price <= range.max
            )
          ))
    );

    setFilteredCameras(filteredCameras);
    setIsLoading(false);
  };

  const toggleCategory = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    calculateFilteredCamerasCount(
      updatedCategories,
      selectedBrands,
      selectedSensors,
      selectedStabilizations,
      selectedPriceRanges
    );

    setActiveButton(updatedCategories.length > 0 ? "category" : null);
  };

  const toggleBrand = (brandId) => {
    const updatedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(updatedBrands);
    calculateFilteredCamerasCount(
      selectedCategories,
      updatedBrands,
      selectedSensors,
      selectedStabilizations,
      selectedPriceRanges
    );

    setActiveButton(updatedBrands.length > 0 ? "brand" : null);
  };

  const toggleSensor = (sensor) => {
    const updatedSensors = selectedSensors.includes(sensor)
      ? selectedSensors.filter((s) => s !== sensor)
      : [...selectedSensors, sensor];

    setSelectedSensors(updatedSensors);
    calculateFilteredCamerasCount(
      selectedCategories,
      selectedBrands,
      updatedSensors,
      selectedStabilizations,
      selectedPriceRanges
    );

    setActiveButton(updatedSensors.length > 0 ? "sensor" : null);
  };

  const toggleStabilization = (stabilization) => {
    const updatedStabilizations = selectedStabilizations.includes(stabilization)
      ? selectedStabilizations.filter((s) => s !== stabilization)
      : [...selectedStabilizations, stabilization];

    setSelectedStabilizations(updatedStabilizations);
    calculateFilteredCamerasCount(
      selectedCategories,
      selectedBrands,
      selectedSensors,
      updatedStabilizations,
      selectedPriceRanges
    );

    setActiveButton(updatedStabilizations.length > 0 ? "stabilization" : null);
  };

  const togglePriceRange = (priceRange) => {
    const updatedPriceRanges = selectedPriceRanges.some(
      (r) => r.label === priceRange.label
    )
      ? selectedPriceRanges.filter((r) => r.label !== priceRange.label)
      : [...selectedPriceRanges, priceRange];

    setSelectedPriceRanges(updatedPriceRanges);
    calculateFilteredCamerasCount(
      selectedCategories,
      selectedBrands,
      selectedSensors,
      selectedStabilizations,
      updatedPriceRanges
    );

    setActiveButton(updatedPriceRanges.length > 0 ? "price" : null);
  };

  const getPrimaryImage = (variants) => {
    return variants.length > 0 ? variants[0].images[0] : "";
  };

  const getLowestPrice = (variants) => {
    return variants.reduce(
      (lowest, variant) => (variant.price < lowest ? variant.price : lowest),
      variants[0].price
    );
  };

  return (
    <div className="flex flex-col bg-white">
      <header className="flex flex-col pt-5 pb-5 border border-black border-solid shadow-sm bg-zinc-800 rounded-[100px_100px_0px_0px] max-md:max-w-full">
        <nav className="flex flex-col items-center px-5 max-md:max-w-full">
          <div className="flex flex-col self-stretch pt-14 bg-[#dfdfdf] rounded-[90px_90px_0px_0px] max-md:px-5 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets%2F53e4b1c7e8314bb0af1a0d344422a86a%2Fb088ac72187f43838215b7359a95f62f"
              alt=""
              className="mt-10 w-full max-md:mt-10 max-md:max-w-full"
            />
            <section className="pt-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4 justify-between">
                  <div className="flex flex-wrap justify-between mb-6 px-5 space-x-5">
                    <div
                      className={`flex-1 text-center p-2 rounded border-2 ${
                        activeButton === "category" ||
                        selectedCategories.length > 0
                          ? "border-blue-500"
                          : "border-white"
                      }`}
                    >
                      <button
                        className="relative inline-flex items-center justify-center text-base"
                        onClick={() => handleFilterClick("category")}
                      >
                        <span className="mr-4">Category</span>
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-800 border-transparent"></span>
                      </button>
                    </div>
                    <div
                      className={`flex-1 text-center p-2 rounded border-2 ${
                        activeButton === "brand" || selectedBrands.length > 0
                          ? "border-blue-500"
                          : "border-white"
                      }`}
                    >
                      <button
                        className="relative inline-flex items-center justify-center text-base"
                        onClick={() => handleFilterClick("brand")}
                      >
                        <span className="mr-4">Brand</span>
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-800 border-transparent"></span>
                      </button>
                    </div>
                    <div
                      className={`flex-1 text-center p-2 rounded border-2 ${
                        activeButton === "sensor" || selectedSensors.length > 0
                          ? "border-blue-500"
                          : "border-white"
                      }`}
                    >
                      <button
                        className="relative inline-flex items-center justify-center text-base"
                        onClick={() => handleFilterClick("sensor")}
                      >
                        <span className="mr-4">Sensor</span>
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-800 border-transparent"></span>
                      </button>
                    </div>
                    <div
                      className={`flex-1 text-center p-2 rounded border-2 ${
                        activeButton === "stabilization" ||
                        selectedStabilizations.length > 0
                          ? "border-blue-500"
                          : "border-white"
                      }`}
                    >
                      <button
                        className="relative inline-flex items-center justify-center text-base"
                        onClick={() => handleFilterClick("stabilization")}
                      >
                        <span className="mr-4">Stabilization</span>
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-800 border-transparent"></span>
                      </button>
                    </div>
                    <div
                      className={`flex-1 text-center p-2 rounded border-2 ${
                        activeButton === "price" ||
                        selectedPriceRanges.length > 0
                          ? "border-blue-500"
                          : "border-white"
                      }`}
                    >
                      <button
                        className="relative inline-flex items-center justify-center text-base"
                        onClick={() => handleFilterClick("price")}
                      >
                        <span className="mr-4">Price</span>
                        <span className="absolute top-1/2 right-0 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-800 border-transparent"></span>
                      </button>
                    </div>
                  </div>

                  {/* Category Filter */}
                  {activeFilter === "category" && isFilterDropdownOpen && (
                    <div className="absolute mt-14 block w-full max-w-xl bg-white rounded-lg shadow-md z-10">
                      <div className="p-4">
                        <div className="flex flex-wrap">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              onClick={() => toggleCategory(category.id)}
                              className={`inline-block p-2 border rounded-lg mr-2 mb-2 text-center transition cursor-pointer ${
                                selectedCategories.includes(category.id)
                                  ? "border-blue-500 border-2"
                                  : "border-gray-300"
                              }`}
                            >
                              <img
                                src={category.image}
                                className="object-contain w-32 h-14"
                                alt={category.categoryName}
                              />
                              {category.categoryName}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center mb-3 space-x-4">
                        <button
                          className="p-2 border border-red-500 rounded text-red"
                          onClick={deselectCategories}
                        >
                          Deselect
                        </button>
                        <button
                          onClick={() => {
                            filterCameras();
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`p-2 bg-blue-500 rounded text-white ${
                            filteredCamerasCount === 0
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={filteredCamerasCount === 0}
                        >
                          See {filteredCamerasCount} result
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Brand Filter */}
                  {activeFilter === "brand" && isFilterDropdownOpen && (
                    <div className="absolute mt-14 block ml-36 bg-white rounded-lg shadow-md z-10">
                      <div className="p-4">
                        <div className="flex flex-wrap">
                          {brands.map((brand) => (
                            <div
                              key={brand.id}
                              onClick={() => toggleBrand(brand.id)}
                              className={`inline-block border bg-slate-800 border-gray-300 rounded-lg mr-2 mb-2 text-center hover:bg-slate-700 transition cursor-pointer ${
                                selectedBrands.includes(brand.id)
                                  ? "border-blue-700 border-4"
                                  : "border-gray-300"
                              }`}
                            >
                              <img
                                src={brand.image}
                                className="object-contain w-32 h-14 p-2"
                                alt={brand.brandName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center mb-3 space-x-4">
                        <button
                          className="p-2 border border-red-500 rounded text-red"
                          onClick={deselectBrands}
                        >
                          Deselect
                        </button>
                        <button
                          onClick={() => {
                            filterCameras();
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`p-2 bg-blue-500 rounded text-white ${
                            filteredCamerasCount === 0
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={filteredCamerasCount === 0}
                        >
                          See {filteredCamerasCount} result
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sensor Filter */}
                  {activeFilter === "sensor" && isFilterDropdownOpen && (
                    <div
                      className={`absolute mt-14 block ml-56 bg-white rounded-lg shadow-md z-10`}
                    >
                      <div className="p-4">
                        <div className="flex flex-wrap">
                          {sensors.map((sensor, index) => (
                            <div
                              key={index}
                              onClick={() => toggleSensor(sensor)}
                              className={`inline-block border rounded-lg mr-2 mb-2 text-center transition cursor-pointer hover:bg-gray-200 ${
                                selectedSensors.includes(sensor)
                                  ? "border-blue-500 border-2"
                                  : "border-gray-300"
                              }`}
                              data-id={index}
                              data-name={sensor}
                            >
                              <div className="p-2">{sensor}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center mb-3 space-x-4">
                        <button
                          className="p-2 border border-red-500 rounded text-red"
                          onClick={deselectSensors}
                        >
                          Deselect
                        </button>
                        <button
                          onClick={() => {
                            filterCameras();
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`p-2 bg-blue-500 rounded text-white ${
                            filteredCamerasCount === 0
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={filteredCamerasCount === 0}
                        >
                          See {filteredCamerasCount} result
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Stabilization Filter */}
                  {activeFilter === "stabilization" && isFilterDropdownOpen && (
                    <div
                      className={`absolute mt-14 block ml-80 bg-white rounded-lg shadow-md z-10`}
                    >
                      <div className="p-4">
                        <div className="flex flex-wrap">
                          {stabilizations.map((stabilization, index) => (
                            <div
                              key={index}
                              onClick={() => toggleStabilization(stabilization)}
                              className={`inline-block border rounded-lg mr-2 mb-2 text-center transition cursor-pointer hover:bg-gray-200 ${
                                selectedStabilizations.includes(stabilization)
                                  ? "border-blue-500 border-2"
                                  : "border-gray-300"
                              }`}
                              data-id={index}
                              data-name={stabilization}
                            >
                              <div className="p-2">{stabilization}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center mb-3 space-x-4">
                        <button
                          className="p-2 border border-red-500 rounded text-red"
                          onClick={deselectStabilizations}
                        >
                          Deselect
                        </button>
                        <button
                          onClick={() => {
                            filterCameras();
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`p-2 bg-blue-500 rounded text-white ${
                            filteredCamerasCount === 0
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={filteredCamerasCount === 0}
                        >
                          See {filteredCamerasCount} result
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Price Filter */}
                  {activeFilter === "price" && isFilterDropdownOpen && (
                    <div
                      className={`absolute mt-14 block ml-56 bg-white rounded-lg shadow-md z-10 w-full max-w-xl`}
                    >
                      <div className="p-4">
                        <div className="flex flex-wrap">
                          {priceRanges.map((range, index) => (
                            <div
                              key={index}
                              onClick={() => togglePriceRange(range)}
                              className={`inline-block border rounded-lg mr-2 mb-2 text-center cursor-pointer p-2 hover:bg-gray-200 ${
                                selectedPriceRanges.some(
                                  (r) => r.label === range.label
                                )
                                  ? "border-blue-500 border-2"
                                  : "border-gray-300"
                              }`}
                              data-id={index}
                              data-name={range.label}
                            >
                              {range.label}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center mb-3 space-x-4">
                        <button
                          className="p-2 border border-red-500 rounded text-red"
                          onClick={deselectPriceRanges}
                        >
                          Deselect
                        </button>
                        <button
                          onClick={() => {
                            filterCameras();
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`p-2 bg-blue-500 rounded text-white ${
                            filteredCamerasCount === 0
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                          disabled={filteredCamerasCount === 0}
                        >
                          See {filteredCamerasCount} result
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="w-full lg:w-auto flex flex-wrap px-5">
                    <div className="w-full sm:w-auto mb-4 sm:mb-0 mr-5">
                      <select
                        className="pl-2 py-2 bg-white text-base border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        name=""
                        id=""
                        value={selectedSort}
                        onChange={handleSortChange}
                      >
                        <option value="1">Default</option>
                        <option value="2">Sort by discount</option>
                        <option value="3">Sort by price (low to high)</option>
                        <option value="4">Sort by price (high to low)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-10">
                  <div className="w-full px-3">
                    <div className="flex flex-wrap -mx-3">
                      {isLoading ? (
                        <div className="w-full flex justify-center items-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        filteredCameras.map((camera, index) => (
                          <div
                            className="w-full md:w-1/2 lg:w-1/5 px-3 mb-8"
                            key={index}
                          >
                            <div className="p-3 bg-white h-full rounded-md relative">
                              {/* Discount badge */}
                              {camera.variants.some(
                                (variant) => variant.discount > 0
                              ) && (
                                <span className="absolute mt-4 -ml-24 px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">
                                  -{" "}
                                  {Math.max(
                                    ...camera.variants.map(
                                      (variant) => variant.discount
                                    )
                                  )}
                                  %
                                </span>
                              )}

                              {/* Product information */}
                              <Link to={`/camera/${camera.id}`}>
                                <a className="block mt-2 mb-2">
                                  <img
                                    className="mx-auto w-full object-contain"
                                    src={getPrimaryImage(camera.variants)}
                                    alt={camera.name}
                                  />
                                  <div className="text-left ml-2">
                                    <h3 className="mb-2 text-xl font-bold font-heading">
                                      {camera.name}
                                    </h3>
                                    {/* Price display */}
                                    <p className="text-lg font-bold font-heading text-blue-500">
                                      {/* Calculate discounted price */}
                                      <span>
                                        $
                                        {(
                                          getLowestPrice(camera.variants) *
                                          (1 -
                                            Math.max(
                                              ...camera.variants.map(
                                                (variant) => variant.discount
                                              )
                                            ) /
                                              100)
                                        ).toFixed(2)}
                                      </span>
                                      {/* Original price */}
                                      {camera.variants.some(
                                        (variant) => variant.discount > 0
                                      ) && (
                                        <span className="text-xs text-gray-500 font-semibold font-heading line-through ml-1">
                                          $
                                          {getLowestPrice(
                                            camera.variants
                                          ).toFixed(2)}
                                        </span>
                                      )}
                                    </p>
                                    {/* Rating stars */}
                                    <div>
                                      <span className="text-yellow-400 text-sm">
                                        ★★★★★
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              </Link>
                              {/* Add to cart button */}
                              <a
                                className="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                                href="#"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="5"
                                    width="2"
                                    height="12"
                                    fill="#161616"
                                  />
                                  <rect
                                    x="12"
                                    y="5"
                                    width="2"
                                    height="12"
                                    transform="rotate(90 12 5)"
                                    fill="#161616"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
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
export default ShopPage;
