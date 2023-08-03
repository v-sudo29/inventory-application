import { Box, Stack, Text } from "@chakra-ui/react"
import NendoroidObject from "../interfaces/NendoroidObject"

export default function ListCard({nendoroid} : {nendoroid: NendoroidObject}) {
  return (
    <Stack 
      align='start' 
      w='10rem'
    >
      <Box overflow='hidden' w='inherit'>
        <img 
          src={nendoroid.imageUrl.includes('https') ? nendoroid.imageUrl : 'http://localhost:3001/images/' + `${nendoroid.imageUrl}`} 
          alt={nendoroid.name}
          style={{ 
            width: 'inherit',
            height: '15rem',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box>
        <Text>{nendoroid.name}</Text>
        <Text fontWeight='bold' >{nendoroid.price}</Text>
      </Box>
    </Stack>
  )
}
