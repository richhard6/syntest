import { ListItem, ListIcon, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { IAppo } from '../../interfaces/interfaces'
import moment from 'moment'

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
      <Text>
        {moment(appointment.scheduledDate).format('MMMM Do YYYY, h:mm:ss a')}
      </Text>
    </ListItem>
  )
}

export default Appointment
