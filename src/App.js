import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Routes from './routes';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            Car Manager
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        {Routes}
      </Container>
    </>
  );
}

export default App;
