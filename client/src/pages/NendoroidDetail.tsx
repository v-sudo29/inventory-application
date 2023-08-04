import {
  Button,
  Heading,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import NendoroidForm from "../components/NendoroidForm"
import NendoroidObject from "../interfaces/global_interface"

export default function NendoroidDetail() {
  const [nendoroid, setNendoroid] = useState<NendoroidObject | null>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const unitsRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  useEffect(() => {
    if (!nendoroid && id) {
      axios.get(`http://localhost:3001/nendoroid/${id}`)
        .then(result => setNendoroid(result.data[0]))
        .catch(err => console.log(err))
    }
  }, [nendoroid, id])

  const handleUpdateInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    let objectResponse

    if (nendoroid && nameRef.current && priceRef.current && descriptionRef.current && unitsRef.current && imageUrlRef.current) {
      if (fileData) {
        objectResponse = new FormData()
        console.log('ran!')

        // objectResponse.append('file', fileData ? fileData : 'no file')
        objectResponse.append('file', fileData)
        objectResponse.append('name', nameRef.current.value)
        objectResponse.append('price', (priceRef.current.firstElementChild as HTMLInputElement).value)
        objectResponse.append('units', (unitsRef.current.firstElementChild as HTMLInputElement).value)
        objectResponse.append('description', descriptionRef.current.value)
        objectResponse.append('imageUrl', 'hi')
      } else {
        console.log('else statement ran!')
        objectResponse = {
          name: nameRef.current.value,
          price: (priceRef.current.firstElementChild as HTMLInputElement).value,
          units: (unitsRef.current.firstElementChild as HTMLInputElement).value,
          description: descriptionRef.current.value,
          imageUrl: nendoroid.imageUrl
        }
      }
      axios.post(`http://localhost:3001/nendoroid/${id}/update`, objectResponse)
        .then(result => {
          console.log(result)
          onClose()
          navigate(0) // Refresh detail page
        }) 
        .catch(err => console.log(err))
    }
  }

  if (nendoroid) return (
    <VStack align='start' w='100%' h='100%'>
      <Heading fontSize='2rem' fontWeight='500'>Nendoroid {nendoroid.name}</Heading>
      <HStack align='start' h='100%' w='100%' gap='3rem'>
        <Stack overflow='hidden' minW='20rem' maxW='30rem' minH='15rem' maxH='30rem'>
          <img src={nendoroid.imageUrl.includes('http') ? nendoroid.imageUrl : `http://localhost:3001/images/${nendoroid.imageUrl}`}
            style={{ height: '30rem', objectFit: 'cover'}}
          />
        </Stack>

        {/* INFO DETAILS */}
        <VStack 
          align='start' 
          gap='1rem' 
          h='100%' 
          minW='30rem'
          maxW='100%' 
          flexWrap='wrap'
        >
          <Text><b>Description:</b> {nendoroid.description}</Text>
          <Text><b>Price:</b> {nendoroid.price.includes('$') ? nendoroid.price : '$' + nendoroid.price}</Text>
          <Text><b>Units: </b>{nendoroid.units < 20 ? 
            <span>
              <>{nendoroid.units}</> 
              <em>&nbsp;&nbsp;&nbsp;Low in stock</em>
            </span>: 
            nendoroid.units}
          </Text>
          <Stack w='100%'>
            <Text><b>Image Source: </b>{nendoroid.imageUrl}</Text>
          </Stack>
        {/* UPDATE AND DELETE BUTTONS */}
          <HStack>
            <Button onClick={onOpen}>Update</Button>

            {/* UPDATE MODAL */}
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
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
        </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
  
  else return <>...Loading</>
    
}
