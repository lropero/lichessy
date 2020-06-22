import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ProtectedRoute from './protected-route'
import routes from './routes'
import { NotFound } from 'lichessy/components'
import { updateAccount } from 'lichessy/store/session'
import { useLichess } from 'lichessy/hooks'

const Router = () => {
  const dispatch = useDispatch()
  const lichess = useLichess()
  const { account, token } = useSelector(state => state.session)

  useEffect(() => {
    const fetchAccount = async () => {
      const account = await lichess.getAccount()
      dispatch(updateAccount(account))
    }
    if (Object.keys(token).length) {
      fetchAccount()
    }
  }, [token])

  const isAuthenticated = Object.keys(account).length

  return (
    <BrowserRouter>
      <Switch>
        {routes.public.map((route, index) => (
          <Route exact key={`public-${index}`} path={route.path}>
            {route.redirect ? (
              <Redirect to={route.redirect} />
            ) : route.path === '/login' && isAuthenticated ? (
              <Redirect to='/' />
            ) : (
              <Route component={route.component} />
            )}
          </Route>
        ))}
        {routes.protected.map((route, index) => (
          <ProtectedRoute
            exact
            isAuthenticated={isAuthenticated}
            key={`protected-${index}`}
            path={route.path}
          >
            {route.redirect ? (
              <Redirect to={route.redirect} />
            ) : (
              <Route component={route.component} />
            )}
          </ProtectedRoute>
        ))}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
