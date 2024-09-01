import React,{useState,useEffect} from 'react'
import './PasswordGenerator.css'
import copyIcon from '../assets/copy-icon.svg'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const upperCaseList='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseList='abcdefghijklmnopqrstuvwxyz'
const numberList='0123456789'
const symbolList='!@#$%^&*'

function PasswordGenerator() {
    const [password,setPassword]=useState('')
    const [lowerCase,setLowerCase]=useState(true)
    const [upperCase,setUpperCase]=useState(true)
    const [numbers,setNumbers]=useState(true)
    const [symbols,setSymbols]=useState(true)
    const [passwordLength,setPasswordLength]=useState(10)
    const generatePassword=()=>{
    let charList=''
    if(upperCase){
        charList+=upperCaseList
    }
        if(lowerCase){
        charList+=lowerCaseList
        }if(numbers){
        charList+=numberList
        }if(symbols){
        charList+=symbolList
        }
        let tempPassword=''
        for(let i=0;i<passwordLength;i++){
            let index=Math.floor(Math.random()*charList.length);
            tempPassword+=charList.charAt(index)
        }
        setPassword(tempPassword)
    
    }
    const copyPassword=async()=>{
        const copiedText=await navigator.clipboard.readText()
        if(password.length && copiedText!==password){
            navigator.clipboard.writeText(password);
            toast.success(' Password Copied to Clipboard', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
                });
        }
    }
    useEffect(()=>{
        generatePassword()
    },[passwordLength])
  return (
    <>
    <div className="container">
        <h2 className="title">Strong Password Generator</h2>
        <div className="password-wrapper">
            <div className="password-area">
                <div className="password">
                    <input type="text" value={password} disabled placeholder='Click on Generate Password'/>
                    <img src={copyIcon} className="copyIcon" onClick={copyPassword}>{}</img>
                </div>
            </div>
        </div>
        <div className="setting">
            <h3>Customise Your Password</h3>
            <div className="customise">
                <div className="checkboxes">
                    <div className="left">
                        <div className="checkbox-field">
                            <input type='checkbox' name='lower' id='lower' checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)}/>
                            <label htmlFor="lower" >Include Lower case(a-z)</label>
                        </div>
                        <div className="checkbox-field">
                            <input type='checkbox' name='upper' id='upper'checked={upperCase} onChange={()=>setUpperCase(!upperCase)}/>
                            <label htmlFor="upper" >Include Upper case(A-Z)</label>
                        </div>
                    </div>
                    <div className="right">
                    <div className="checkbox-field">
                            <input type='checkbox' name='number' id='number' checked={numbers} onChange={()=>{setNumbers(!numbers)}}/>
                            <label htmlFor="number" >Include Numbers(0-9)</label>
                        </div>
                        <div className="checkbox-field">
                            <input type='checkbox' name='symbol' id='symbol' checked={symbols} onChange={()=>setSymbols(!symbols)}/>
                            <label htmlFor="symbol" >Include Symbols(&-#)</label>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        <div className="password-length">
                    <h3>Password Length</h3>
                    <div className="slider">
                        <p className="rangeValue">{passwordLength}</p>
                        <div className="range">
                            <input type='range' min={10} max={40} defaultValue={passwordLength} onChange={(e)=>setPasswordLength(e.currentTarget.value)}/>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button type='button' onClick={copyPassword}>Copy Password</button>
                    <button type="button" onClick={generatePassword}>Generate Password</button>
                </div>
                
    </div>
    <ToastContainer/>
    </>
  )
}

export default PasswordGenerator