import { Stack, Heading } from '@chakra-ui/react'

export default function Header() {
  return (
    <header style={{width: '100%'}}>
      <Stack 
        flexDir='row' 
        justify='center' 
        p='2rem'
        boxShadow='base'
      >
        <Heading 
          fontSize='2rem' 
          fontWeight='400'
          >
            Nendoroid Inventory Application
        </Heading>
      </Stack>
    </header>
  )
}
