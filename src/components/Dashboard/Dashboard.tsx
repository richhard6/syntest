import { useState, useEffect } from 'react'
import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  FaHome,
  FaSignInAlt,
  FaRegCalendarAlt,
  FaToriiGate,
} from 'react-icons/fa'
import { IUser } from '../../interfaces/interfaces'
import { AiFillFolderOpen } from 'react-icons/ai'

import NavItem from '../NavItem/NavItem'
import { useContext } from 'react'
import Context from '../../context/Context'

interface AppProps {
  show: string
  setShow: (val: string) => void
}

function Dashboard({ setShow }: AppProps) {
  //tengo que actualizar el dashboard, al realizar el cambio en el componente login ( noestan conectados)
  const [navSize, changeNavSize] = useState<string>('large')

  const { log } = useContext(Context)

  const [currentUser, setCurrentUser] = useState<IUser>({
    name: '',
    password: '',
    professional: false,
    scheduledAppointments: [],
  })

  const checkUser = () => {
    const getCurrentUser: IUser = JSON.parse(
      sessionStorage.getItem('currentUser')!
    )

    if (getCurrentUser) setCurrentUser(getCurrentUser)

    console.log('probando')
  }

  useEffect(() => {
    checkUser()
    setShow('Home')

    console.log(log)
  }, [log, setShow])

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      w={navSize === 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex p="5%" flexDir="column" alignItems="flex-start" as="nav">
        <IconButton
          aria-label="amenu"
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<HamburgerIcon />}
          onClick={() => {
            if (navSize === 'small') {
              changeNavSize('large')
            } else changeNavSize('small')
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FaHome}
          title="Home"
          setShow={setShow}
        />
        {currentUser.name !== '' && (
          <NavItem
            navSize={navSize}
            icon={FaToriiGate}
            title="Professionals"
            setShow={setShow}
          />
        )}
        {currentUser.name !== '' && (
          <NavItem
            navSize={navSize}
            icon={AiFillFolderOpen}
            title="Appointments"
            setShow={setShow}
          />
        )}
        {currentUser?.professional === true && (
          <NavItem
            navSize={navSize}
            icon={FaRegCalendarAlt}
            title="Schedule"
            setShow={setShow}
          />
        )}
        {/* solo profesional, aqui se podra ver la schedule y modificarla. (calendario con citas pendientes) */}
        {currentUser.name !== '' && (
          <NavItem
            navSize={navSize}
            icon={FaSignInAlt}
            title="Log Out"
            setShow={setShow}
            setCurrentUser={setCurrentUser}
          />
        )}
        {currentUser.name === '' && (
          <NavItem
            navSize={navSize}
            icon={FaSignInAlt}
            title="Log In"
            setShow={setShow}
          />
        )}
        {currentUser.name === '' && (
          <NavItem
            navSize={navSize}
            icon={FaSignInAlt}
            title="Create Account"
            setShow={setShow}
          />
        )}
        {/* o
        login/ create acount depende si esta logead */}
      </Flex>
      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
        <Divider display={navSize === 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Avatar size="sm"></Avatar>
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === 'small' ? 'none' : 'flex'}
          >
            <Heading as="h3" size="sm">
              {currentUser.name}
            </Heading>
            <Text color="gray">
              {currentUser.professional === true ? 'Professional' : 'Patient'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Dashboard
