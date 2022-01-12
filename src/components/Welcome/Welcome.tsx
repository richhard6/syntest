import { Box, Text, Flex, Center } from '@chakra-ui/react'
import { useContext } from 'react'
import Context from '../../context/Context'

function Welcome() {
  const { dark, toggleDark } = useContext(Context)
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (toggleDark) toggleDark() //esto sera un botonsito en la sidebar, YA TODA LA APP SABE SI DARK O LIGHT MODE
  }
  return (
    <Flex ml="200px" w="60vw" mt="5rem " justify="center" alignItems="center">
      <Text fontSize="6xl">Welcome!</Text>
      {/*  <button onClick={handleOnClick}> {dark ? ':D' : ':('}</button> */}
    </Flex>
  )
}

export default Welcome
