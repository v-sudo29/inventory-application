import { Box, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import NendoroidObject from "../interfaces/global_interface"

export default function ListCard({ nendoroid } : { nendoroid: NendoroidObject }) {

  if (nendoroid) console.log(nendoroid)
  
  return (
    <Box
      shadow='md'
    >
      <Link 
        style={{ 
          height:'inherit',
          width:'inherit',
        }} 
        to={`/nendoroid/${nendoroid._id}`}
      >
        <Stack 
          w='inherit'
          h='14rem'
          justify='center'
          overflowX='hidden'
          overflowY='hidden'
        >
          <img 
              src={nendoroid.imageUrl}
              alt={nendoroid.name}
              style={{ 
                minHeight: '23rem',
                objectFit: 'cover',
              }}
            />
        </Stack>
        <Box p='1rem'>
          <Text fontWeight='600' fontSize='1.2rem'>{nendoroid.name}</Text>
          <Text color='gray.500'>{nendoroid.units} units</Text>
          <Text fontWeight='500' fontSize='1.2rem'>{nendoroid.price && nendoroid.price.includes('$') ? nendoroid.price : '$' + nendoroid.price}</Text>
        </Box>
      </Link>
    </Box>
  )
}
