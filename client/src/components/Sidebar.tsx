import { Stack } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const styles = {
    'display': 'flex',
    'justify-content': 'center',
    'padding': '1rem'
  }

  return (
    <Stack
      flex='column'
      w='15rem'
      color='cyan.500'
      fontSize='1.1rem'
      boxShadow='base'
    >
      <nav className="nav-links" style={styles}>
        <NavLink to='/'>Nendoroid List</NavLink>
      </nav>
    </Stack>
  )
}
