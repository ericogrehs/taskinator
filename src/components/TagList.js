import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { getTags } from '../services/tags'

import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'

const TagList = ({ control, name }) => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data: tags },
        } = await getTags()
        setTags(tags)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Menu closeOnSelect={false} placement='right-start'>
      {/* 
        Se comentar esse MenuButton some o warning 'Popper: CSS "margin" styles...' 
        TODO: investigar causa e remover warning 
      */}
      <MenuButton as={Button} colorScheme='blue' w='80px'>
        Tags
      </MenuButton>
      <MenuList>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <MenuOptionGroup type='checkbox' onChange={onChange}>
              {tags.map(({ name, id }) => (
                <MenuItemOption key={id} value={id}>
                  {name}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          )}
        />
      </MenuList>
    </Menu>
  )
}

export default TagList
