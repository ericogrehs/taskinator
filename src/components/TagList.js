import { Controller } from 'react-hook-form'

import useStore from '../hooks/useStore'

import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'

const TagList = ({ control, name }) => {
  const { tags } = useStore()

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
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <MenuOptionGroup
              type='checkbox'
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              inputRef={ref}
            >
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
