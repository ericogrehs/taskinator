import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Box, Stack, Button } from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import { yupResolver } from '@hookform/resolvers/yup'

import TagList from './TagList'

import { createTask } from '../services/tasks'
import useToastEmitter from '../hooks/useToastEmitter'
import useStore from '../hooks/useStore'
import { formatDateToApi } from '../helpers/formatters'
import { createTaskSchema } from '../validators/createTask'
import { IDLE, SUBMITTING } from '../constants/states'

function CreateTaskForm() {
  const [state, setState] = useState(IDLE)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
    mode: 'onChange',
  })

  const toast = useToastEmitter()
  const { fetchTasks } = useStore()

  const clearFields = () => {
    setValue('title', '')
    setValue('duedate', '')
    setValue('tags', [])
  }

  const onSubmit = async data => {
    try {
      setState(SUBMITTING)
      await createTask({
        text: data?.title,
        type: 'todo',
        tags: data?.tags,
        date: formatDateToApi(data?.duedate),
      })
      toast.success('Tarefa criada com sucesso')
      fetchTasks()
      clearFields()
    } catch (error) {
      console.error(error?.response?.data)
      toast.error('Ocorreu um erro ao tentar criar uma nova tarefa')
    } finally {
      setState(IDLE)
    }
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} my='32px' w='400px'>
      <Stack spacing='16px'>
        <Stack direction='row'>
          <Input
            placeholder='Nome da Tarefa'
            isInvalid={errors.title?.message}
            errorBorderColor='red.300'
            {...register('title')}
          />
          <TagList control={control} name='tags' />
        </Stack>
        <Input
          as={InputMask}
          mask='99/99/9999'
          placeholder='Data da Tarefa'
          isInvalid={errors.duedate?.message}
          errorBorderColor='red.300'
          {...register('duedate')}
        />
        <Button
          type='submit'
          colorScheme='blue'
          isLoading={state === SUBMITTING}
          loadingText='Enviando'
        >
          Criar
        </Button>
      </Stack>
    </Box>
  )
}

export default CreateTaskForm
