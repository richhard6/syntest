export interface IProfessional {
  name: string
  specialty: string
}
export interface IAppointment {
  scheduledBy: string
  professional: string
  scheduledDate: Date | null
  createdAt: number
  modified: Boolean
}

export interface IUser {
  name: string
  password: string
  professional: Boolean
  scheduledAppointments: IAppointment[]
}

export interface IAppo {
  appointment: IAppointment
}

export interface ILog {
  name: string
  password: string
}
