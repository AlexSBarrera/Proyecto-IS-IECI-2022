import React from 'react'
import {FormControl, FormLabel, Textarea} from '@chakra-ui/react'

const Textareainput = ({placeholder, handleChange, name, label, value}) => {
  return (
    <FormControl id={name}>
        <FormLabel>{label}</FormLabel>
        <Textarea placeholder={placeholder} onChange={handleChange} value={value}/>
    </FormControl>
  )
}

export default Textareainput