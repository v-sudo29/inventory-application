import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text
} from "@chakra-ui/react"

import axios from "axios"
import { useNavigate } from "react-router-dom"

interface DeleteModal {
  isOpen: boolean,
  onClose: () => void,
  imagePath: string,
  id: string | undefined
}

export default function DeleteModal({
  isOpen,
  onClose,
  imagePath,
  id
}: DeleteModal) {
  const navigate = useNavigate()

  const handleDelete = () => {
    const payload = { imagePath: imagePath }
    axios.post(`/api/nendoroid/${id}/delete/`, payload)
      .then(() => {
        onClose()
        navigate(`/`) // Go back to catalog page
      })
      .catch(err => console.error(err))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this item?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => handleDelete()} variant='ghost'>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
