import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useFirebase } from 'react-redux-firebase'
import {Box} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'

const USERS = [
  {
    id: 1,
    displayName: 'user1'
  },

  {
    id: 2,
    displayName: 'user2'
  },

  {
    id: 3,
    displayName: 'user3'
  }
]

const Dashboard = () => {
  const auth = useSelector(state => state.firebase.auth);
  console.log(auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtain data from external api
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      setUsers(USERS);
    }, 1000)

    return () => {
      clearInterval(timeout);
    }
  }, [])

  const firebase = useFirebase();

  const handleLogout = () => {
    firebase.logout()
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  return (
    <Container maxWidth={"md"}>
      Dashboard

      <Typography>Welcome {auth.email}</Typography>
      <Typography>{auth.displayName}</Typography>

      <Button onClick={handleLogout}>Logout</Button>

      { loading && (<LinearProgress />)}
      { users.length > 0 && (
        <Box m={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.displayName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  )
}

export default Dashboard;
