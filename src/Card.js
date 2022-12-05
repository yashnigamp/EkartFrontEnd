import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from './api/axios';
function BasicExample(props) {
    
    const [show, setShow] = useState(false);
  const [productData,setProductData] = useState();
    const handleClose = () => setShow(false);
    const handleShow = async () => {
      const response = await axios.get(`/${props.obj.productName}/details`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }).then((e)=> {
        console.log("hello",e.data.data)
        setProductData(e.data.data);
        setShow(true);
      })
      
        
    }
    
    
  return (
    <>
    <div>
    <Card style={{ width: '400px' }}>
      <Card.Img variant="top" src={props.obj.productPicture} />
      <Card.Body>
        <Card.Title>{props.obj.productName}</Card.Title>
        <Card.Text>
          Manufacturer : {props.obj.manufacturer}
          <br></br>
          Description : {props.obj.description}
        </Card.Text>
        <Button variant="primary"  onClick={handleShow}>Get Details</Button>
      </Card.Body>
    </Card>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{productData?.productName }<h5>Details</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Average Ratings : &#9733; : {productData?.avgRating?.reviews[0].reviewRating}<hr/> Comments: {productData?.avgRating?.reviews[0].reviewComments}
          <hr/>
          Manufacturer: {productData?.manufacturer}
          <hr/>
          Cost: {productData?.cost} &emsp;
          Rating: {productData?.rating}
          <hr/>
          DeliveryCharge: {productData?.deliveryCharge}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BasicExample;