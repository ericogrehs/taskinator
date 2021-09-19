import { useToast } from '@chakra-ui/react'

const useToastEmitter = () => {
  const toast = useToast()

  const success = (description, configs) => {
    toast({
      title: 'Sucesso',
      description: description,
      status: 'success',
      duration: 2000,
      isClosable: true,
      ...configs,
    })
  }

  const error = (description, configs) => {
    toast({
      title: 'Erro',
      description: description,
      status: 'error',
      duration: 2000,
      isClosable: true,
      ...configs,
    })
  }

  return { success, error }
}

export default useToastEmitter
