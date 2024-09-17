import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import Status from '../Components/Status'
import GrievanceList from '../Components/GrievanceList'
import { getGrievanceApi } from '../services/allApi'
import { completedGrievanceContext, grievanceListContext, loginContext, pendingGrievanceContext, totalGrievanceContext, updateContext } from '../context/Context'
import { Link } from 'react-router-dom'

function Dashboard() {
  const {isUpdate, setIsUpdate} = useContext(updateContext)

  const [grievances, setGrievances] = useState([])
  const [pending,setPending] = useState(false)
  const [completed,setCompleted] = useState(false)
  const [all,setAll] = useState(true)

  const {grievancescontext, setGrievancesContext} = useContext(grievanceListContext)
  const  {totalGrievances,setTotalGrievances} = useContext(totalGrievanceContext)
  const {pendingGrievances,setPendingGrievances} = useContext(pendingGrievanceContext)
  const {CompletedGrievances, setCompletedGrievances} = useContext(completedGrievanceContext)
  const {isLogin,setIsLogin} = useContext(loginContext)
  const setCount = ()=>{
      setTotalGrievances(grievancescontext.length)
      //console.log(totalGrievances);

      setCompletedGrievances(grievancescontext.filter((item)=>item.status == 'completed').length)

      setPendingGrievances(grievancescontext.filter((item)=>item.status != 'completed').length)
    }
  const getGrievances = async()=>{
    const result = await getGrievanceApi("")
    setGrievancesContext(result.data)
    console.log(grievances)
    setCount()
    
  }
  useEffect(()=>{
    if(sessionStorage.getItem("loginEMail")){
      setIsLogin(true)
      getGrievances()
   }
   },[isUpdate,grievancescontext,grievances])
  

  return (
    <>{isLogin ?<div>
      <Header/>
      <h3 className='pb-3 text-light text-center'>Welcome Henchman</h3>
      <Row>
        <Col xs={0} md={1} >
        </Col>
        <Col xs={12} md={10} className=' rounded' style={{background:'white'}}>
        <Status setGrievances={setGrievances}/>
        <div className='m-5 d-flex align-items-center justify-content-center'><GrievanceList grievances={grievances}/></div>
    </Col>
      </Row>
   </div>:
   <div className='d-flex align-items-center justify-content-center' style={{height:'100vh'}}>
    <Link to={'/'}><img  src="https://cdn.dribbble.com/users/2234430/screenshots/8587843/media/5a7b6b3be7edd17ae98a25d010277e62.gif" alt="" /></Link>
    </div>}
    
      
    </>
  )
}

export default Dashboard
