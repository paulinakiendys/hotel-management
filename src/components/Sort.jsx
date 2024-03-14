import { useSearchParams } from "react-router-dom";

export default function Sort({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    const [option, direction] = e.target.value.split("-");
    searchParams.set("sort", option);
    searchParams.set("dir", direction);
    setSearchParams(searchParams);
  }
  return (
    <div className="form-floating">
      <select
        className="form-select"
        aria-label="Sort by"
        value={value}
        onChange={handleChange}
        name="sort"
        id="sortSelect"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor="sortSelect">Sort by</label>
    </div>
  );
}
