import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axios from "./api/axios";
import CardCustom from "./Card";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Product() {
  const [datab, setData] = useState();

  const [searchData,setSearchData] = useState();
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [search,setSearch] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  var CardOb;
  useEffect(async () => {
    const response = await axios.get("/products", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data);
    await setData(response.data.data);
  }, []);
  //console.log("state",data.data);
  if (datab) {
    CardOb = datab.map((h, i) => {
      return <CardCustom key={i} obj={h} />;
    });
  }

  const handleClick = async () => {
    try{
      const res = await axios.get(`/searchProduct/${search}`,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }).then((d)=>{
        setSearchData(d.data.data);
        handleShow();
      })
    }catch(err){
      console.log(err);
      if (!err?.response) {
        console.log("Hello")
    } else if (err.response?.status === 400 || err.response?.status === 404) {
        toggleShowA();
    } 
    }
   
  }
  return (
    <>
      <Navbar style={{ backgroundColor: " #03203C", color: "white" }}>
        
        <Container>
          <Navbar.Brand style={{ color: "white" }}>Products</Navbar.Brand>
          <Navbar.Toggle />
          
          <Navbar.Collapse className="justify-content-end">
            Ekart
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
      <hr/>
      <label htmlFor="username">Search Product: </label>&emsp;
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              required
            />
            &emsp;
            <Button variant="primary" onClick={handleClick}>Search </Button>
      </Container>
      <hr/>
      <br></br>
      <div className="productCard">{CardOb}</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{searchData?.productName }<h5>Details</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <hr/>
          Manufacturer: {searchData?.manufacturer}
          <hr/>
          Cost: {searchData?.cost} &emsp;
          Rating: {searchData?.rating}
          <hr/>
          DeliveryCharge: {searchData?.deliveryCharge}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position={'middle-center'}>
      <Toast show={showA} onClose={toggleShowA} bg='danger'>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Incorrect Product Name</Toast.Body>
        </Toast>
        </ToastContainer>
    </>
  );
}

export default Product;
