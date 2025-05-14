import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom'; // Removed HashRouter
import HomeScreen from './components/screens/HomeScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import LoginScreen from './components/screens/LoginScreen';
import CartScreen from './components/screens/CartScreen';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;