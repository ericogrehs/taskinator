import { useState } from 'react'
import { Checkbox } from '@chakra-ui/react'

import { completeTask } from '../services/tasks'
import useStore from '../hooks/useStore'
import useToastEmitter from '../hooks/useToastEmitter'
import { IDLE, SUBMITTING } from '../constants/states'

const TaskItem = ({ task }) => {
  const [state, setState] = useState(IDLE)

  const { fetchTasks } = useStore()
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

  return (
    <Checkbox isDisabled={state === SUBMITTING} onChange={onCheck(task.id)}>
      {task.text}
    </Checkbox>
  )
}

export default TaskItem
