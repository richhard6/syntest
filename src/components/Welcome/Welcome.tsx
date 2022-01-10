import { Box, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import Context from '../../context/Context'

function Welcome() {
  const { dark, toggleDark } = useContext(Context)
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (toggleDark) toggleDark()
  }
  return (
    <Box ml="200px" w="40vw" mt="5rem">
      <Text>Welcome!</Text>
      <button onClick={handleOnClick}> {dark ? ':D' : ':('}</button>
    </Box>
  )
}

export default Welcome
