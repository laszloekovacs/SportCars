/* App container */
import React, { useState, useReducer } from 'react';
import propTypes from 'prop-types';
import { headers, cars } from './carData';

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggleOrdering':
      let sortedCars = clone(state.cars);
      const key = action.payload.dataset['key'];

      sortedCars.sort((a, b) => (a[key] >= b[key] ? 1 : -1));

      return { ...state, cars: sortedCars };

    default:
      console.log('no sutch action');
      return state;
  }
}

/*
 *
 */
function App({ cars, headers }) {
  const [showFiltering, setShowFiltering] = useState(false);
  const [filterString, setFilterString] = useState('');
  const [data, dispatch] = useReducer(reducer, { cars, headers });

  function toggleOrdering(event) {
    event.preventDefault();
    dispatch({ type: 'toggleOrdering', payload: event.target });
  }

  function filterHandler(event) {
    event.preventDefault();
    console.log('filtering');
  }

  let find = null;
  if (showFiltering) {
    find = (
      <form onSubmit={filterHandler}>
        <input
          type="text"
          name="searchString"
          id="searchString"
          value={filterString}
          onChange={(e) => {
            setFilterString(e.target.value);
            dispatch({ type: 'filter', payload: filterString });
          }}
        />
      </form>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setShowFiltering(!showFiltering);
        }}
      >
        Find
      </button>
      {find}
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index} data-key={index} onClick={toggleOrdering}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.cars.map((c, k) => {
            return (
              <tr key={k}>
                {c.map((item, i) => {
                  return <td key={i}>{item}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

App.propTypes = {
  cars: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)),
};

App.defaultProps = {
  cars,
  headers,
};

export default App;
