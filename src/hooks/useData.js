import { useState, useCallback, useEffect } from 'react'

import { getTodos } from '../services/tasks'
import { getTags } from '../services/tags'
import useToastEmitter from '../hooks/useToastEmitter'
import { IDLE, FETCHING } from '../constants/states'

const useData = () => {
  const [tasks, setTasks] = useState([])
  const [tags, setTags] = useState([])
  const [statusTasks, setStatusTasks] = useState(IDLE)
  const [statusTags, setStatusTags] = useState(IDLE)

  const toast = useToastEmitter()

  const fetchData = useCallback(async (fetch, setData, setStatus) => {
    try {
      setStatus(FETCHING)
      const {
        data: { data },
      } = await fetch()
      setData(data)
    } catch (error) {
      console.error(error?.response?.data)
      toast.error(`Ocorreu um erro em ${fetch}`)
    } finally {
      setStatus(IDLE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTasks = useCallback(async () => {
    return fetchData(getTodos, setTasks, setStatusTasks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTags = useCallback(async () => {
    return fetchData(getTags, setTags, setStatusTags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTasks()
    fetchTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { tags, tasks, fetchTasks, fetchTags, statusTasks, statusTags }
}

export default useData
