import { Box, Image, Stack, Text } from "@chakra-ui/react"
import NendoroidObject from "../interfaces/NendoroidObject"

export default function ListCard({nendoroid} : {nendoroid: NendoroidObject}) {
  return (
    <Stack key={`${nendoroid.id}-home`} align='start'>
      <Image 
        src={nendoroid.imageUrl} 
        alt={nendoroid.name}
        objectFit='cover' 
        w='15rem'
        h='20rem'
      />
      <Box>
        <Text>{nendoroid.name}</Text>
        <Text fontWeight='bold' >{nendoroid.price}</Text>
      </Box>
    </Stack>
  )
}
