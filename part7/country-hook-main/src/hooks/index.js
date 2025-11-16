import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')
  
  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

    useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry(response)
      })
      .catch(error => {
        console.log("The following error occurred: ", error)
        setCountry({ found: false, data: null })
        })
  }, [name])

  return country
}
