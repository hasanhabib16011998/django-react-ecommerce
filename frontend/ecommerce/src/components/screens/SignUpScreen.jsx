import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearRegisterState } from '../../app/registerSlice';

function SignUpScreen() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

 // Redux state
  const { loading, error, userInfo, success } = useSelector((state) => state.registerUser);
  console.log(userInfo);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@*!.\.]).{5,}$/;

  useEffect(() => {
    if (success && userInfo) {
      dispatch(clearRegisterState());
      navigate('/login');
    }
  }, [success, userInfo, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setLocalError(
        "Password must be at least 5 characters and include at least one digit, one lowercase letter, one uppercase letter, and one special character (_ $ @ * ! .)."
      );
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (!fname || !lname || !email || !password || !confirmPassword) {
      setLocalError("Please fill out all fields");
      return;
    }

    // Dispatch register thunk
    dispatch(registerUser({ fname, lname, email, password }));
  };


  return (
    <>
      <Container className='mt-3'>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className='text-center bg-black text-light'>
                Signup
              </Card.Header>
              <Card.Body>
                {loading && <Loader />}
                {(localError || error) && (
                  <div className="alert alert-danger">
                    {localError || error}
                  </div>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>
                      <span><i className='fa fa-user' /></span>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      value={fname}
                      onChange={(e)=> setFname(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>
                      <span><i className='fa fa-user' /></span>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      value={lname}
                      onChange={(e)=> setLname(e.target.value)}
                      required
                    />
                  </Form.Group>
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
                      isInvalid={email && !emailRegex.test(email)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
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
                        id="passinput1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={password && !passwordRegex.test(password)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 5 chars, contain 1 digit, 1 lowercase, 1 uppercase, and 1 special (_ $ @ * ! .)
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="pass2">
                    <Form.Label>
                      <span><i className=""></i></span> Confirm Password
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Show confirm password"
                      />
                      {" "}
                      <Form.Control
                        placeholder="Confirm your Password"
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        id="passinput2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isInvalid={confirmPassword && password !== confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className='d-grid gap-2'>
                    <Button className='btn btn-md btn-success' type='submit'>Sign Up</Button>
                  </div>
                </Form>

                <Row className='py-3'>
                  <Col>
                    Already User?
                    <Link to='/login'> Log In</Link>
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

export default SignUpScreen