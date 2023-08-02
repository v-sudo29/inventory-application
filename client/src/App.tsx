import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/Layout'
import Home from './pages/Home'

export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

{/* <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='anime-list' element={<AnimeList/>} />
      <Route path='anime/:id' element={<AnimeDetail/>} />
      <Route path='news' element={<News/>} />
      <Route path='character/:id' element={<CharacterDetail/>} />
    </Route> */}