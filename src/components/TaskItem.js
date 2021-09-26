import { useState } from 'react'
import { Checkbox, Box, Tag, Stack, Badge } from '@chakra-ui/react'
import { format, differenceInDays } from 'date-fns'

import { completeTask } from '../services/tasks'
import useStore from '../hooks/useStore'
import useToastEmitter from '../hooks/useToastEmitter'
import { IDLE, SUBMITTING } from '../constants/states'
import { statusDuedate } from '../constants/status'

const TaskItem = ({ task }) => {
  const [state, setState] = useState(IDLE)

  const { fetchTasks, tags } = useStore()
  const toast = useToastEmitter()

  const onCheck =
    id =>
    async ({ target: { checked } }) => {
      try {
        if (!checked) return
        setState(SUBMITTING)
        await completeTask(id)
        await fetchTasks()
      } catch (error) {
        console.error(error?.response?.data)
        toast.error('Ocorreu um erro ao tentar completar a tarefa')
        setState(IDLE)
      }
    }

  const renderDueDate = task => {
    const duedate = new Date(task.date)
    const diffDays = differenceInDays(duedate, new Date())

    let color = statusDuedate.onTime
    if (diffDays < 0) color = statusDuedate.overdue
    if (diffDays > 0) color = statusDuedate.early

    return <Badge colorScheme={color}>{format(duedate, 'dd/MM/yyyy')}</Badge>
  }

  return (
    <Box d='flex' flexDir='column' alignItems='flex-start'>
      {task.tags.length !== 0 && (
        <Stack direction='row' mb='1'>
          {task.tags.map(tag => (
            <Tag key={tag} size='sm'>
              {tags.find(({ id }) => id === tag)?.name}
            </Tag>
          ))}
        </Stack>
      )}
      <Checkbox isDisabled={state === SUBMITTING} onChange={onCheck(task.id)}>
        {task.text}
      </Checkbox>
      {task.date && renderDueDate(task)}
    </Box>
  )
}

export default TaskItem
