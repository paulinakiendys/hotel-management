import { useSearchParams } from "react-router-dom";

export default function Filter({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("filter", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div className="form-floating">
      <select
        className="form-select"
        aria-label="Filter by"
        value={value}
        onChange={handleChange}
        name="filter"
        id="filterSelect"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor="filterSelect">Filter by</label>
    </div>
  );
}
