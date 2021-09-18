import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChakraProvider, Stack } from '@chakra-ui/react'

import TaskItem from './components/TaskItem'
import { createTask, getTodos } from './services/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data: tasks },
        } = await getTodos()
        console.log('tasks:', tasks)
        setTasks(tasks)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

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
    <ChakraProvider>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue='Task teste' {...register('title')} />
          <input type='submit' />
        </form>
        <Stack direction='column' spacing='24px'>
          {tasks.map(task => (
            <TaskItem task={task} />
          ))}
        </Stack>
      </div>
    </ChakraProvider>
  )
}

export default App
