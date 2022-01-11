import { IUser } from '../interfaces/interfaces'

import { useState, useEffect } from 'react'

export const useUser = () => {
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

  return currentUser
}
