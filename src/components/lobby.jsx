import Chessboard from 'chessboardjsx'
import ndjsonStream from 'can-ndjson-stream'
import oboe from 'oboe'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { debounceTime } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

import { useApi } from 'lichessy/hooks'

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const Lobby = () => {
  const api = useApi()

  const [width, setWidth] = useState(
    window.innerHeight < window.innerWidth
      ? window.innerHeight
      : window.innerWidth
  )

  useEffect(() => {
    const fetchPlaying = async () => {
      try {
        const playing = await api.getPlaying()
        if (playing.nowPlaying.length) {
          const board = await api.getBoard(playing.nowPlaying[0].gameId)
          console.log('board', board)
          const stream = ndjsonStream(board.body)
          console.log('stream', stream)
          const manzana = oboe(stream)
          manzana.start(() => {
            console.log.log('MANZANA START')
          })
        }
      } catch (error) {
        console.error(error.toString())
      }
    }
    const resize = fromEvent(window, 'resize')
      .pipe(debounceTime(10))
      .subscribe(({ target }) =>
        setWidth(
          target.innerHeight < target.innerWidth
            ? target.innerHeight
            : target.innerWidth
        )
      )
    fetchPlaying()
    return () => resize.unsubscribe()
  }, [])

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
