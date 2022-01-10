import { IProfessional } from '../../interfaces/interfaces'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IUser, IAppointment } from '../../interfaces/interfaces'

import { Avatar, Flex, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

type profCard = {
  professional: IProfessional
}

function ProfessionalCard({ professional }: profCard) {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const toast = useToast()
  const [currentUser, setCurrentUser] = useState<IUser>({
    name: '',
    password: '',
    professional: false,
    scheduledAppointments: [],
  })

  const [appointment, setAppointment] = useState<IAppointment>({
    scheduledBy: currentUser.name,
    professional: professional.name,
    scheduledDate: startDate,
    createdAt: Date.now(),
    modified: false, //accepted?
  })

  useEffect(() => {
    const getCurrentUser: IUser = JSON.parse(
      sessionStorage.getItem('currentUser')!
    )
    setAppointment((prevAppointment) => {
      return {
        ...prevAppointment,
        scheduledBy: getCurrentUser.name,
      }
    })
  }, []) // si es doctor, el nombre del profesional  by tiene que cambiar  x el del paciente

  //no mostrar el nombre del profesional qe ste logeado. . . .

  const saveAppointments = (): void => {
    const allStorage = (): any => {
      let values = [],
        keys = Object.keys(localStorage),
        i = keys.length

      while (i--) {
        let item = JSON.parse(localStorage.getItem(keys[i])!)
        values.push(item)
      }

      return values
    }
    const allUsers: IUser[] = allStorage()

    const isMatchProf: IUser | undefined = allUsers.find(
      (element) => element.name === professional.name
    )
    const isMatchUser: IUser | undefined = allUsers.find(
      (element) => element.name === appointment.scheduledBy
    )

    isMatchProf?.scheduledAppointments.push(appointment)
    isMatchUser?.scheduledAppointments.push(appointment)
    console.log(isMatchProf)

    if (isMatchProf)
      localStorage.setItem(professional.name, JSON.stringify(isMatchProf))

    localStorage.setItem(appointment.scheduledBy, JSON.stringify(isMatchUser))

    const updatedStorage = localStorage.getItem(appointment.scheduledBy)

    sessionStorage.setItem('currentUser', updatedStorage!)

    toast({
      title: 'Appointment Created',
      description: 'Please log out and log in to check the appointments :(',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    //Aqui tengo que volver a recoger lops datos del localStorage para no tener que  deslogeasr y logeasr
  }
  return (
    <Flex justifyContent="center" w="100vw" mt="5rem">
      <Avatar mr="5px" size="sm"></Avatar> {professional.name}{' '}
      {professional.specialty}
      <Button onClick={saveAppointments}>schedule!</Button>
      <>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
      </>
    </Flex>
  )
}

export default ProfessionalCard
