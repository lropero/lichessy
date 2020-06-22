import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button, Space, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import chess from 'lichessy/assets/chess.mp4'
import lichess from 'lichessy/assets/lichess.png'
import Logo from 'lichessy/assets/logo.svg'
import { updateToken } from 'lichessy/store/session'
import { Video } from 'lichessy/components'

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const Login = () => {
  const dispatch = useDispatch()
  const { account, token } = useSelector(state => state.session)

  useEffect(() => {
    const token = window.location.href.split('#')[1] || ''
    if (token.length) {
      try {
        dispatch(updateToken(JSON.parse(window.atob(token))))
      } catch (error) {
        console.error(error.toString())
      }
    }
  }, [])

  return !Object.keys(account).length && Object.keys(token).length ? (
    <Main>
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: 60 }} />} />
    </Main>
  ) : (
    <Video video={chess}>
      <Main>
        <Logo style={{ height: 130 }} />
        <Space align='center' direction='vertical' size='large'>
          <Typography.Title level={3}>
            Lichess +{' '}
            <a
              href='https://github.com/lropero/chessy.js'
              rel='noopener noreferrer'
              target='_blank'
            >
              chessy.js
            </a>
          </Typography.Title>
          <Button
            href={`${process.env.TOKEN_HOST}${
              process.env.AUTHORIZE_PATH
            }?client_id=${process.env.CLIENT_ID}&redirect_uri=${
              process.env.REDIRECT_URI
            }&scope=${JSON.parse(process.env.SCOPES).join(
              '%20'
            )}&response_type=code&state=${window.location.href}`}
            shape='round'
            size='large'
            style={{ padding: '0 20px' }}
            type='primary'
          >
            <Space>
              Continue with Lichess
              <img src={lichess} style={{ width: 18 }} />
            </Space>
          </Button>
        </Space>
      </Main>
    </Video>
  )
}

export default Login
