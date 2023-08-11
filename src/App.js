import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Route, Link, Routes as Switch } from 'react-router-dom';
import CarList from './pages/cars/carList';
import CarDetail from './pages/cars/carDetail';
import CarCreate from './pages/cars/carCreate';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Car Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Cars</Nav.Link>
              <Nav.Link as={Link} to="/create">New Car</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Switch>
          <Route exact path="/" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/create" element={<CarCreate />} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
