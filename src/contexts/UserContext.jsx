import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        userId: 1,
        login: "johndoe",
        balance: 200.0,
    });

    const updateBalance = (newBalance) => {
        setUser({...user, balance: newBalance});
    };

    return (
        <UserContext.Provider value={{user, updateBalance}}>
            {children}
        </UserContext.Provider>
    );
};
