import { useForm } from 'react-hook-form'
import axios from 'axios'

function App() {
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    try {
      const client = axios.create({
        baseURL: 'https://habitica.com',
        headers: {
          'x-client': process.env.REACT_APP_HABITICA_USER_ID + '-taskinator',
          'x-api-user': process.env.REACT_APP_HABITICA_USER_ID,
          'x-api-key': process.env.REACT_APP_HABITICA_API_CODE,
        },
      })

      client.post('/api/v3/tasks/user', {
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
