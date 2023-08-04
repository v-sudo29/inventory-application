import axios from "axios"
import { useEffect, useState } from "react"
import { Heading, HStack } from "@chakra-ui/react"
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
    <div>
      <Heading>Catalog</Heading>
      {cards ? <HStack gap='2rem' mt='2rem'>{cards}</HStack> : '...Loading'}
    </div>
  )
}
