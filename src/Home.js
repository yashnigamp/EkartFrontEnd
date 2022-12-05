import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
function TextLinkExample() {
  return (
   <>
    <h1>Welcome to Ekart</h1>

    <Link to="/login" style={{color:"black"}}>Sign In    </Link>
    &emsp;
    <Link to="/register"  style={{color:"black"}}>   Sign Up</Link>

    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="q.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="e.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="r.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
   </>
  );
}

export default TextLinkExample;