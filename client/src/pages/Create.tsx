import { 
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea
 } from "@chakra-ui/react"
import { Form } from "react-router-dom"
import { useRef } from "react"

export default function Create() {
  const nameRef = useRef<HTMLInputElement | null>(null)
  const priceRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const nameError = nameRef.current?.value === ''
  const priceError = nameRef.current?.value === ''

  return (
    <Box maxW='40rem'>
      <Heading>Create Nendoroid</Heading>
      <Form onSubmit={(e) => handleSubmit(e)}> 

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input ref={nameRef} type='text' name='name'/>
          {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
          <FormLabel>Price</FormLabel>
          <Input ref={priceRef} type='number' name='price'/>
          {priceError && <FormErrorMessage>Name is required.</FormErrorMessage>}
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter a detailed description for Nendoroid..."
            name='description'
            size='sm'
            resize='none'
          />
        </FormControl>

      </Form>
    </Box>
  )
}
