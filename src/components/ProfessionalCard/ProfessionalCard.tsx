import { IProfessional } from '../../interfaces/interfaces'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IUser, IAppointment } from '../../interfaces/interfaces'

import { Avatar, Flex, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

type profCard = {
  professional: IProfessional //abstraer typos
}

function ProfessionalCard({ professional }: profCard) {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const toast = useToast()
  const [currentUser, setCurrentUser] = useState<IUser>({
    name: '',
    password: '',
    professional: false,
    scheduledAppointments: [],
  }) //es necesario esto?

  const [currentProfessional, setCurrentProfessional] = useState<IUser>({
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
  }, [])

  useEffect(() => {
    const getCurrentProfessional: IUser = JSON.parse(
      localStorage.getItem(professional.name)!
    )

    setCurrentProfessional((prevProfessional) => {
      return {
        ...prevProfessional,
        ...getCurrentProfessional,
      }
    })
  }, [professional.name])

  const handleDate = (date: Date | null): void => {
    setStartDate(date) //pilla simepre la anterior... BIG BUG
    setAppointment((prevAppointment) => {
      return {
        ...prevAppointment,
        scheduledDate: startDate,
      }
    })
  }

  //SI QUE ESTA GUARDANDO MLAS CITAS PERO SIEMPRE PONE EL DIA ACTUAL!

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

    if (isMatchProf)
      localStorage.setItem(professional.name, JSON.stringify(isMatchProf))

    localStorage.setItem(appointment.scheduledBy, JSON.stringify(isMatchUser))

    const updatedStorage: string | null = localStorage.getItem(
      appointment.scheduledBy
    )

    if (updatedStorage) sessionStorage.setItem('currentUser', updatedStorage)

    toast({
      title: 'Appointment Created',
      description: 'Please go to the appointments tab to view and modify it',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const arrayToDateArray = (): Date[] => {
    const dateArray: Date[] = currentProfessional.scheduledAppointments.map(
      (appointment) => new Date(appointment.scheduledDate!)
    )

    return dateArray
  }

  return (
    <Flex justifyContent="center" w="40vw" mt="5rem">
      <Avatar mr="5px" size="sm"></Avatar> {professional.name}
      {professional.specialty}
      <DatePicker
        selected={startDate}
        onChange={(date) => handleDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeSelect
        /*  excludeTimes={[new Date('2022-01-11T10:53:23Z')]} */
        //problema con el componente datepicker, no cambia la fecha....
        highlightDates={arrayToDateArray()}
      />
      <Button onClick={saveAppointments}>schedule!</Button>
    </Flex>
  )
}

export default ProfessionalCard
