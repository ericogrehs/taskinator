import { ChakraProvider } from '@chakra-ui/react'
import styled from 'styled-components'

import Home from './routes/Home'

function App() {
  return (
    <ChakraProvider>
      <Container>
        <Home />
      </Container>
    </ChakraProvider>
  )
}

const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
`

export default App
