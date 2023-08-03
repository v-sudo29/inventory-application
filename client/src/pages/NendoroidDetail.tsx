import {
  Box,
  Heading,
  Text,
  HStack,
  VStack
} from "@chakra-ui/react"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import NendoroidObject from "../interfaces/NendoroidObject"

export default function NendoroidDetail() {
  const [nendoroid, setNendoroid] = useState<NendoroidObject | null>(null)
  const params = useParams()
  const id = params.id


  useEffect(() => {
    if (!nendoroid && id) {
      axios.get(`http://localhost:3001/nendoroid/${id}`)
        .then(result => setNendoroid(result.data[0]))
        .catch(err => console.log(err))
    }
    console.log(nendoroid)
  }, [nendoroid, id])

  if (nendoroid) return (
    <VStack align='start' w='100%' h='100%'>
      <Heading fontSize='2rem' fontWeight='500'>Nendoroid {nendoroid.name}</Heading>
      <HStack>
        <Box overflow='hidden' minW='25rem' h='40rem'>
          <img src={nendoroid.imageUrl.includes('http') ? nendoroid.imageUrl : `http://localhost:3001/images/${nendoroid.imageUrl}`}
            style={{ height: '40rem', objectFit: 'cover'}}
          />
        </Box>
        <VStack align='start' gap='1rem' h='100%'>
          <Text><b>Description:</b> {nendoroid.description}</Text>
          <Text><b>Price:</b> {nendoroid.price.includes('$') ? nendoroid.price : '$' + nendoroid.price}</Text>
          <Text><b>Image Source: </b>{nendoroid.imageUrl}</Text>
        </VStack>
      </HStack>
    </VStack>
  )
  
  else return <>...Loading</>
    
}
