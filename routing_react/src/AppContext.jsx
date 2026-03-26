import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState('Hello from AppContext');

    const value = {
        state,
        setState,
    };

    return (
      <AppContext.Provider value={state}>
     
        {children}

      </AppContext.Provider>
    );
};