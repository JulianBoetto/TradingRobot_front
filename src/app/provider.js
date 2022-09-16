import React, { createContext, useState } from 'react'

const provider = (props) => {
    const [state, setState] = useState({});
  return (
    <div>
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    </div>
  )
}

export default provider;
export const AppContext = createContext();