import { useForm } from 'react-hook-form'
import { Input, Button, Box, Stack } from '@chakra-ui/react'
import InputMask from 'react-input-mask'

import TagList from './TagList'

import { createTask } from '../services/tasks'
import useToastEmitter from '../hooks/useToastEmitter'
import useStore from '../hooks/useStore'
import { formatDateToApi } from '../helpers/formatters'

function CreateTaskForm() {
  const { register, handleSubmit, control, setValue } = useForm()

  const toast = useToastEmitter()
  const { fetchTasks } = useStore()

  const onSubmit = async data => {
    try {
      await createTask({
        text: data?.title,
        type: 'todo',
        tags: data?.tags,
        date: formatDateToApi(data?.duedate),
      })
      toast.success('Tarefa criada com sucesso')
      fetchTasks()
      setValue('title', '')
      setValue('tags', [])
    } catch (error) {
      console.error(error?.response?.data)
      toast.error('Ocorreu um erro ao tentar criar uma nova tarefa')
    }
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} my='32px' w='400px'>
      <Stack spacing='16px'>
        <Stack direction='row'>
          <Input placeholder='Nome da Tarefa' {...register('title')} />
          <TagList control={control} name='tags' />
        </Stack>
        <Input
          as={InputMask}
          mask='99/99/9999'
          // maskChar={null}
          placeholder='Data da Tarefa'
          {...register('duedate')}
        />
        <Button type='submit' colorScheme='blue'>
          Criar
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateTaskForm
