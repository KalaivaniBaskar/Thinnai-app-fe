import { createContext, useState, useContext } from "react";

const CtxContext = createContext({});

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({
        id: "",
        username: "",
        email : "",
        phone: "",
        contacts : [],
        role: ""
    }); 
   
    return (
        <CtxContext.Provider value={{ user, setUser}}>
            {children}
        </CtxContext.Provider>
    )
}
export default CtxContext; 

export const useCTX = () => {
    return useContext(CtxContext);
}