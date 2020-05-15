import Login from './pages/Login'
import Register from './pages/Register'
import React, {Fragment} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import {useSelector} from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'

const AuthGuard = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);

  if (!auth.isLoaded) {
    return <LinearProgress height={40} />
  }

  if (!auth.uid) {
    return <Redirect to="/login" />
  }

  return (
    <>
      {children}
    </>
  )
}

const routes = [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    exact: true,
    path: '/login',
    component: Login
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/dashboard',
    component: Dashboard
  },
  {
    exact: true,
    path: '/register',
    component: Register
  }
];

const TheRouter = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;

          if (route.guard) {
            return (
              <Route
                key={i}
                path={route.path}
                exact={route.exact}
                render={(props) =>
                  <Guard>
                    <route.component {...props} />
                  </Guard>
                }
              />
            )
          }

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => <route.component {...props} />}
            />
          )
        })}
      </Switch>
    </Router>
  )
};

export default TheRouter;
