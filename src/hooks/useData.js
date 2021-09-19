import { useState, useCallback, useEffect } from 'react'

import { getTodos } from '../services/tasks'
import { getTags } from '../services/tags'
import useToastEmitter from '../hooks/useToastEmitter'

const useData = () => {
  const [tasks, setTasks] = useState([])
  const [tags, setTags] = useState([])

  const toast = useToastEmitter()

  const fetchData = useCallback(async (fetch, setData) => {
    try {
      const {
        data: { data },
      } = await fetch()
      setData(data)
    } catch (error) {
      console.error(error?.response?.data)
      toast.error(`Ocorreu um erro em ${fetch}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTasks = useCallback(async () => {
    fetchData(getTodos, setTasks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTags = useCallback(async () => {
    fetchData(getTags, setTags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTasks()
    fetchTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { tags, tasks, fetchTasks, fetchTags }
}

export default useData
