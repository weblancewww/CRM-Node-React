import React from 'react'
import {
  ThemeEditor as ThemeEditorContainer,
  ThemeEditorDrawer,
  ThemeEditorColors,
  ThemeEditorFontSizes
} from '@hypertheme-editor/chakra-ui'
import { Button, Icon, useColorMode } from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/react"
import { CgColorPicker } from 'react-icons/cg'
import { ImFontSize } from 'react-icons/im'
import { MdPalette,MdDarkMode,MdLightMode } from 'react-icons/md'

export function ThemeEditor(props) {
    return (
        <ThemeEditorContainer>
          <ThemeEditorButton {...props} />
          <ThemeEditorDrawer hideUpgradeToPro>
            <ThemeEditorColors icon={CgColorPicker} title="Colors" />
            <ThemeEditorFontSizes icon={ImFontSize} title="Font Sizes" />
          </ThemeEditorDrawer>
        </ThemeEditorContainer>
      )
}

function ThemeEditorButton({ onOpen, navbarIcon, ...rest }) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button
        variant='no-hover'
        bg='transparent'
        p='0px'
        minW='unset'
        minH='unset'
        h='18px'
        w='max-content'
        _focus={{ boxShadow: 'none' }}
        onClick={toggleColorMode}
        {...rest}
    >
        <Icon
            me='10px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={colorMode === "light" ? MdDarkMode:MdLightMode}
        />
      </Button>
  )
  // return (
  //   <Button
  //       variant='no-hover'
  //       bg='transparent'
  //       p='0px'
  //       minW='unset'
  //       minH='unset'
  //       h='18px'
  //       w='max-content'
  //       _focus={{ boxShadow: 'none' }}
  //       onClick={onOpen}
  //       {...rest}
  //   >
  //       <Icon
  //           me='10px'
  //           h='18px'
  //           w='18px'
  //           color={navbarIcon}
  //           as={MdPalette}
  //       />
  //     </Button>
  // )
}