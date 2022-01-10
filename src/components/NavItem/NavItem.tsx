import { Flex, Menu, MenuButton, Link, Icon, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'

import { IUser } from '../../interfaces/interfaces'
import Context from '../../context/Context'

type navProps = {
  navSize: string
  icon: any
  title: string
  setShow: (val: string) => void
}

function NavItem({ navSize, icon, title, setShow }: navProps) {
  const toast = useToast()
  const { log, toggleLog } = useContext(Context)

  const checkUser = () => {
    const getCurrentUser: IUser = JSON.parse(
      sessionStorage.getItem('currentUser')!
    )

    if (!getCurrentUser) console.log('nadie logeaedo')
  }

  useEffect(() => {
    checkUser()
    setShow('Home')
  }, [log, setShow])

  const logOut = () => {
    if (title === 'Log Out') {
      toast({
        title: 'Logged Out',
        description: "You've succesfully logged out",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })

      if (toggleLog) toggleLog()
      setShow('Home')
      console.log(log)
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
