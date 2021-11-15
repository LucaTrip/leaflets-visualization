import React, { useContext, useState } from "react";

import { GlobalContext } from "../context/GlobalContext";
import { Types } from "../utils/reducers";

interface FilterValue {
  id: string;
  displayValue: string;
  value: number;
  isActive: boolean;
}

type Props = {
  id: string;
  name: string;
  values: FilterValue[];
  onClick: (filterId: string, filterValueId: string) => void;
};

const FilterBox: React.FC<Props> = ({ id, name, values, onClick }) => {
  const [inputNameValue, setInputNameValue] = useState("");

  const context = useContext(GlobalContext);

  const handleNameSubmit = (event: any) => {
    event.preventDefault();
    context.dispatch({
      type: Types.change_name,
      payload: { value: inputNameValue },
    });
  };

  return (
    <div className="relative pt-2 mx-4 md:m-auto whitespace-nowrap">
      <span className="absolute -top-1 left-5 bg-gray-200 px-1">{name}</span>

      <div className="border-2 border-black rounded-lg pt-1">
        {values.length
          ? values.map((item) => (
              <button
                onClick={() => {
                  onClick(id, item.id);

                  switch (id) {
                    case "sort":
                      context.dispatch({
                        type: Types.change_sort,
                        payload: { value: item.value },
                      });
                      break;

                    case "distance":
                      context.dispatch({
                        type: Types.change_max_distance,
                        payload: { value: item.value },
                      });
                      break;

                    case "limit":
                      context.dispatch({
                        type: Types.change_limit,
                        payload: { value: item.value },
                      });
                      break;

                    default:
                      break;
                  }
                }}
                key={item.displayValue}
                className={`${
                  item.isActive
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                } rounded-lg px-3 py-2 m-2 font-semibold`}
              >
                {item.displayValue}
              </button>
            ))
          : undefined}

        {!values.length ? (
          <form onSubmit={handleNameSubmit}>
            <input
              value={inputNameValue}
              onChange={(e) => setInputNameValue(e.currentTarget.value)}
              type="text"
              className="rounded-lg px-3 py-2 m-2 font-semibold"
            />
            <input
              type="submit"
              value="Go"
              className="bg-blue-500 text-white rounded-lg px-3 py-2 m-2 font-semibold"
            />
          </form>
        ) : undefined}
      </div>
    </div>
  );
};

export default React.memo(FilterBox);
