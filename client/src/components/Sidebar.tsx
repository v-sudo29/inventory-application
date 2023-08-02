import { Stack } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const styles = {
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '1rem',
    'height': '100%'
  }

  return (
    <Stack
      flex='column'
      w='15rem'
      color='cyan.500'
      fontSize='1.1rem'
      boxShadow='base'
    >
      <nav className="nav-links" style={styles as React.CSSProperties}>
        <NavLink to='/'>All Nendoroids</NavLink>
        <NavLink to='/create'>Create new Nendoroid</NavLink>
      </nav>
    </Stack>
  )
}
