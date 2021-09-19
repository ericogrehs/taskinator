import { ChakraProvider } from '@chakra-ui/react'
import styled from 'styled-components'

import Home from './routes/Home'

import useData from './hooks/useData'
import StoreContext from './contexts/storeContext'

import colorMode from './styles/colorMode'

function App() {
  const data = useData()

  return (
    <ChakraProvider theme={colorMode}>
      <StoreContext.Provider value={data}>
        <Container>
          <Home />
        </Container>
      </StoreContext.Provider>
    </ChakraProvider>
  )
}

const Container = styled.div`
  min-height: 100vh;
`

export default App
