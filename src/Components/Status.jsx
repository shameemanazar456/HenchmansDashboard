import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { completedGrievanceContext, grievanceListContext, pendingGrievanceContext, totalGrievanceContext, updateContext } from '../context/Context'
import { getGrievanceApi, getSearchGrievanceApi } from '../services/allApi'

function Status({setGrievances}) {
  const { isUpdate, setIsUpdate } = useContext(updateContext)
  const  {totalGrievances} = useContext(totalGrievanceContext)
  const {pendingGrievances} = useContext(pendingGrievanceContext)
  const {CompletedGrievances} = useContext(completedGrievanceContext)

  const [pending,setPending] = useState(false)
  const [completed,setCompleted] = useState(false)
  const [all,setAll] = useState(true)
  const [searchKey, setSearchKey] = useState("")

  
  const getSolvedGrievances = async ()=>{
    setCompleted(true)
    setAll(false)
    setPending(false)
    const result = await getGrievanceApi("completed")
    setGrievances(result.data)
  }

  const getAllGrievances = async ()=>{
    setCompleted(false)
    setAll(true)
    setPending(false)
    const result = await getGrievanceApi("")
    setGrievances(result.data)
  }
  const getPendingGrievances = async ()=>{
    setCompleted(false)
    setAll(false)
    setPending(true)
    const result = await getGrievanceApi("pending")
    setGrievances(result.data)
  }

  const getSearchedGrievance=async(key) =>{
    const result = await getSearchGrievanceApi(key)
    setGrievances(result.data)
  }

  useEffect(()=>{
    if(all)
    {getAllGrievances()}
    else if(completed){
      getSolvedGrievances()
    }
    else{
      getPendingGrievances()
    }
  },[isUpdate])
  

  return (
    <div className='m-5 '>
      <h4 className='fw-bolder mb-5' style={{color:'violet'}}><FontAwesomeIcon icon={faHouse} className='me-2' />DashBoard</h4>
      <Row>
        <Col md={4}>
        <div className='box m-3 ' onClick={getAllGrievances}>
         <h4 className='text-light'>Total Grievances</h4>
         <h3 className='text-light'>{totalGrievances}</h3>
        </div>
        </Col>
        <Col md={4}>
        <div className='box m-3 ' onClick={getSolvedGrievances}>
        <h4 className='text-light'>Solved Grievances</h4>
        <h3 className='text-light'>{CompletedGrievances}</h3>
        </div>
        </Col>
        <Col md={4}>
        <div className='box m-3 ' onClick={getPendingGrievances}>
        <h4 className='text-light'>Pending Grievances</h4>
        <h3 className='text-light'>{pendingGrievances}</h3>
        </div>
        </Col>
      </Row>
      <Row className='m-5'>
        <Col md={2}></Col>
        <Col md={4}>
        <input type="text" placeholder='Search here' onChange={(e)=>getSearchedGrievance(e.target.value)} className='form-control bg-white w-100' />
        </Col>
        <Col md={2}>
        </Col>
        <Col md={3}>
        <Dropdown >
      <Dropdown.Toggle variant="" id="dropdown-basic" className='btn btn-outline-info'>
        Filter By
      </Dropdown.Toggle>

      <Dropdown.Menu className='w-100 '>
      <Dropdown.Item ><button className='btn btn-transparent' onClick={getAllGrievances}>All Grievances</button></Dropdown.Item>
        <Dropdown.Item ><button className='btn btn-transparent' onClick={getSolvedGrievances}>Completed Grievances</button></Dropdown.Item>
        <Dropdown.Item ><button className='btn btn-transparent' onClick={getPendingGrievances} >Pending Grievances</button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>        </Col>
        <Col md={1}>
        </Col>
      </Row>
    </div>
  )
}

export default Status
