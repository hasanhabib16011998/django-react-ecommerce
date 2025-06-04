import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser,clearLoginState } from '../../app/loginSlice';

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error, userInfo, success } = useSelector((state) => state.login);

  useEffect(() => {
    if (success && userInfo) {
      dispatch(clearLoginState());
      navigate('/'); // Redirect after login
    }
  }, [success, userInfo, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError("Please fill out all fields");
      return;
    }

    // Note: API expects "username" key, not "email"
    dispatch(loginUser({ username: email, password }));
  };

  return (
    <>
      <Container className='mt-3'>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className='text-center bg-black text-light'>
                Login
              </Card.Header>
              <Card.Body>
                {loading && <Loader />}
                {(localError || error) && (
                  <div className="alert alert-danger">{localError || error}</div>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      <span><i className='fa-solid fa-envelope' /></span>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="pass1">
                    <Form.Label>
                      <span><i className=""></i></span> Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Show password"
                      />
                      {" "}
                      <Form.Control
                        placeholder="Enter Password"
                        required
                        type={showPassword ? "text" : "password"}
                        id="pass1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className='d-grid gap-2'>
                    <Button className='btn btn-md btn-success' type='submit'>Login</Button>
                  </div>
                </Form>
                <Row className='py-3'>
                  <Col>
                    New User?
                    <Link to='/signup'> Sign Up</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginScreen;