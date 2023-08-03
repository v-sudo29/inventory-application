import { 
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  VStack,
  Textarea
 } from "@chakra-ui/react"
import { Form, useNavigate } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"

export default function Create() {
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('handleSubmit went off!')
    if (nameRef.current && priceRef.current && descriptionRef.current && imageUrlRef.current) {
      axios.post('http://localhost:3001/create', {
        name: nameRef.current.value,
        price: (priceRef.current.firstElementChild as HTMLInputElement).value,
        description: descriptionRef.current.value,
        imageUrl: imageUrlRef.current.value
      })
        .then(result => {
          console.log(result.data.price)
          navigate('/')
        })
        .catch(err => console.error(err))
    }
  }

  
  let nameError: boolean = false
  let priceError: boolean = false
  let descriptionError: boolean = false

  if (nameRef.current) nameError = nameRef.current.value === ''
  if (priceRef.current) priceError = priceRef.current.value === ''
  if (descriptionRef.current) descriptionError = descriptionRef.current.value === ''


  const formStyles = {
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    'gap': '1rem'
  }

  return (
    <VStack
      gap='1rem'
      align='start'
      maxW='50rem'
      minW='20rem'
    >
      <Heading>Create Nendoroid</Heading>
      <Form style={formStyles as React.CSSProperties} onSubmit={handleSubmit}> 

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input mb='1rem' ref={nameRef} type='text' name='name'/>
          {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
          <FormLabel>Price</FormLabel>
          <NumberInput ref={priceRef} precision={2} name='price'>
            <NumberInputField />
          </NumberInput>
          {priceError && <FormErrorMessage>Price is required.</FormErrorMessage>}
          <FormLabel>Image Url</FormLabel>
          <Input ref={imageUrlRef} type='text' name='url'/>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            ref={descriptionRef}
            placeholder="Enter a detailed description for Nendoroid..."
            name='description'
            h='null'
            minH='0'
            rows={10}
            resize='none'
          />
          {descriptionError && <FormErrorMessage>Description is required.</FormErrorMessage>}
        </FormControl>

        <Button type="submit">Create</Button>

      </Form>
    </VStack>
  )
}
