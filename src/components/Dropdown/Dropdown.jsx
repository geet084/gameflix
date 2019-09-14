import React from 'react';

export const Dropdown = ({ id, name, value, range, handleSearch }) => {
  let options

  if (!name.includes('mins')) {
    options = range.map((val, i) => <option key={val} value={i}>{val}</option>);
  } else {
    options = range.map(val => {
      const value = isNaN(parseInt(val.split(' ').shift())) ? 121 : val;
      return <option key={val} value={value}>{val}</option>
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