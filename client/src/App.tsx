import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout'
import NendoroidList from './pages/NendoroidList'
import NendoroidDetail from './pages/NendoroidDetail'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<NendoroidList/>}/>
      <Route path='nendoroid/:id' element={<NendoroidDetail/>} />
    </Route>
  )
)

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  )
}