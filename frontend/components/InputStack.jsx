import React from 'react'
import { Button, Stack, Input } from '@chakra-ui/react'

const InputStack = ({placeholder1,placeholder2, type, console}) => {
  return (
    <Stack spacing={3}>
        <Input placeholder={placeholder1} type={type}/>
        <Input placeholder={placeholder2}/>
        <Button colorScheme="teal" size="sm" onClick={console} >Summit</Button>
    </Stack>
  )
}

export default InputStack