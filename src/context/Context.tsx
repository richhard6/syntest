import React, { useState, useEffect, createContext, FC } from 'react'

interface IContext {
  dark: boolean
  toggleDark?: () => void
  log: boolean
  toggleLog?: () => void
}

const defaultState = {
  dark: false,
  log: false,
}

const Context = createContext<IContext>(defaultState)

export const ContextProvider: FC = ({ children }) => {
  const [dark, setDark] = useState(defaultState.dark)

  const [log, setLog] = useState(defaultState.log)

  const toggleDark = () => {
    setDark(!dark)
  }

  const toggleLog = () => {
    setLog(!log)
  }

  return (
    <Context.Provider
      value={{
        dark,
        toggleDark,
        log,
        toggleLog,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context
