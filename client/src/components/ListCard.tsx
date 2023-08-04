import { Box, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import NendoroidObject from "../interfaces/global_interface"

export default function ListCard({nendoroid} : {nendoroid: NendoroidObject}) {
  return (
    <Stack 
      align='start' 
      w='10rem'
    >
      <Link to={`/nendoroid/${nendoroid._id}`}>
        <Box overflow='hidden' w='inherit'>
          <img 
            src={nendoroid.imageUrl && nendoroid.imageUrl.includes('http') ? nendoroid.imageUrl : 'http://localhost:3001/images/' + `${nendoroid.imageUrl}` }
            // src={nendoroid.imageUrl.includes('http') ? nendoroid.imageUrl : 'http://localhost:3001/images/' + `${nendoroid.imageUrl}`} 
            alt={nendoroid.name}
            style={{ 
              width: 'inherit',
              height: '15rem',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box>
          <Text fontWeight='600' fontSize='1.2rem'>{nendoroid.name}</Text>
          <Text color='gray.500'>{nendoroid.units} units</Text>
          <Text fontWeight='500' fontSize='1.2rem'>{nendoroid.price.includes('$') ? nendoroid.price : '$' + nendoroid.price}</Text>
        </Box>
      </Link>
    </Stack>
  )
}
