import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import { loginContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { getProfileAPI, updateProfileAPI } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const {setIsLogin} = useContext(loginContext)

  const [show, setShow] = useState(false);

  const [profile,setProfile] =useState({
    userName:"Loading",
    password:"Loading"
  })
  
  

  const handleClose = () => setShow(false);
  const handleShowOffcanvas = () => {
    setShow(true)
   
  }

 const navigate =  useNavigate()

 const handleLogout = ()=>{
  setIsLogin(false)
  sessionStorage.removeItem("loginEMail")
  navigate('/')
 }

 const getProfile = async()=>{
  const result = await getProfileAPI()
  if(result.status == 200){
    setProfile(result.data[0])
    console.log(profile);
    
  }
 }

 const handleUpdate = async()=>{
  const res =await updateProfileAPI(profile)
  if(res.status == 200){
    toast.success('Updated Successfully')
  }
  else{
    toast.error('Interal Error')
    console.log(res);
    
  }
  
 }

 useEffect(()=>{
  getProfile()
  
 },[])


  return (
   <>
      <Navbar collapseOnSelect expand="lg" className='p-2' >
        <Container>
        
            <Navbar.Brand className='text-light' href="#home" onClick={handleShowOffcanvas}>
            <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block "
                alt=""
              />
              <span className='mt-5'>Henchman's Empire</span></Navbar.Brand>
          </Container>
  
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className='ms-auto'>
            <Nav.Link><button className='btn btn-warning' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />Log Out</button></Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
       <Offcanvas show={show} onHide={handleClose} in={open} className='rounded m-3 px-3' style={{height:'450px'}} >
        <Offcanvas.Header closeButton>
         <div className='d-flex align-items-center justify-content-center flex-column w-100 p-3'>
            <img  src="https://imgcdn.stablediffusionweb.com/2024/5/17/81362e7b-382b-43a5-b49a-1c55763e2997.jpg" height='350px' alt="About Image" className='loginImage ' />  
             <h3 className='text-light' > Henchman's Profile </h3>
         </div>
        </Offcanvas.Header> 
        <Offcanvas.Body>
        <div>
                <div className='mt-3 d-flex justify-content-center align-items-center flex-column'>
                    
                    <div className='mb-3  w-100'>
                        <input type="text" placeholder='UserName'value={profile.userName}  onChange={(e)=>setProfile({...profile,userName:e.target.value})} name="" id="" className='form-control' />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" placeholder='Password' value={profile.password}   onChange={(e)=>setProfile({...profile,password:e.target.value})}  name="" id=""  className='form-control' />
                    </div>
                    <div className='mb-3 w-100'>
                        <button  className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer theme='colored'  position='top-center' autoClose={2000} />

   </>

  
  )
}

export default Header
