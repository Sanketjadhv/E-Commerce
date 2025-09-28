import React, { useContext, useState } from 'react'
import Logo from '../assets/vcart logo.png'
import Google from '../assets/google.png'
import { useNavigate } from 'react-router-dom'
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5"
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import {auth, provider} from '../../utils/Firebase';
import {userDataContext} from '../context/userContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';



function Login() {
    let [show, setShow] = useState(false)
    let [email,setEmail] =useState("")
    let [password,setPassword] =useState("")
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataContext)
    const [loading , setLoading] = useState(false)


      let navigate = useNavigate()

      const handleLogin = async (e)=>{
        e.preventDefault();
        try{
          let result = await axios.post(serverUrl +'/api/auth/login',{
            email,password
          },{withCredentials:true})
          console.log(result);
          toast.success("Login Successfully")
          getCurrentUser()
          navigate("/")

        }catch(error){
          console.log(error)
          toast.error("Login Error")
        }
      }

        const googleLoginUp = async () =>{
          try{
            const response = await signInWithPopup(auth, provider)
            let user = response.user;
            let name = user.displayName;
            let email = user.email;
      
            const result = await axios.post(serverUrl +"/api/auth/googlelogin",{
              name,email
            },{withCredentials:true})
            console.log(result.data)
            toast.success("Google Login Successfully")
            getCurrentUser()
            navigate("/")

          }catch(error){
              console.log(error);
              toast.success("Google Login Error Occured")
          }
        }
      return (
       <>
       <div className='w-[100%] h-[100%] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
        <div className='w-[100%] flex items-center justify-start pr-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
            <img className='w-[100px]' src={Logo} alt="" />
            <h1 className='text-[22px] font-sans'>SanpCart</h1>
        </div>
    
    
        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
          <span className='text-[25px] font-semibold'>Login Page</span>
          <span className='text-[16px]'>Welcome to Sanpcart ,Place your order</span>
        </div>
    
    
          <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
            <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
              <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLoginUp}>
                  <img  src={Google} alt="" className='w-[20px]' />Login with google
              </div>
    
            <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>Or<div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            </div>
    
    
            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email} />
                <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password} />
                {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[56%]' onClick={()=>setShow(prev=> !prev)}/>}
                {show && <IoEyeOffOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[56%]' onClick={()=>setShow(prev=> !prev)}/>} 
                <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
                  {loading ? <Loading/> : "Login"}
                </button>
                <p className='flex gap-[10px]'>You have not any account?<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>New Registration</span></p>
            </div>
            </form>
            </div>
          </div>
    </>
  )
}

export default Login  