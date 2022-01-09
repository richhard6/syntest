import { ChakraProvider, Flex } from '@chakra-ui/react'
import Dashboard from './components/Dashboard/Dashboard'
import { useState, useEffect } from 'react'
import ProfessionalsList from './components/ProfessionalsList/ProfessionalsList'
import CreateAccount from './components/CreateAccount/CreateAccount'
import Login from './components/Login/Login'
import AppointmentList from './components/AppointmentList/AppointmentList'
import Welcome from './components/Welcome/Welcome'

function App() {
  const [show, setShow] = useState<string>('Home')

  useEffect(() => {
    if (show === 'Log Out') sessionStorage.clear()
  }, [show])

  return (
    <ChakraProvider>
      <Flex flexDirection="row">
        <Dashboard setShow={setShow} show={show} />
        {show === 'Home' && <Welcome />}
        {show === 'Professionals' && <ProfessionalsList />}
        {show === 'Appointments' && <AppointmentList />}
        {show === 'Schedule' && <div>this is hey</div>}
        {show === 'Log In' && <Login />}
        {show === 'Create Account' && <CreateAccount />}
      </Flex>
    </ChakraProvider>
  )
}

export default App
