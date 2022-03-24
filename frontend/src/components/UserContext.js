import React, { useState } from 'react'

const UserContext = React.createContext({
    contextEmail : "anonymous@mail.com",
    contextCategory : "patient",
    contextFname : "anony",
    setContextEmail : () => {},
    setContextCategory : () => {},
    setContextFname : () => {}
});

// const UserProvider = UserContext.Provider
// const UserConsumer = UserContext.Consumer

// const UserState = ({ children }) => {
//   const [baseEmail, setbaseEmail] = useState()
//   return (
//     <Context.Provider value={[baseEmail,setbaseEmail ]}>
//       {children}
//     </Context.Provider>
//   )
// }

export default UserContext;
// export  {UserProvider ,UserConsumer}
