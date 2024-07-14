import { useEffect, useRef, useState } from "react";
import useLocationSearch from "./useLocationSearch";

const LocationSearchInput = ({
  id,
  name,
  label,
  onChange = () => null,
  required = false,
  containerClass = ""
}: {
  id: string;
  name: string;
  label: string;
  containerClass?: string;
  onChange?: (val: object) => null;
  required?: boolean;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { searchNominatim, results, isLoading, error } = useLocationSearch(
    1000,
    2000
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onChange(option);
    setQuery(option.name);
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setQuery("");
    setIsOpen(false);
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(e.target.value);

    if (newQuery.trim()) {
      searchNominatim(newQuery);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const renderDropdown = () => {
    if (!isOpen) return null;

    if (isLoading) {
      return (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-lg">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-2 animate-pulse">
              <div className="h-5 bg-vlgrey rounded w-full"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          <div className="p-2 text-red-500">{error}</div>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          <div className="p-2">No results found</div>
        </div>
      );
    }

    return (
      <ul
        role="listbox"
        className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        {results.map((result) => (
          <li
            key={result?.place_id}
            role="option"
            aria-selected="false"
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectOption(result)}
            onKeyDown={() => handleSelectOption(result)}
          >
            <h2 className="text-grey">{result?.name}</h2>
            <h3 className="text-grey opacity-85 text-sm">{result?.address}</h3>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={"flex flex-col gap-1".concat(containerClass)}
      ref={dropdownRef}
    >
      <label htmlFor={id} className="text-sm text-lgrey font-medium">
        {label}
      </label>
      <div className="relative text-base font-normal w-full text-grey rounded-md shadow-[0_2px_4px_0_rgba(0,0,0,0.25),0_2px_4px_0_rgba(0,0,0,0.25)]">
        <input
          id={id}
          name={name}
          readOnly
          value={JSON.stringify(selectedOption)}
          required={required}
          hidden
        />
        <input
          placeholder="Type to search"
          type="text"
          value={query}
          hidden={!!selectedOption}
          onChange={handleQueryChange}
          className="w-full rounded-md p-2"
        />
        {selectedOption && (
          <div className="flex justify-between w-full p-2 bg-white rounded-md">
            {selectedOption?.name}
            <button onClick={handleReset} className="">
              x
            </button>
          </div>
        )}
        {renderDropdown()}
      </div>
    </div>
  );
};

export default LocationSearchInput;
