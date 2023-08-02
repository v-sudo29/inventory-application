import axios from "axios"
import { useEffect, useState } from "react"
import ListCard from "../components/ListCard"
import NendoroidObject from "../interfaces/NendoroidObject"

// Inventory list
export default function Home() {
  const [nendoroidsList, setNendoroidsList] = useState<NendoroidObject[] | null>(null)
  let cards: JSX.Element[] | null = null

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(data => setNendoroidsList(data.data))
  })

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
      {cards ? <>{cards}</> : '...Loading'}
    </div>
  )
}
