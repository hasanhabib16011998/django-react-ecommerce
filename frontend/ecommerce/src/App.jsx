import React from 'react'
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <NavBar/>
    <Container>
    <h1>Welcome to DRF app using React Redux</h1>

    </Container>
    <Footer/>

    </>
  )
}

export default App