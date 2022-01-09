import { List } from '@chakra-ui/react'
import Appointment from '../Appointment/Appointment'

import { useState, useEffect } from 'react'

import { IUser } from '../../interfaces/interfaces'

function Appointments() {
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
  }

  useEffect(() => {
    checkUser()
  }, [])
  return (
    <List ml="200px" w="40vw" mt="5rem">
      {currentUser.scheduledAppointments.map((appointment, index) => (
        <Appointment appointment={appointment} key={index} />
      ))}
    </List>
  )
}

export default Appointments
