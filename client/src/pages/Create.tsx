import { Button, Heading, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import NendoroidForm from "../components/NendoroidForm"
import axios from "axios"

export default function Create() {
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const unitsRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (nameRef.current && priceRef.current && descriptionRef.current && imageUrlRef.current
      && unitsRef.current && imageUrlRef.current.files && fileData) {
      const formData = new FormData()
      formData.append('file', fileData)
      formData.append('name', nameRef.current.value)
      formData.append('price', (priceRef.current.firstElementChild as HTMLInputElement).value)
      formData.append('units', (unitsRef.current.firstElementChild as HTMLInputElement).value)
      formData.append('description', descriptionRef.current.value)
      formData.append('imageUrl', '')

      axios.post('/api/create', formData)
        .then(() => {
          navigate('/api')
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

  const createButton = <Button type="submit" w='10rem' >Create</Button>

  return (
    <VStack
      gap='1rem'
      align='start'
      maxW='40rem'
      minW='20rem'
    >
      <Heading>Create Nendoroid</Heading>
      <NendoroidForm
        nameRef={nameRef}
        priceRef={priceRef}
        unitsRef={unitsRef}
        descriptionRef={descriptionRef}
        imageUrlRef={imageUrlRef}
        nameError={nameError}
        priceError={priceError}
        descriptionError={descriptionError}
        button={createButton}
        handleSubmit={handleSubmit}
        setFileData={setFileData}
      />
    </VStack>
  )
}
