import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/ListContext';

const ShowSuggestion = () => {

    const {usedNameList, setUsedNameList} = useContext(AppContext);
    const {remainingNameList, setRemainingNameList} = useContext(AppContext);
    
    const {suggestNameList, setSuggestNameList} = useContext(AppContext);

    const {inputText, setInputText} = useContext(AppContext);

    const {alertLastName, suggestNameHandler} = useContext(AppContext);

    useEffect(
        () => setSuggestNameList ( () => remainingNameList.filter( item => {
            const lowerCaseName = item ? item.toLowerCase() : "";
            const lowerCaseInput = inputText ? inputText.toLowerCase() : '';
            return lowerCaseName.includes(lowerCaseInput);
            })),
        [inputText, alertLastName]
    )

    function addNameHandler (event) {
        const name = event.target.innerText;
        setUsedNameList( (prev) => [...prev, name])
        setRemainingNameList( (prev) => prev.filter(item => item !== name) )
        setSuggestNameList([]);
        setInputText('');
    }

    function removeNameHandler (event) {
        const name = event.target.innerText;
        setUsedNameList( (prev) => prev.filter(item => item !== name) )
        setRemainingNameList( (prev) => [...prev, name])
    }

  return (
    <div className=' mt-2 bg-slate-500 rounded-md border '>
        {inputText && suggestNameList && suggestNameList.length !== 0 &&
            suggestNameList.map((item, index) => (
                <div key={index} onClick={addNameHandler} className={` pl-5 rounded-full py-1 text-lg text-white hover:text-black hover:bg-slate-700`}>
                    {item}
                </div>
            ))
        }
    </div>
  )
}

export default ShowSuggestion