import { List } from '@chakra-ui/react'
import Appointment from '../Appointment/Appointment'

import { useState, useEffect } from 'react'

import { IUser } from '../../interfaces/interfaces'

import { useUser } from '../../hooks/useUser'

function Appointments() {
  const currentUser = useUser()

  return (
    <List ml="200px" w="40vw" mt="5rem">
      {currentUser.scheduledAppointments.map((appointment, index) => (
        <Appointment appointment={appointment} key={index} />
      ))}
    </List>
  )
}

export default Appointments
