import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import UserFunctions from '../utils/storefunctions/UserFunctions';

const ForgotPassword = () => {
    const email = useRef();
    const {ForgotPasswordFunc} = UserFunctions();
    const onRegisterClick=(e)=>{
        e.preventDefault();
        ForgotPasswordFunc(email.current.value)
    }

  return (
    <div className='flex flex-col bg-blue-300 p-10 space-y-12 justify-center items-center mx-64 my-auto h-screen rounded-full bg-opacity-35'>
        <div className='flex'>
            <form className='flex flex-col space-y-8 bg-blue-400 p-5 rounded-xl' onSubmit={onRegisterClick}>
                <label>Enter the mail which you have registered</label>
                <input ref={email} className='p-2' placeholder='Email'></input>

                <button type='submit' className='p-2 bg-red-400 rounded-lg w-1/2 self-center'>Send Link</button>
            </form>
        </div>
        <div>
            <p>Already a user ? <Link to="/" className='font-semibold'>Login</Link></p>
        </div>
    </div>
  )
}

export default ForgotPassword