import React, { useState, useEffect } from 'react'
import CountrySearch from './components/CountrySearch';
import countriesService from './services/countries';


const App = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [countries, setCountries] = useState([]);
  const [warning, setWarning] = useState("");


  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
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
    <p>{warning}</p>
    <ul>
      {countries.length === 1 ? (
        <>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital[0]}</p>
          <p>Area: {countries[0].area}</p>

          <h2>languages:</h2>
          <div>
      {console.log("country languages",countries[0].languages)}
    <ul>
    {Object.values(countries[0].languages).map((language, index) => (
    <li key={index}>{language}</li>
  ))}
    </ul>
<img src={countries[0].flags.png} alt={countries[0].flags.alt} />
          </div>
          
        </>
      ) : (
        countries.map((country) => (
          <li key={country.name.official}>{country.name.official}</li>
        ))
      )}
    </ul>
  </div>
  )
}
export default App