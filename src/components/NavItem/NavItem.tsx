import { Flex, Menu, MenuButton, Link, Icon, Text } from '@chakra-ui/react'
type navProps = {
  navSize: string
  icon: any
  title: string
  setShow: (val: string) => void
}

function NavItem({ navSize, icon, title, setShow }: navProps) {
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
          <MenuButton>
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
