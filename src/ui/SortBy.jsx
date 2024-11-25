import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort") || "";


  const handleChange = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };




  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
