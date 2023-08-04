import {
  Box,
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
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import NendoroidObject from "../interfaces/NendoroidObject"

export default function NendoroidDetail() {
  const [nendoroid, setNendoroid] = useState<NendoroidObject | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params = useParams()
  const id = params.id


  useEffect(() => {
    if (!nendoroid && id) {
      axios.get(`http://localhost:3001/nendoroid/${id}`)
        .then(result => setNendoroid(result.data[0]))
        .catch(err => console.log(err))
    }
  }, [nendoroid, id])

  if (nendoroid) return (
    <VStack align='start' w='100%' h='100%'>
      <Heading fontSize='2rem' fontWeight='500'>Nendoroid {nendoroid.name}</Heading>
      <HStack align='start' h='100%' w='100%'>
        <Box overflow='hidden' maxW='30rem' h='40rem'>
          <img src={nendoroid.imageUrl.includes('http') ? nendoroid.imageUrl : `http://localhost:3001/images/${nendoroid.imageUrl}`}
            style={{ height: '40rem', objectFit: 'cover'}}
          />
        </Box>

        {/* INFO DETAILS */}
        <VStack align='start' gap='1rem' h='100%' w='100%' flexWrap='wrap'>
          <Text><b>Description:</b> {nendoroid.description}</Text>
          <Text><b>Price:</b> {nendoroid.price.includes('$') ? nendoroid.price : '$' + nendoroid.price}</Text>
          <Text><b>Units: </b>{nendoroid.units < 20 ? 
            <span>
              <>{nendoroid.units}</> 
              <em>&nbsp;&nbsp;&nbsp;Low in stock</em>
            </span>: 
            nendoroid.units}
          </Text>
          <Text><b>Image Source: </b>{nendoroid.imageUrl}</Text>

        {/* UPDATE AND DELETE BUTTONS */}
          <HStack>
            <Button onClick={onOpen}>Update</Button>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
              <ModalOverlay/>
              <ModalContent>
                <ModalHeader>Update Nendoroid</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant='ghost'>Update</Button>
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
