import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import img from '../assets/draw2.webp';

function LoginPage({ onLogin }) {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className='w-75 mx-auto'>
      <div className="mt-5 d-flex align-items-center gap-5">
        <div className="left">
          <img width={'700px'} src={img} alt="Login Illustration" />
        </div>
        <div className="right">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingUsername"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <button
              style={{
                border: '2px solid #bc93f1',
                background: '#dec8fa',
                cursor: 'pointer',
                padding: '6px 22px',
                marginTop: '16px',
                borderRadius: '6px'
              }}
              type='submit'
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
