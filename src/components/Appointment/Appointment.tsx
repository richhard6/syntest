import { ListItem, ListIcon, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

interface IAppointment {
  scheduledBy: string
  professional: string
  scheduledDate: Date | null
  createdAt: number
  modified: Boolean
}

interface IAppo {
  appointment: IAppointment
}

function Appointment({ appointment }: IAppo) {
  return (
    <ListItem>
      <ListIcon as={StarIcon} color="green.500" />
      <Text> {appointment.professional}</Text>
      <Text> {appointment.scheduledDate}</Text>
    </ListItem>
  )
}

export default Appointment
