import './suppliesList.css';
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Table, Form, Modal } from 'react-bootstrap';  
import { Link } from "react-router-dom";

const SuppliesList = () => {

  const [supplies, setSupplies] = useState([])
  const [filteredSupplies, setFilteredSupplies] = useState([]);
  const [deleteSupplyId, setDeleteSupplyId] = useState(null);
  const [deleteSupplyName, setDeleteSupplyName] = useState(null);
  const searchInputRef = useRef(null);
  const userId = localStorage.getItem('userId');

  //delete confirmation modal
  const [show, setShow] = useState(false);
  const deleteConfirmation = () => {
    if (deleteSupplyId) {
      deleteSupply(deleteSupplyId);
      setDeleteSupplyId(null);
      setDeleteSupplyName(null);
      }
      setShow(false);
    }

  const getSupplies = async () => {
    const response = await axios.get(`http://localhost:80/material-minder/api/supplies/?userId=${userId}`)
    try {
        console.log(response.data);
        setSupplies(response.data);
        } catch (error) {
          console.error(error);
          throw new Error('Failed to get supplies');
        }  
    }
 
  useEffect(() => {
    getSupplies()   
  }, [])

  const deleteSupply = (id) => {
    axios.delete(`http://localhost:80/material-minder/api/supply/${id}/delete`)
      .then(function (response) {
      console.log(response.data)
      getSupplies()
    })
  }

  const handleSearch = () => {
    const searchValue = searchInputRef.current.value.toLowerCase();

    if (searchValue === "") {
      setFilteredSupplies([]);
    } else {

      const filteredSupplies = supplies.filter((supply) => {
        const itemName = supply.name.toLowerCase();
        const itemColour = supply.colour.toLowerCase();
        const itemLocation = supply.location.toLowerCase();
        const itemSupplier = supply.supplier.toLowerCase();
        const itemType = supply.type.toLowerCase();

        return itemName.includes(searchValue) || itemColour.includes(searchValue) || itemLocation.includes(searchValue) || itemSupplier.includes(searchValue) || itemType.includes(searchValue);
      });

      setFilteredSupplies(filteredSupplies);
    };
  }

 //to highlight text of the supply item if quantity is below 2
  const highlightText = (supply) => {
    const quantityAvailable = supply.total_purchased - supply.total_used;
    if ( quantityAvailable < 2) {
      return <span style={{ color: 'red' }}>{quantityAvailable}</span>
    } else {
      return quantityAvailable
    }
  }

  return (
    <>
    <div className='supplies'>
      <h1 className='auth-h1 py-2'>Supplies List</h1>  

      <Form.Control
          className="search-input"
          type="text"
          name="search"
          placeholder="Search..."
          ref={searchInputRef}
          onChange={handleSearch}
      />
      
      <div className='p-5'>  
        <Table striped bordered hover>  
          <thead>  
            <tr>  
              <th>#</th>  
              <th>Image</th>
              <th>Item Name</th>
              <th>Price per unit</th>
              <th>Size</th>
              <th>Item Type</th> 
              <th>Colour</th>
              <th>Amount Available</th>
              <th>Storage Location</th>
              <th>Supplier</th> 
              <th>Edit</th>   
              <th>Update Quantity</th>
              <th>Delete</th>
              <th>Details</th>
            </tr>  
          </thead>  
          <tbody>  
            {(filteredSupplies.length > 0 ? filteredSupplies : supplies).map((supply, key) => 
              <tr key={key} style ={{color:highlightText(supply)}}>
                <td>{supply.id}</td>
                {supply.image ?
                  (<td><img src={`http://localhost:80/material-minder/api/${supply.image}`} alt="item image" style={{ width: '50px' }} /></td>) : (<td>No image</td>)}
                <td>{supply.name}</td>
                <td>{supply.price}</td>
                <td>{supply.size}</td>
                <td>{supply.type}</td>
                <td>{supply.colour}</td>
                <td>{highlightText(supply)}</td>
                <td>{supply.location}</td>
                <td>{supply.supplier}</td>
                <td><Link to={`/supply/${supply.id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Link></td>
                <td><Link to={`/supply/${supply.id}/quantity`}><i className="fa-solid fa-calculator"></i></Link></td>
                {/* <td onClick={() => deleteSupply(supply.id)}><i className="fa-solid  */}
                <td onClick={() => { setDeleteSupplyId(supply.id); setDeleteSupplyName(supply.name); setShow(true); }}><i className="fa-solid 
                fa-trash"></i>
                </td>
                <td><Link to={`/supply/${supply.id}/details`}><i className="fa-solid fa-circle-info"></i></Link></td>
              </tr>
            )} 
          </tbody>  
          </Table>    
        </div>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete {deleteSupplyName}?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={() => setShow(false)}>No</button>
            <button className="btn btn-success" onClick={deleteConfirmation}>Yes</button>
          </Modal.Footer>
        </Modal>
      </div>
      
    </>
  )
}

export default SuppliesList

