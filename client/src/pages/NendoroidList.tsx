import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Heading, HStack, Grid, IconButton } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import ListCard from "../components/ListCard"
import NendoroidObject from "../interfaces/global_interface"

// Inventory list
export default function NendoroidList() {
  const [nendoroidsList, setNendoroidsList] = useState<NendoroidObject[] | null>(null)
  let cards: JSX.Element[] | null = null

  useEffect(() => {
    if (!nendoroidsList) {
      axios.get('http://localhost:3001/') // TODO: change path to /catalog
      .then(data => setNendoroidsList(data.data))
      .catch(err => console.error(err))
    }
  }, [nendoroidsList])

  if (nendoroidsList) {
    cards = nendoroidsList.map(nendoroid => 
        <ListCard
          key={`${nendoroid.name}-list-card`}
          nendoroid={nendoroid}
        />
    )
  }
  return (
    <Box pos='relative' w='100%'>
      <HStack justify='space-between'>
        <Heading>Catalog</Heading>
        <IconButton boxSize='3rem' aria-label='Create Nendoroid' icon={<AddIcon/> }/>
      </HStack>
      {cards ? 
      <Grid 
        flexWrap='wrap' 
        gap='2rem' 
        mt='2rem'
        templateColumns='repeat(auto-fit, minmax(12rem, 1fr))'
        justifyItems='stretch'
      >
        {cards}
      </Grid> : '...Loading'}
    </Box>
  )
}
