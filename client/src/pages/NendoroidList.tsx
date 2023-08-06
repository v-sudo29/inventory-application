import { 
  Box,
  Heading,
  HStack,
  Grid,
  IconButton,
  useDisclosure
} from "@chakra-ui/react"

import axios from "axios"
import { useEffect, useState } from "react"
import { AddIcon } from "@chakra-ui/icons"
import ListCard from "../components/ListCard"
import NendoroidObject from "../interfaces/global_interface"
import CreateModal from "../components/CreateModal"

// Inventory list
export default function NendoroidList() {
  const [nendoroidsList, setNendoroidsList] = useState<NendoroidObject[] | null>(null)
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  let cards: JSX.Element[] | null = null

  useEffect(() => {
    if (!nendoroidsList) {
      axios.get('/api') // TODO: change path to /catalog
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
        <IconButton onClick={onCreateOpen} mr='0.5rem' boxSize='3rem' aria-label='Create Nendoroid' icon={<AddIcon/> }/>
        <CreateModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
        />
      </HStack>
      {cards ? 
      <Grid 
        flexWrap='wrap' 
        gap='1rem' 
        mt='2rem'
        templateColumns='repeat(auto-fit, minmax(15rem, 1fr))'
      >
        {cards}
      </Grid> : '...Loading'}
    </Box>
  )
}
