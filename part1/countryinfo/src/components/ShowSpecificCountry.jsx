import React from 'react'

const ShowSpecificCountry = ({name, capital, area, languages, imgSrc, imgAlt}) => {
  return (
    <>
          <h1>{name}</h1>
          <p>Capital: {capital}</p>
          <p>Area: {area}</p>

          <h2>languages:</h2>
          <div>
      {console.log("country languages",languages)}
    <ul>
    {Object.values(languages).map((language, index) => (
    <li key={index}>{language}</li>
  ))}
    </ul>
<img src={imgSrc} alt={imgAlt} />
          </div>
          
        </>
  )
}

export default ShowSpecificCountry