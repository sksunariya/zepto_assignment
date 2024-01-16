import React, { useState, useContext, useEffect } from 'react'
import ShowSuggestion from './ShowSuggestion'
import { AppContext } from '../context/ListContext'


const InputComponent = () => {

    const {usedNameList, setUsedNameList} = useContext(AppContext);
    const {remainingNameList, setRemainingNameList} = useContext(AppContext);
    const {suggestNameList, suggestNameHandler} = useContext(AppContext);


    // const [ShowSuggestion, setShowSuggestions] = useState(false);

    const {inputText, setInputText} = useContext(AppContext);

    function textChangeHandler(event) {
        setInputText(event.target.value);
    }

    function removeNameHandler (event) {
        const name = event.target.parentElement.innerText.split(" ×")[0];
        setUsedNameList( (prev) => prev.filter(item => item !== name) )
        setRemainingNameList( (prev) => [...prev, name])
    }


    const {alertLastName, setAlertLastName} = useContext(AppContext);

    const handleKeyDown = event => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (alertLastName === true) {
                const lastName = usedNameList.pop();
                setRemainingNameList( (prev) => [...prev, lastName]);
                setAlertLastName(false);
            }
            else if (inputText.length == 0 && usedNameList.length){
                setAlertLastName (true);
            }
        }
        };


  return (
    <div className=' w-11/12 max-w-xl'>
        <div className='bg-[#424854] border-b-2 border-opacity-30 shadow-lg p-[6px] border-white rounded-lg'>
            <div className=' inline-block'>
                {
                    usedNameList.map( (item, index) => (
                        <div key={index} className={`mx-1 my-1 inline-block ${alertLastName && index === usedNameList.length-1 ? ('border-white border-2 text-white')  : ('border-none')}  bg-slate-500 pl-4 py-1 text-lg rounded-lg`}>
                            {item} <span onClick={removeNameHandler} className=' hover:bg-slate-600 text-xl rounded-[2rem] px-2 pb-1'>×</span>
                        </div>
                    ))
                }
            </div>
            <input id='inputEle' className={`text-white inline-block focus:outline-none label-shadow bg-[#424854] py-3 px-6  rounded-lg`}
                type='text'
                placeholder='Enter Name'
                spellCheck={false}
                value={inputText}
                onChange={textChangeHandler}
                onKeyDown={handleKeyDown}
            />
        </div>

        <ShowSuggestion/>

    </div>
  )
}

export default InputComponent