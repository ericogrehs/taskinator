import { ChakraProvider } from '@chakra-ui/react'
import styled from 'styled-components'

import Home from './routes/Home'

import colorMode from './styles/colorMode'

function App() {
  return (
    <ChakraProvider theme={colorMode}>
      <Container>
        <Home />
      </Container>
    </ChakraProvider>
  )
}

const Container = styled.div`
  min-height: 100vh;
`

export default App
