import { Checkbox } from '@chakra-ui/react'

const TaskItem = ({ task }) => {
  return <Checkbox>{task.text}</Checkbox>
}

export default TaskItem
