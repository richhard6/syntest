import { Flex, Menu, MenuButton, Link, Icon, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

import { IUser } from '../../interfaces/interfaces'

type navProps = {
  navSize: string // abstraer
  icon: any
  title: string
  setShow: (val: string) => void
  setCurrentUser?: (val: IUser) => void
}

function NavItem({ navSize, icon, title, setShow, setCurrentUser }: navProps) {
  const toast = useToast()

  const logOut = () => {
    if (title === 'Log Out') {
      toast({
        title: 'Logged Out',
        description: "You've succesfully logged out",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })

      setShow('Home')

      if (setCurrentUser)
        setCurrentUser({
          name: '',
          password: '',
          professional: false,
          scheduledAppointments: [],
        })
    }
  }
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
      onClick={() => setShow(title)}
    >
      <Menu placement="right">
        <Link>
          <MenuButton onClick={logOut}>
            <Flex>
              <Icon as={icon} />
              <Text display={navSize === 'small' ? 'none' : 'block'}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}

export default NavItem
