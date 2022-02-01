import { useColorMode, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  
  return (
    <IconButton variant="unstyled" aria-label="Switch dark mode" icon={isDark ? <SunIcon /> : <MoonIcon />} onClick={toggleColorMode} />
  )
}
