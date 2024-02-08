import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; // Your Yup import
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../redux/slices/user";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  
  
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.{8,})/, 'Password must contain a lowercase letter, an uppercase letter, a number, and a special character'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  });
 const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(registerUser(values.username,values.email, values.password)).then(()=>navigate("/home"));
       
       
        
        
      } catch (error) {
        console.error('Error during backend call:', error);
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
          Register for an Account
        </h1>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <TextField
            style={{ marginBottom: '20px' }}
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            required
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
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
          <TextField
            style={{ marginBottom: '20px' }}
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            style={{
              marginTop: '20px',
              background: '#4caf50', // Green color
              color: '#fff', // White text
              fontWeight: 'bold',
            }}
            variant="contained"
            fullWidth
            type="submit"
          >
            Register
          </Button>
        </form>
        <div style={{ marginTop: '20px', fontSize: '16px', color: '#555' }}>
          Already have an account? <Link to="/login" style={{ color: '#4caf50' }}>Login here</Link>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
