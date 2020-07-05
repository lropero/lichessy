import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Provider } from 'react-redux'

import App from 'lichessy/app'
import store from 'lichessy/store'

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const hasEnvironmentVariables = !!process.env.CLIENT_ID

ReactDOM.render(
  hasEnvironmentVariables ? (
    <Provider store={store}>
      <App />
    </Provider>
  ) : (
    <Main>
      <p>No environment variables :(</p>
    </Main>
  ),
  document.getElementById('app')
)
