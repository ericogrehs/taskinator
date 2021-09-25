import * as yup from 'yup'
import { formatDateToApi } from '../helpers/formatters'

export const createTaskSchema = yup.object({
  title: yup.string('Campo obrigatório').required(),
  duedate: yup
    .string()
    .test(
      'valid-date',
      'Data inválida',
      value =>
        !value.replace(/\D/g, '') ||
        String(new Date(formatDateToApi(value))) !== 'Invalid Date'
    ),
})
