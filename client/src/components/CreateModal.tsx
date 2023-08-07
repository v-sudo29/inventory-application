import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import NendoroidForm from "../components/NendoroidForm"
import axios from "axios"

export default function CreateModal({ isOpen, onClose } : { isOpen: boolean, onClose: () => void }) {
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const unitsRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
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
        .then(result => {
          console.log('created!')
          console.log(result)
          onClose()
          navigate(0)
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

return (
    <Modal initialFocusRef={nameRef} isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Update Nendoroid</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <NendoroidForm
          nameRef={nameRef}
          priceRef={priceRef}
          unitsRef={unitsRef}
          descriptionRef={descriptionRef}
          imageUrlRef={imageUrlRef}
          nameError={nameError}
          priceError={priceError}
          descriptionError={descriptionError}
          setFileData={setFileData}
        />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={(e) => handleSubmit(e)}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}