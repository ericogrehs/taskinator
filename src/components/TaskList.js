import { useEffect, useState } from 'react'
import { Stack, StackDivider, Box } from '@chakra-ui/react'

import TaskItem from '../components/TaskItem'

import { getTodos } from '../services/tasks'

function TaskList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data: tasks },
        } = await getTodos()
        setTasks(tasks)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Box borderRadius='md' p='16px' border='1px' borderColor='gray.300'>
      <Stack
        direction='column'
        spacing='16px'
        divider={<StackDivider borderColor='gray.300' />}
      >
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Stack>
    </Box>
  )
}

export default TaskList
