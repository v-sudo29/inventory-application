import {
  Button,
  Heading,
  Text,
  HStack,
  Stack,
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axiosConfig from '../axiosConfig'
import NendoroidObject from "../interfaces/global_interface"
import UpdateModal from "../components/UpdateModal"
import DeleteModal from "../components/DeleteModal"

export default function NendoroidDetail() {
  const [nendoroid, setNendoroid] = useState<NendoroidObject | null>(null)
  const [fileData, setFileData] = useState<File | null>(null)
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
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
      axiosConfig.get(`/nendoroid/${id}`)
        .then(result => setNendoroid(result.data))
        .catch(err => console.log(err))
    }
  }, [nendoroid, id])

  if (nendoroid) console.log('nendoroid and id: ',nendoroid, id)

  const handleUpdateInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault() // TODO: remove e param
    let objectResponse

    if (nendoroid && nameRef.current && priceRef.current && descriptionRef.current && unitsRef.current && imageUrlRef.current) {
      if (fileData) {
        objectResponse = new FormData()

        objectResponse.append('file', fileData)
        objectResponse.append('name', nameRef.current.value)
        objectResponse.append('price', (priceRef.current.firstElementChild as HTMLInputElement).value)
        objectResponse.append('units', (unitsRef.current.firstElementChild as HTMLInputElement).value)
        objectResponse.append('description', descriptionRef.current.value)
        objectResponse.append('imageUrl', 'hi')
        console.log(objectResponse)
      } else {

        objectResponse = {
          name: nameRef.current.value,
          price: (priceRef.current.firstElementChild as HTMLInputElement).value,
          units: (unitsRef.current.firstElementChild as HTMLInputElement).value,
          description: descriptionRef.current.value,
          imageName: nendoroid.imageName
        }
      }
      axiosConfig.post(`/nendoroid/${id}/update`, objectResponse)
        .then(() => {
          onUpdateClose()
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
          <img src={nendoroid.imageUrl}
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
          <Text><b>Price:</b> {nendoroid.price && nendoroid.price.includes('$') ? nendoroid.price : '$' + nendoroid.price}</Text>
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
            <Button colorScheme='blue' onClick={onUpdateOpen}>Update</Button>
            <Button onClick={onDeleteOpen}>Delete</Button>
            {/* UPDATE MODAL */}
            <UpdateModal
              nendoroid={nendoroid}
              isOpen={isUpdateOpen}
              onClose={onUpdateClose}
              nameRef={nameRef}
              priceRef={priceRef}
              unitsRef={unitsRef}
              descriptionRef={descriptionRef}
              imageUrlRef={imageUrlRef}
              setFileData={setFileData}
              handleUpdateInfo={handleUpdateInfo}
            />
            {/* DELETE MODAL */}
            <DeleteModal
              isOpen={isDeleteOpen}
              onClose={onDeleteClose}
              id={id}
            />
        </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
  
  else return <>...Loading</>
    
}
