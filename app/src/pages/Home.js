import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Typography>Users Crud web application</Typography>
      <Box m={2}>
        <Link to="/login">Login</Link>
      </Box>
      <Box m={2}>
        <Link to="/register">Register</Link>
      </Box>
    </div>
  )
}

export default Home;
