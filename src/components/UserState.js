import React, { useState } from 'react'

// const State = {
//   email: '',
//   password: '',
// }

export const Context = React.createContext()

const UserState = ({ children }) => {
  // const[state, setState] = useState(State);
  const [baseEmail, setbaseEmail] = useState()
  const [basePassword, setbasePassword] = useState()

  return (
    <Context.Provider
      value={[baseEmail, basePassword, setbaseEmail, setbasePassword]}
    >
      {children}
    </Context.Provider>
  )
}

export default UserState
