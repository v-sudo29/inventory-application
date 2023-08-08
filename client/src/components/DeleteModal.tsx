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

import axiosConfig from '../axiosConfig'
import { useNavigate } from "react-router-dom"

interface DeleteModal {
  isOpen: boolean,
  onClose: () => void,
  id: string | undefined
}

export default function DeleteModal({
  isOpen,
  onClose,
  id
}: DeleteModal) {
  const navigate = useNavigate()

  const handleDelete = () => {
    axiosConfig.delete(`/nendoroid/${id}/delete/`)
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
