import { RadioGroup, Stack, Radio, Flex, Input, Button } from '@chakra-ui/react'
import { IUser } from '../../interfaces/interfaces'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

function CreateAccount() {
  const [user, setUser] = useState<IUser>({
    name: '',
    password: '',
    professional: false,
    scheduledAppointments: [],
  })
  const toast = useToast()

  const createUser = (): void => {
    if (user.name && user.password !== '') {
      localStorage.setItem(user.name, JSON.stringify(user))
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Check fields',
        description: 'Fill all the fields',
        status: 'warning',
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
              //same
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
              ...prevUser, //same
              password: e.target.value,
            }
          })
        }
      />

      <RadioGroup defaultValue="false">
        <Stack spacing={5} direction="row">
          <Radio
            colorScheme="red"
            value="professional"
            onChange={() =>
              setUser((prevUser) => {
                return {
                  ...prevUser, //poner en funcion.
                  professional: true,
                }
              })
            }
          >
            Professional
          </Radio>
          <Radio
            colorScheme="green"
            value="patient"
            onChange={() =>
              setUser((prevUser) => {
                return {
                  ...prevUser, //same
                  professional: false,
                }
              })
            }
          >
            Patient
          </Radio>
        </Stack>
      </RadioGroup>
      <Button onClick={createUser}>Create Account</Button>
    </Flex>
  )
}

export default CreateAccount
