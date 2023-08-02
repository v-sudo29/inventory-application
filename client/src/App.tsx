import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout'
import NendoroidList from './pages/NendoroidList'
import Create from './pages/Create'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<NendoroidList/>} />
      <Route path='create' element={<Create/>} />
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

// Reference
{/* <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='anime-list' element={<AnimeList/>} />
      <Route path='anime/:id' element={<AnimeDetail/>} />
      <Route path='news' element={<News/>} />
      <Route path='character/:id' element={<CharacterDetail/>} />
    </Route> */}