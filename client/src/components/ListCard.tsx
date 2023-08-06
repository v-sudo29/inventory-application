import { Box, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import NendoroidObject from "../interfaces/global_interface"

export default function ListCard({nendoroid} : {nendoroid: NendoroidObject}) {
  return (
    <Stack 
      align='start' 
      w='inherit'
    >
      <Link to={`/nendoroid/${nendoroid._id}`}>
        <Box 
          borderRadius='0.5rem'
          overflow='hidden'
          w='inherit'
          h='inherit'
        >
          <img 
            src={nendoroid.imageUrl && nendoroid.imageUrl.includes('http') ? nendoroid.imageUrl : `${process.env.BASE_URL}` + '/images/' + `${nendoroid.imageUrl}` }
            alt={nendoroid.name}
            style={{ 
              maxWidth: '15rem',
              height: '22rem',
              objectFit: 'cover',
              borderRadius: '0.5rem'
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
