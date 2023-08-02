import Header from "./Header"
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import { Stack } from "@chakra-ui/react"

export default function Layout() {
  return (
    <>
      <Header/>
      <Stack flexDirection='row' h='calc(100vh - 6.5rem)'>
        <Sidebar/>
        <Outlet/>
      </Stack>
    </>
  )
}
