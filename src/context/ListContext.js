import { createContext } from "react";
import { list } from "../data/suggestionList";
import { useState } from 'react';


export const AppContext = createContext();

export default function AppContextProvider ({children}){

    const [usedNameList, setUsedNameList] = useState([]);
    const [remainingNameList, setRemainingNameList] = useState([...list]);

    const [alertLastName, setAlertLastName] = useState(false);

    const [suggestNameList, setSuggestNameList] = useState([]);
    const [inputText, setInputText] = useState('');


    const value = {
        usedNameList,
        setUsedNameList,
        remainingNameList,
        setRemainingNameList,
        suggestNameList,
        setSuggestNameList,
        inputText,
        setInputText,
        alertLastName,
        setAlertLastName
    }


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}