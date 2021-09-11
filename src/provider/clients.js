import axios from 'axios'

export const habiticaClient = axios.create({
  baseURL: 'https://habitica.com',
  headers: {
    'x-client': process.env.REACT_APP_HABITICA_USER_ID + '-taskinator',
    'x-api-user': process.env.REACT_APP_HABITICA_USER_ID,
    'x-api-key': process.env.REACT_APP_HABITICA_API_CODE,
  },
})
