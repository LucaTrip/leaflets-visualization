import React, { useState } from "react";

import FilterBox from "../components/FilterBox";

const filters = [
  {
    id: "sort",
    name: "Sort",
    values: [
      { id: "asc", displayValue: "ASC", value: 1, isActive: true },
      { id: "desc", displayValue: "DESC", value: -1, isActive: false },
    ],
  },
  {
    id: "distance",
    name: "Distance",
    values: [
      { id: "10km", displayValue: "10km", value: 10000, isActive: false },
      { id: "30km", displayValue: "30km", value: 30000, isActive: false },
    ],
  },
  {
    id: "limit",
    name: "Pagination",
    values: [
      { id: "10", displayValue: "10", value: 10, isActive: false },
      { id: "30", displayValue: "30", value: 30, isActive: true },
    ],
  },
  {
    id: "name",
    name: "Search",
    values: [],
  },
];

const Filters = () => {
  console.log("FILTERS");
  const [availableFilters, setFilters] = useState(filters);

  const handleOnButtonPress = (filterId: string, filterValueId: string) => {
    setFilters((prevFiltersValue) => {
      let newFiltersValue = prevFiltersValue.map((filter) => {
        for (let filterValue of filter.values) {
          if (filter.id === filterId) {
            filterValue.isActive = false;

            if (filterValue.id === filterValueId) {
              filterValue.isActive = !filterValue.isActive;
            }
          }
        }

        return filter;
      });

      return newFiltersValue;
    });
  };

  return (
    <div className="inline-flex w-full overflow-x-scroll pb-3">
      {availableFilters.map((filter) => (
        <FilterBox {...filter} key={filter.id} onClick={handleOnButtonPress} />
      ))}
    </div>
  );
};

export default Filters;
