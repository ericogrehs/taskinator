import { useForm } from 'react-hook-form'
import { Input, Button, Box, Stack } from '@chakra-ui/react'

import { createTask } from '../services/tasks'

function CreateTaskForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async data => {
    try {
      await createTask({
        text: data.title,
        type: 'todo',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} my='32px' w='360px'>
      <Stack spacing='16px'>
        <Input placeholder='Nome da Tarefa' {...register('title')} />
        <Button type='submit' colorScheme='blue'>
          Criar
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateTaskForm
