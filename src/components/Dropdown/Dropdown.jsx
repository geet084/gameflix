import React from 'react';

export const Dropdown = ({ id, name, value, range, handleSearch }) => {
  let options

  if (!name.includes('mins')) {
    options = range.map((val, i) => <option key={val} value={i}>{val}</option>);
  } else {
    options = range.map(val => {
      const value = parseInt(val.split(' ').shift());
      return <option key={val} value={isNaN(value) ? 121 : value}>{val}</option>;
    })
  }

  return (
    <span className="dropdown">
      <label htmlFor={id}>{name}</label>
      <select id={id} value={value} onChange={handleSearch}>
        {options}
      </select>
    </span>
  )
}

export default Dropdown;