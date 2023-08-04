import { Heading, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import NendoroidForm from "../components/NendoroidForm"
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
      <NendoroidForm
        formStyles={formStyles}
        nameRef={nameRef}
        priceRef={priceRef}
        descriptionRef={descriptionRef}
        imageUrlRef={imageUrlRef}
        nameError={nameError}
        priceError={priceError}
        descriptionError={descriptionError}
        handleSubmit={handleSubmit}
        setFileData={setFileData}
      />
    </VStack>
  )
}
