import { useState } from 'react'
import {useCallback} from 'react'// memories the fucntion and use them when require
import { useEffect } from 'react' // to solve too many render problem(this is not the exact defination, thsi is just for this program)
import { useRef } from 'react' //for copy button
import './App.css'

function App() {
  const [length, setlength] = useState(8);// lengthe is 8 and setlength  setlength is method
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  //useRef hook
  const passwordRef=useRef(null); //it is only used to highlight the thext in the input when copy button is clicked

  const passwordGenerator = useCallback(fn,[length, numberAllowed, charAllowed, setPassword]);//we can  remove setPassowr
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator]);//we can remove passwordGenerator
  const coppyPassowrd =useCallback(()=>{
    passwordRef.current?.select() //"?" it is use for the case is no value is prensent in the input then nothing will get selected
    //passwordRef.current?.setSelectionRange(0,8); // this select the range of the input to be coppied or selected
    window.navigator.clipboard.writeText(password)},[password])
  function fn(){
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){str+="0123456789";}
    if(charAllowed){str+="!@#$%^&*_-=+";}

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length);
      pass+=str[char];
    }
    setPassword(pass);
  }
  // passwordGenerator();
  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-4 my-8 text-orange-500 bg-gray-700 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>

          {/* generated passowrd */}
          <input 
            type="text" 
            value={password}
            placeholder='Password'
            readOnly 
            className='outline-none w-full py-1 px-3'  
            ref={passwordRef}>
          </input>

          {/* Click buttom */}
          <button className='outline-none bg-blue-700 text-white px-3 py-0,5 shrink-0'
          onClick={coppyPassowrd}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex  items-centerm gap-x-1'>
            {/* range set */}
            <input 
              type='range' 
              min={8} max={25} 
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
            >
            </input>
            <label className='text-white'>Length:{length}</label>
          </div>
          <div className='flex items-center gapx-1'>

            {/* Number allowed selector */}
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev);
              }}
              >
            </input>
            <label className='text-white' htmlFor='numberInput'>Number</label>
          </div>


           {/* charactor allwed selector*/}
          <div className='flex items-center gapx-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev);
              }}
              >
            </input>
            <label className='text-white' htmlFor='charInput'>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
