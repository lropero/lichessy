import Chessboard from 'chessboardjsx'
import React from 'react'
import styled from 'styled-components'

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const Lobby = () => (
  <Main>
    <Chessboard orientation='white' position='' width={500} />
  </Main>
)

export default Lobby
