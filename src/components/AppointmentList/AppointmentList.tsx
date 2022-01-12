import { List, Flex, Text } from '@chakra-ui/react'
import Appointment from '../Appointment/Appointment'

import { useState, useEffect } from 'react'

import { IUser } from '../../interfaces/interfaces'

import { useUser } from '../../hooks/useUser'

function Appointments() {
  const currentUser = useUser()

  return (
    <Flex ml="200px" w="40vw" mt="5rem">
      <Text fontWeight="bold">Upcoming Appointments</Text>
      <List ml="200px" w="40vw" mt="5rem">
        {currentUser.scheduledAppointments.map((appointment, index) => (
          <Appointment appointment={appointment} key={index} />
        ))}
      </List>
    </Flex>
  )
}

export default Appointments
