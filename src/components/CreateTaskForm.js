import { useForm } from 'react-hook-form'
import { Input, Button, Box, Stack } from '@chakra-ui/react'

import TagList from './TagList'

import { createTask } from '../services/tasks'

function CreateTaskForm() {
  const { register, handleSubmit, control } = useForm()

  const onSubmit = async data => {
    try {
      await createTask({
        text: data.title,
        type: 'todo',
        tags: data.tags,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} my='32px' w='400px'>
      <Stack spacing='16px'>
        <Stack direction='row'>
          <Input placeholder='Nome da Tarefa' {...register('title')} />
          <TagList control={control} name='tags' />
        </Stack>
        <Button type='submit' colorScheme='blue'>
          Criar
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateTaskForm
