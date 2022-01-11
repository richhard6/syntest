import { ListItem, ListIcon, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { IAppo, IUser } from '../../interfaces/interfaces'

import { useEffect, useState } from 'react'

import { useUser } from '../../hooks/useUser'

function Appointment({ appointment }: IAppo) {
  const currentUser = useUser()

  return (
    <ListItem>
      <ListIcon as={StarIcon} color="green.500" />

      <Text>
        {currentUser.professional === true
          ? appointment.scheduledBy
          : appointment.professional}
      </Text>
      <Text> {appointment.scheduledDate}</Text>
    </ListItem>
  )
}

export default Appointment
