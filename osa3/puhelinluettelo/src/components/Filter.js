
import React from 'react'
const Filter = ({ query, handleChange }) => {
    return(
    <p>
        filter shown with <input value={query} onChange={handleChange} />
    </p>
    )
}

export default Filter