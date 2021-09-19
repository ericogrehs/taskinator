import { Stack, StackDivider, Center, Box } from '@chakra-ui/react'

import TaskItem from '../components/TaskItem'
import CreateTaskForm from '../components/CreateTaskForm'

import useStore from '../hooks/useStore'

function Home() {
  const { tasks } = useStore()

  return (
    <>
      <Center>
        <CreateTaskForm />
      </Center>
      <Center>
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
      </Center>
    </>
  )
}

export default Home
