import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
  let navigate = useNavigate();

  const handleLogin = () => {
    // logic for authentication would be here
    // after successful login, redirect to the main app
    navigate("/app");
  }

  return (
    <div className="login">
      <Button variant="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;

