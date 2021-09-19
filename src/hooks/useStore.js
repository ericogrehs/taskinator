import { useContext } from 'react'

import storeContext from '../contexts/storeContext'

const useStore = () => useContext(storeContext)

export default useStore
