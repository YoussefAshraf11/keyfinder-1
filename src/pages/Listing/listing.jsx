import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/Searchbar/searchbar.jsx";
import { ChevronDown } from "lucide-react";
import { getProperties } from "../../network/project";
import { setPropertiesList, setLoading, setProjectError } from "../../store/projectSlice";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES } from "../../utils/constants";
import PropertyCardInList from "./PropertyCardInList";

export default function PropertyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.project.properties);
  const loading = useSelector((state) => state.project.loading);

  const [searchValue, setSearchValue] = useState("");
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [imageErrors, setImageErrors] = useState({});

  const fetchProperties = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getProperties({ 
        all: !selectedProperty && !selectedArea && !selectedPrice && !searchValue,
        key: searchValue || undefined,
        type: selectedProperty || undefined,
        areaRange: selectedArea || undefined,
        priceRange: selectedPrice || undefined
      });
      dispatch(setPropertiesList(response.data.data.properties));
      console.log('Properties fetched:', response.data.data.properties);
    } catch (error) {
      dispatch(setProjectError(error.message));
      console.error('Error fetching properties:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [dispatch,searchValue,selectedProperty,selectedArea,selectedPrice]);



  useEffect(() => {
    console.log('selectedArea', selectedArea);
  }, [selectedArea]);

  const toggle = (dropdown) => {
    setShowPropertyType(dropdown === "property");
    setShowArea(dropdown === "area");
    setShowPrice(dropdown === "price");
  };

  const propertyTypes = Object.keys(PROPERTY_TYPES).filter(key => key !== 'all');
  const areaOptions = Object.keys(AREA_RANGES).filter(key => key !== 'all');
  const priceOptions = Object.keys(PRICE_RANGES).filter(key => key !== 'all');

  /* ─ favourites state ─ */
  const [favIds, setFavIds] = useState(() =>
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  /* keep localStorage in-sync */
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favIds));
  }, [favIds]);

  const toggleFav = (id) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
    /* redirect */
    navigate("/favourites");
  };

  const handleImageError = (propertyId) => {
    setImageErrors(prev => ({
      ...prev,
      [propertyId]: true
    }));
  };

  // if (loading) {
  //   return (
  //     <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
  //       <div className="text-xl text-[#002855]">Loading properties...</div>
  //     </div>
  //   );
  // }

  return (
    <section className="bg-white pt-8 pb-14 px-4 md:px-8 max-w-5xl mx-auto">
      {/* search */}
      <SearchBar
        placeholder="Search Properties…"
        wrapperClassName="w-full max-w-md mx-auto"
        inputClassName="bg-[#001731] text-gray-200 placeholder-gray-400"
        buttonClassName="bg-[#002349] hover:bg-[#032d6b]"
        iconClassName="h-4 w-4"
        value={searchValue}
        onChange={setSearchValue}
        // onSearch={handleSearch}
      />

      <div className="mt-4 flex flex-wrap justify-center gap-3 relative">
        {/* Property Type */}
        <div className="relative">
          <button
            onClick={() => toggle("property")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedProperty ? PROPERTY_TYPES[selectedProperty] : "Property Type"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPropertyType && (
            <ul className="absolute mt-2 w-48 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              <li
                key="all"
                onClick={() => {
                  setSelectedProperty("");
                  setShowPropertyType(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Types
              </li>
              {propertyTypes.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedProperty(item);
                    setShowPropertyType(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {PROPERTY_TYPES[item]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Area */}
        <div className="relative">
          <button
            onClick={() => toggle("area")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedArea ? AREA_RANGES[selectedArea] : "Area"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showArea && (
            <ul className="absolute mt-2 w-56 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              <li
                key="all"
                onClick={() => {
                  setSelectedArea("");
                  setShowArea(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Areas
              </li>
              {areaOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedArea(item);
                    setShowArea(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {AREA_RANGES[item]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Average Price */}
        <div className="relative">
          <button
            onClick={() => toggle("price")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedPrice ? PRICE_RANGES[selectedPrice] : "Average Price"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPrice && (
            <ul className="absolute mt-2 w-52 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              <li
                key="all"
                onClick={() => {
                  setSelectedPrice("");
                  setShowPrice(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Prices
              </li>
              {priceOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedPrice(item);
                    setShowPrice(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {PRICE_RANGES[item]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading ?(
        <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
          <div className="text-xl text-[#002855]">Loading properties...</div>
        </div>
      ): properties.length === 0 ? (
        <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
          <div className="text-xl text-[#002855]">No properties found</div>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {properties.map((property) => (
            <PropertyCardInList
              key={property._id}
              property={property}
              isFavorite={favIds.includes(property._id)}
              onToggleFavorite={toggleFav}
              hasImageError={imageErrors[property._id]}
              onImageError={handleImageError}
            />
          ))}
        </div>
      )}


    </section>
  );
}
