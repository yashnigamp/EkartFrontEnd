import Register from './Register';
import Login from './Login';
import Home from './Home';
import ForgetPassword from './ForgetPassword';
import Product from './Products';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <main >
      <Router>
        <Routes>
          <Route exact path='/'element={<Home/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route path='/register' element ={<Register/>}/>
          <Route path = '/forgetPassword' element={<ForgetPassword/>}/>
          <Route path= '/products' element={<Product/>}/>
        </Routes>
      </Router>
      
    </main>
  );
}

export default App;