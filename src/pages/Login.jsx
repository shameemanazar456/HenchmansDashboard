import { Password } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { loginAPI } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { loginContext } from '../context/Context'


function Login() {
    const {setIsLogin} = useContext(loginContext)
    const [loginDetails,setLoginDetails] = useState({
        userName:"",
        password:""
    })
    const navigate = useNavigate()
   const validateUser = async(e)=>{
    e.preventDefault()
   const {userName,password}= loginDetails

   if(!userName || !password){
    toast.info('Please fill the form completley')  
   }
    else{
      const result = await loginAPI(loginDetails)
      if(result.status == 200){
        setIsLogin(true)
        sessionStorage.setItem("loginEMail",userName)
        navigate('/dashboard')
      }
      else{
        toast.error(result.response.data)
      }
    }
   

   }

    
  return (
    <div className='wrapper w-100 ' style={{height:'100vh', position:'fixed'}}>
    <Row className='w-100 my-5 m-md-5 p-md-5 '  >
        <Col xs={0} md={4}>
        </Col>
        <Col xs={12} md={4 } className='formWrapper p-5 rounded shadow ' >
        
        <div className=' w-100 d-flex align-items-center justify-content-center flex-column'>
            <h3 className='heading mb-3'>Welcome Admin</h3>
        <img  src="https://imgcdn.stablediffusionweb.com/2024/5/17/81362e7b-382b-43a5-b49a-1c55763e2997.jpg" height='350px' alt="About Image" className='loginImage mb-5' />  
       <div>

        <input type="text" className='form-control bg-white' placeholder='UserName' onChange={(e)=>setLoginDetails({...loginDetails,userName:e.target.value})} />
       </div>
       <div className='mt-4'> 
        <input type="password" className='form-control bg-white' placeholder='Password' onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})} />
       </div>
       <div>
        <button className='btn btn-outline-info mt-4 px-3' onClick={validateUser}>Login</button>
       </div>
         
         </div>
       
        </Col>
       
        <Col md={4}>
        </Col>

    </Row>
    <ToastContainer theme='colored'  position='top-center' autoClose={2000} />

      
    </div>
  )
}

export default Login
