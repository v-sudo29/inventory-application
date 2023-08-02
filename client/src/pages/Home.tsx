import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Image, Stack, Text } from "@chakra-ui/react"

interface NendoroidObject {
  id: string,
  name: string,
  price: string,
  description: string,
  imageUrl: string
}

// Inventory list
export default function Home() {
  const [nendoroidsList, setNendoroidsList] = useState<NendoroidObject[] | null>(null)
  let cards: JSX.Element[] | null = null

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(data => setNendoroidsList(data.data))
  })

  if (nendoroidsList) {
    cards = nendoroidsList.map(obj => {
      return (
        <Stack key={`${obj.id}-home`} align='start'>
          <Image 
            src={obj.imageUrl} 
            alt={obj.name}
            objectFit='cover' 
            w='15rem'
            h='20rem'
          />
          <Box>
            <Text>{obj.name}</Text>
            <Text fontWeight='bold' >{obj.price}</Text>
          </Box>
        </Stack>
      )
    })
  }
  return (
    <div>
      {cards ? 
      <>{cards}</>
      : '...Loading'}
    </div>
  )
}
