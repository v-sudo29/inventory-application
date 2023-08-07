import { Stack } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const navStyles = {
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '1rem',
    'height': '100%',
    'gap': '1.5rem'
  }

  return (
    <Stack
      flex='column'
      minW='18rem'
      color='cyan.500'
      fontSize='1.1rem'
      boxShadow='base'
      p='10rem 1rem'
    >
      <nav className="nav-links" style={navStyles as React.CSSProperties}>
        <NavLink to='/'>Catalog</NavLink>
      </nav>
    </Stack>
  )
}
