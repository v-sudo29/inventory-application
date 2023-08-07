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

import NendoroidForm from "./NendoroidForm"
import NendoroidObject from "../interfaces/global_interface"

interface UpdateModal {
  nendoroid: NendoroidObject | null,
  isOpen: boolean,
  onClose: () => void,
  nameRef: React.RefObject<HTMLInputElement>,
  priceRef: React.RefObject<HTMLInputElement>,
  unitsRef: React.RefObject<HTMLInputElement>,
  descriptionRef: React.RefObject<HTMLTextAreaElement>,
  imageUrlRef: React.RefObject<HTMLInputElement>,
  setFileData: React.Dispatch<React.SetStateAction<File | null>>,
  handleUpdateInfo:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function UpdateModal({
  nendoroid, 
  isOpen, 
  onClose,
  nameRef,
  priceRef,
  unitsRef,
  descriptionRef,
  imageUrlRef,
  setFileData,
  handleUpdateInfo
} : UpdateModal) {

  if (nendoroid) return (
    <Modal initialFocusRef={nameRef} isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Update Nendoroid</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NendoroidForm
            nameValue={nendoroid.name}
            priceValue={nendoroid.price}
            unitsValue={nendoroid.units}
            descriptionValue={nendoroid.description}

            nameRef={nameRef}
            priceRef={priceRef}
            unitsRef={unitsRef}
            descriptionRef={descriptionRef}
            imageUrlRef={imageUrlRef}

            setFileData={setFileData}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={(e) => handleUpdateInfo(e)}>Update</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
