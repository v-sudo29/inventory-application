
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import { Stack } from "@chakra-ui/react"

export default function Layout() {
  return (
    <Stack flexDirection='row' w='100%' h='100%'>
      <Sidebar/>
      <Stack p='6rem' h='100%' w='calc(100vw - 18.5rem)'>
        <Outlet/>
      </Stack>
    </Stack>
  )
}
