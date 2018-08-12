import React from 'react'

const FilterForm = ({ filter, handleFilterChange }) => {
  return(
    <div>
      rajaa: 
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default FilterForm