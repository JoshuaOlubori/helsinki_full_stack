import React from 'react'
import ShowSpecificCountry from './ShowSpecificCountry'


const ShowCountries = ({toggleButton, officialName, revealCountry, specificCountryInfo}) => {
 // console.log("specificCountryInfo name", specificCountryInfo.name.common)
  return (
    <>
    <li key={officialName}>{officialName}</li>

    <button onClick={() => revealCountry(officialName)}>{toggleButton?"close":"show"}</button>

{toggleButton && specificCountryInfo && (officialName === specificCountryInfo.name.official) &&
   <ShowSpecificCountry name={specificCountryInfo.name.common}
     capital={specificCountryInfo.capital} 
     area={specificCountryInfo.area}  
     languages={specificCountryInfo.languages} 
     imgSrc={specificCountryInfo.flags.png} 
     imgAlt={specificCountryInfo.flags.alt} />
}
    </>
  )
}

export default ShowCountries