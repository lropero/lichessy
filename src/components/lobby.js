import Chessboard from 'chessboardjsx'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { debounceTime } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

import { useLichess } from 'lichessy/hooks'

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const Lobby = () => {
  const lichess = useLichess()

  const [width, setWidth] = useState(
    window.innerHeight < window.innerWidth
      ? window.innerHeight
      : window.innerWidth
  )

  useEffect(() => {
    const resize = fromEvent(window, 'resize')
      .pipe(debounceTime(10))
      .subscribe(({ target }) =>
        setWidth(
          target.innerHeight < target.innerWidth
            ? target.innerHeight
            : target.innerWidth
        )
      )
    return () => resize.unsubscribe()
  }, [])

  useEffect(() => {
    const fetchPlaying = async () => {
      try {
        const playing = await lichess.getPlaying()
        console.log('playing', playing)
      } catch (error) {
        console.error(error.toString())
      }
    }
    fetchPlaying()
  }, [lichess])

  return (
    <Main>
      <Chessboard
        orientation='white'
        position=''
        width={Math.round(width * 0.75)}
      />
    </Main>
  )
}

export default Lobby
