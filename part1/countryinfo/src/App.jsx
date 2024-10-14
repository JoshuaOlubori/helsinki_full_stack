import React, { useState, useEffect } from 'react'
import CountrySearch from './components/CountrySearch';
import countriesService from './services/countries';
import ShowCountries from './components/ShowCountries';
import ShowSpecificCountry from './components/ShowSpecificCountry';


const App = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [countries, setCountries] = useState([]);
  const [warning, setWarning] = useState("");
  const [toggleButton, setToggleButton] = useState(true);
  const [specificCountryInfo, setSpecificCountryInfo] = useState(null);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const revealCountry = (name) =>{
  
    // setToggleButton(!toggleButton);
      countriesService.getSpecific(name).then(
        returnedCountry => {
          console.log("RETURNED COUNTRY IS ", returnedCountry);
          setSpecificCountryInfo(returnedCountry);
          setToggleButton(prev => !prev)
        }
  
        
      ).catch(error =>{
        console.log("ERROR IN RETURNING SPECIFIC COUNTRY", error)
      })
     
   
    

    
   }


  useEffect(() => {
    console.log("Effect started");
    countriesService.getAll().then(
      initialCountries => {
        console.log("INITIAL COUNTRIES", initialCountries);
        const filteredCountries = initialCountries.filter(country => country.name.official.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (filteredCountries.length > 10) {
          setWarning("Too many matches, specify another filter");
          setCountries([]);
        }else{
          setWarning("");
          setCountries(filteredCountries);
        }
       

        console.log("FILTERED COUNTRIES", filteredCountries);

        console.log(" COUNTRIES", countries);
      }
    )
  }, [searchTerm]);




  return (
    <div>
    <span>Find countries </span>
    
    <CountrySearch 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm} 
      handleSearch={handleSearch} 
    />

    { (searchTerm === null || searchTerm === "") ? <p></p>: (
      <>
    <p>{warning}</p>
    <ul>
      {countries.length === 1 ? (
        <ShowSpecificCountry name={countries[0].name.common}
        capital={countries[0].capital[0]}
        area={countries[0].area}
        languages={countries[0].languages}
        imgSrc={countries[0].flags.png}
        imgAlt={countries[0].flags.alt}
        />
        
      ) : (
        countries.map((country) => (
          <ShowCountries toggleButton={toggleButton} revealCountry={revealCountry} officialName={country.name.official} specificCountryInfo={specificCountryInfo} />
        ))
      )}
    </ul></>)}
  </div>
  )
}
export default App