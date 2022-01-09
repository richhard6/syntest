import { Flex, Input, Button } from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import { IUser } from '../../interfaces/interfaces'
import { useToast } from '@chakra-ui/react'

interface ILog {
  name: string
  password: string
}

function Login() {
  const [user, setUser] = useState<ILog>({ name: '', password: '' })
  const [logged, setLogged] = useState<Boolean>(false)
  const toast = useToast()
  useEffect(() => {
    //hau q hacer que cuiando logee se refresque todo
    console.log('HEY')
  }, [logged])

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

  const logIn = (): void => {
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
          description: 'Please refresh the browser',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        sessionStorage.setItem('currentUser', JSON.stringify(isMatch))
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
