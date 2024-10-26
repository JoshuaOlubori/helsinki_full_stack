import React from 'react'

const CountrySearch = ({ searchTerm, handleSearch }) => {
    return (
        <span>
            <input type="text" placeholder='Search countries' value={searchTerm} onChange={handleSearch} />
        </span>
    )
}

export default CountrySearch