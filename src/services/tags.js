import { habiticaClient } from '../provider/clients'

export const getTags = () => habiticaClient.get('/api/v3/tags')
