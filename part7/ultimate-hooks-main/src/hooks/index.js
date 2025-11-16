import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = type => {
  const [value, setValue] = useState('')
  const onChange = event => {
    setValue(event.target.value)
  }
  const reset = value => {
    setValue(value)
  }
  const  inputProps = {type,value,onChange,}
    return {reset, inputProps}       
}

 
export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAll();
  }, [])

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources([...response.data]);
  }

  const create = async resource => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
  }

  const service = {
    create
  }

  return [resources, service]
}
  