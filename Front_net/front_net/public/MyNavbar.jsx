import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';


const handleLogout = () => {

  localStorage.clear();

   setCart([]); // Réinitialiser le panier à la déconnexion
};


function MyNavbar() {
  return (
    
      
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
      {/* "My Resto" placé à gauche */}
      <Navbar.Brand > <i class="fa-solid fa-utensils"></i>  AL Chikha</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        {/* Les autres liens à droite */}
        <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link as={Link} to="/login" ><i class="fa-solid fa-arrow-right-to-bracket"></i>Login</Nav.Link>
          <Nav.Link as={Link} to="/register"><i class="fa-regular fa-address-card"></i>Register</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}><i class="fa-solid fa-power-off"></i>Log out</Nav.Link>
          {/* <i className="fa-solid fa-cart-shopping" style={{ color: 'red', marginLeft: '10px' }}></i> */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
         
    
  );
}

export default MyNavbar;
