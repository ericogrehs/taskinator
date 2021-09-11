import { useForm } from 'react-hook-form'

import { createTask } from './services/tasks'

function App() {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue='Task teste' {...register('title')} />
      <input type='submit' />
    </form>
  )
}

export default App
