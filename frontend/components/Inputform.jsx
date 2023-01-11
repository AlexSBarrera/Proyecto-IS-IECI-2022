import React from 'react'
import {FormControl, FormLabel, Input} from '@chakra-ui/react'

const Inputform = ({label, handleChange, name, placeholder, type, value}) => {
  return (
    <FormControl id={name} isRequired>
                <FormLabel>{label}</FormLabel>
                <Input type={type} placeholder={placeholder} onChange={handleChange} value={value}/>
            </FormControl>
  )
}

export default Inputform