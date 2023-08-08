import { 
  Heading,
  HStack,
  Stack,
  IconButton,
  useDisclosure,
  Grid
} from "@chakra-ui/react"

import axiosConfig from '../axiosConfig'
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
      axiosConfig.get('/') // TODO: change path to /catalog
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
    <Stack 
      pos='relative' 
      w='100%'
      h='100%'
    >
      <HStack justify='space-between'>
        <Heading>Catalog</Heading>
        <IconButton onClick={onCreateOpen} boxSize='3rem' aria-label='Create Nendoroid' icon={<AddIcon/> }/>
        <CreateModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
        />
      </HStack>
      {cards ? 
        <Grid
          templateColumns='repeat(auto-fill, minmax(12rem, 1fr))'
          templateRows='repeat(auto-fill, minmax(22rem, 1fr))'
          gridGap='3rem'
          mt='2rem'
        >
          {cards}
        </Grid> : '...Loading'}
    </Stack>
  )
}
