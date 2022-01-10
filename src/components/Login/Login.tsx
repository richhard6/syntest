import { Flex, Input, Button } from '@chakra-ui/react'
import { ILog } from '../../interfaces/interfaces'

import { useState, useEffect } from 'react'
import { IUser } from '../../interfaces/interfaces'
import { useToast } from '@chakra-ui/react'
import { useContext } from 'react'
import Context from '../../context/Context'

function Login() {
  const [user, setUser] = useState<ILog>({ name: '', password: '' })
  const [logged, setLogged] = useState<Boolean>(false)
  const { log, toggleLog } = useContext(Context)
  const toast = useToast()

  useEffect(() => {
    if (log) console.log('HEY')

    //hau q hacer que cuiando logee se refresque todo
  }, [log])

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (toggleLog) toggleLog()
  }

  const allStorage = (): any => {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length

    while (i--) {
      let item = JSON.parse(localStorage.getItem(keys[i])!)
      values.push(item)
    }

    return values
  }

  const logIn = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const allUsers: IUser[] = allStorage()

    const isMatch: IUser | undefined = allUsers.find(
      (element) => element.name === user.name
    )

    if (isMatch) {
      const succesfull = isMatch.password === user.password
      if (succesfull) {
        console.log('te logeaste mamaguevo')
        setLogged(true)
        toast({
          title: 'Logged In',
          description: 'Welcome :)!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        sessionStorage.setItem('currentUser', JSON.stringify(isMatch))
        handleOnClick(e)
      } else {
        toast({
          title: 'Wrong password',
          description: 'The password is wrong',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Check credentials',
        description: 'Please check credentials',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      ml="200px"
      w="40vw"
      mt="5rem"
    >
      <Input
        type="text"
        placeholder="your name"
        value={user.name}
        onChange={(e) =>
          setUser((prevUser) => {
            return {
              ...prevUser,
              name: e.target.value,
            }
          })
        }
      />
      <Input
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) =>
          setUser((prevUser) => {
            return {
              ...prevUser,
              password: e.target.value,
            }
          })
        }
      />

      <Button onClick={logIn}>Log In</Button>
    </Flex>
  )
}

export default Login
