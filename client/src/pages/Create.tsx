import { 
  Button,
  Heading,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  Textarea
 } from "@chakra-ui/react"
import { Form, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import axios from "axios"

export default function Create() {
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (nameRef.current && priceRef.current && descriptionRef.current && imageUrlRef.current
      && imageUrlRef.current.files && fileData) {
      const formData = new FormData()
      formData.append('file', fileData)
      formData.append('name', nameRef.current.value)
      formData.append('price', (priceRef.current.firstElementChild as HTMLInputElement).value)
      formData.append('description', descriptionRef.current.value)
      formData.append('imageUrl', '')

      axios.post('http://localhost:3001/create', formData)
        .then(result => {
          console.log(result)
          navigate('/')
        }) 
        .catch(err => console.log(err))
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
          {/* NAME, PRICE */}
          <FormLabel>Name</FormLabel>
          <Input mb='1rem' ref={nameRef} type='text' name='name'/>
          {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
          <HStack w='100%'>
            <VStack w='100%' align='start'>
              <FormLabel>Price</FormLabel>
              <NumberInput w='100%' ref={priceRef} precision={2} name='price'>
                <NumberInputField />
              </NumberInput>
            </VStack>
            <VStack w='100%' align='start'>
              <FormLabel>Units</FormLabel>
              <NumberInput w='100%' max={500} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </HStack>
          {priceError && <FormErrorMessage>Price is required.</FormErrorMessage>}

          {/* DESCRIPTION, FILE */}
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
          <Input 
            ref={imageUrlRef} 
            type='file' 
            name='imageUrl'
            border='transparent'
            p='0rem'
            pt='0.2rem'
            mt='1rem'
            onChange={(e) => e.target.files && setFileData(e.target.files[0])} 
          />
        </FormControl>

        <Button type="submit">Create</Button>

      </Form>
    </VStack>
  )
}
