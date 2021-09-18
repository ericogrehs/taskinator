import { habiticaClient } from '../provider/clients'

export const createTask = body =>
  habiticaClient.post('/api/v3/tasks/user', body)

export const getTodos = () =>
  habiticaClient.get('/api/v3/tasks/user?type=todos')
