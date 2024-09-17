import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { getGrievanceApi, UpdateGrievanceAPI } from '../services/allApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateContext } from '../context/Context';


function ReviewGrievance({ review }) {
  const { isUpdate, setIsUpdate } = useContext(updateContext)


  const [show, setShow] = useState(false)

  const [updateGrievance, setUpdateGrievance] = useState({
    _id: review._id,
    userName: review.userName,
    email: review.email,
    complaint: review.complaint,
    status: review.status
  })
  const handleClose = () => {
    setShow(false)

  };
  const handleShow = () => {
    console.log(updateGrievance);
    console.log(updateGrievance);


    setShow(true)
  };

  const updateStatus = (value) => {
    if (value) {
      setUpdateGrievance({ ...updateGrievance, status: 'completed' })
    }
    else {
      setUpdateGrievance({ ...updateGrievance, status: 'pending' })

    }

    console.log(updateGrievance);


  }

  const handleUpdate = async () => {
    const result = await UpdateGrievanceAPI(updateGrievance)
    if (result.status == 200) {
      toast.success('Status Updated')
      const res = await getGrievanceApi()
      //setGrievancesContext(res.data)
      setIsUpdate(!isUpdate)
      setTimeout(() => {
        handleClose()
      }, 2000);
    }
  }
  useEffect(() => {
    setUpdateGrievance({
      _id: review._id,
      userName: review.userName,
      email: review.email,
      complaint: review.complaint,
      status: review.status
    })


  }, [])

  return (
    <>
      <button className='btn btn-warning me-2'><FontAwesomeIcon className='text-light' onClick={handleShow} icon={faPenToSquare} style={{ color: "#adc0e1", }} /></button>

      <Modal show={show} onHide={handleClose} className='p-5 '>


        <Modal.Header closeButton>
          <Modal.Title>Grievance Review</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-5'>
          <div>
            <form action="">
              <input type="text " className='form-control w-100 mb-3 bg-white' value={updateGrievance.userName} readOnly />
              <input type="text " className='form-control w-100 mb-3 bg-white' value={updateGrievance.email} readOnly />
              <input type="text " className='form-control w-100 mb-3 bg-white' value={updateGrievance.complaint} readOnly />
              <Dropdown className='w-100'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {updateGrievance.status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => updateStatus(false)}  >Pending</Dropdown.Item>
                  <Dropdown.Item onClick={() => updateStatus(true)} >completed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default ReviewGrievance
