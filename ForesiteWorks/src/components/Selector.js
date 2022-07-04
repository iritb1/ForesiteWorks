import React, { useEffect, useState } from "react";
import "./Selector.css";
import { Tasks } from "../Config";

/**
 * This component is a custom selector, it allows for the selection of mulitipule fields by
 * using select/deselect button option or using checkboxes.
 * It console log to the console window the select item values.
 */

function Selector({ options }) {
  const [searchVal, setSearchVal] = useState("");
  const [text, setText] = useState("select all");
  const [filters, setFilters] = useState(options);

  /**
   * A function that pushes check box field name to search bar
   */
  const handelFilters = (event, index) => {
    filters[index].check = event.checked;
    logFieldValues(filters[index].value);
    setFilters([...filters]);
    const search = [];
    for (let item of filters) {
      if (item.check) {
        search.push(item.value);
      }
    }
    setSearchVal(search.toString() + ",");
  };

  useEffect(() => {
    const allSelected = filters.every((item) => item.check == true);
    if (allSelected) setText("deselect all");
    else setText("select all");
  }, [filters]);

  /**
 * A function that handels select all buttom functionality
 */
  const handelFilterSelect = () => {
    const search = [];
    if (text === "select all") {
      filters.forEach((item) => {
        item.check = true;
        search.push(item.value);
        logFieldValues(item.value);
      });
      setFilters([...filters]);
    } else {
      filters.forEach((item) => {
        item.check = false;
      });
      setFilters([...filters]);
    }
    setSearchVal(search.toString());
  };

  /**
   * A function that determines wether a checkbox will be rendered to the screen or not.
   */
  const showElement = (item) => {
    let toSearch = searchVal.split(",");
    toSearch = toSearch[toSearch.length - 1];
    if (!toSearch) {
      return true;
    }
    if (item.check) {
      return true;
    }
    return item.value.includes(toSearch);
  };

  /**
   * A function that console logs the values of a checked field
   */
  const logFieldValues = (value) => {
    Tasks.forEach((task) => {
      console.log(task[value]);
    });
  };

  return (
    <div className="selector">
      <details>
        <summary>
          <input
            className="category"
            type="text"
            onChange={(event) => setSearchVal(event.target.value)}
            value={searchVal}
            placeholder="Search by category"
          />
        </summary>
        <ul className="items">
          {filters.map((item, index) => {
            return (
              <>
                {showElement(item) && (
                  <div key={index} className="lables-container">
                    <input
                      id={item.value}
                      value={item.value}
                      checked={item.check}
                      onChange={(event) => handelFilters(event.target, index)}
                      type="checkbox"
                    />
                    <label htmlFor={item.value} className="lables">
                      {item.value}
                    </label>
                  </div>
                )}
              </>
            );
          })}
          <button onClick={handelFilterSelect} className="button">
            {text}
          </button>
        </ul>
      </details>
    </div>
  );
}

export default Selector;
