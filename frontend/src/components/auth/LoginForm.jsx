import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  console.log(authState);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(loginUser(values.email, values.password));
        navigate("/home");
        
      } catch (error) {
        console.error('Error during login:', error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    },
  });

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          margin: '20px',
          textAlign: 'center',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f4f4f4', // Light greyish color
        }}
      >
        <h1
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Login to Your Account
        </h1>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <TextField
            style={{ marginBottom: '20px' }}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            style={{ marginBottom: '20px' }}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            style={{
              marginTop: '20px',
              background: '#4caf50',
              color: '#fff',
              fontWeight: 'bold',
            }}
            variant="contained"
            fullWidth
            type="submit"
            disabled={authState.isLoading}
          >
            {authState.isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
        <div style={{ marginTop: '20px', fontSize: '16px', color: '#555' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4caf50' }}>Register here</Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
