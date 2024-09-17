/* COMPONENT TO DISPLAY GRIEVANCES (DELETE/EDIT GRIEVANCES) */

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from '@mui/material'
import { Button, Dropdown, Modal } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react'
import { deleteGrievanceAPI, UpdateGrievanceAPI } from '../services/allApi'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateContext } from '../context/Context';

function GrievanceList({ grievances }) {
  const { isUpdate, setIsUpdate } = useContext(updateContext)
  const [showEdit, setShowEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [deleteGrievance, setDeleteGrievance] = useState({})
  const [page, setPage] = useState(1)
  const [pageNo, setPageNo] = useState([])
  const paginationArray = []
  const [updateGrievance, setUpdateGrievance] = useState({
    _id: "",
    userName: "",
    email: "",
    complaint: "",
    status: ""
  })

  /* CODE TO IMPLEMENT EDIT GRIEVANCE FUNCTIONALITY */
  const handleCloseEdit = () => {
    setShowEdit(false)

  };
  const handleEdit = (item) => {
    console.log(item);
    setUpdateGrievance(item)
    console.log(updateGrievance);
    setShowEdit(true)
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
      setIsUpdate(!isUpdate)
      setTimeout(() => {
        handleCloseEdit()
      }, 2000);
    }
  }

/* CODE FOR DELETE FUNCIONALITY */
  const handleClose = () => {
    setDeleteGrievance({})
    setShow(false)
  }
  const handleShow = (value) => {
    setDeleteGrievance(value)
    setShow(true)
  };
  const handleDelete = async () => {
    console.log(deleteGrievance);

    const result = await deleteGrievanceAPI(deleteGrievance)
    console.log(result);

    if (result.status == 200) {
      toast.success('Grievance Deleted')
      setTimeout(() => {
        handleClose()
      }, 2000);
    }
    else {
      toast.error(result.response.data)
    }
  }

  //CODE TO IMPLEMENT PAGINATION
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= ((grievances.length / 5) + 1) && selectedPage !== page) {
      setPage(selectedPage)
    }
  }
  useEffect(() => {
    const lengthArray = ((grievances.length / 5) + 1)
    console.log(lengthArray);

    for (let i = 1; i <= lengthArray; i++) {
      paginationArray[i - 1] = i
    }
    setPageNo(paginationArray);

  }, [])

  return (
    <div className='d-flex align-items-center justify-content-center flex-column w-100'>
        
      <Table responsive className='w-75 shadow'>
        <thead>
          <tr>
            <th className='p-3'>Id</th>
            <th>UserName</th>
            <th>Grievance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grievances.slice((page * 5 - 5), page * 5).map((item, i) => (<tr>
            <td className='p-3'>GRC{(item._id).slice(15,20)}</td>
            <td>{item.userName}</td>
            <td>{(item.complaint).trim(0, 10)} ...</td>
            <td>{item.status}</td>
            <td className='d-flex'>
              <button className='btn btn-warning me-2' onClick={() => handleEdit(item)}><FontAwesomeIcon className='text-light' icon={faPenToSquare} style={{ color: "#adc0e1", }} /></button>
              <button className='btn btn-danger' onClick={() => handleShow(item)}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
          </tr>))}
        </tbody>
      </Table>
      {/* PAGINATON DISPLAY */}
      {<div className="pagination">
        <button onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "m-2" : " m-2 pagination__disable"}>◀</button>

        {pageNo.map((i) => (
          <button key={i} onClick={() => selectPageHandler(i)} className={page == i ? "pagination__selected m-2" : "m-2"}>{i} </button>
        ))}

        <button onClick={() => selectPageHandler((page + 1))} className={page < grievances.length / 5 ? "m-2 " : "m-2 pagination__disable"}>▶</button>
      </div>}

      {/* MODAL FOR CONFIRM DELETION */}
      <Modal show={show} onHide={handleClose} className='p-5 '>


        <Modal.Header closeButton>
          <Modal.Title>Click Delete button to confirm deletion</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL FOR EDITING */}
      <Modal show={showEdit} onHide={handleCloseEdit} className='p-5 '>


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
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />


    </div>

  )
}

export default GrievanceList
