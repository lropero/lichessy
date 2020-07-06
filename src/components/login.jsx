import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Space, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import chessVideo from 'lichessy/assets/chess.mp4'
import lichessLogo from 'lichessy/assets/lichess.png'
import Logo from 'lichessy/assets/logo.svg'
import { updateAccount } from 'lichessy/store/account'
import { useApi } from 'lichessy/hooks'
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
  const api = useApi()
  const dispatch = useDispatch()

  const [fetchingAccount, setFetchingAccount] = useState(true)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const account = await api.getAccount()
        dispatch(updateAccount(account))
      } catch (error) {
        setFetchingAccount(false)
      }
    }
    const account = window.location.href.split('#')[1] || ''
    if (account.length) {
      try {
        dispatch(updateAccount(JSON.parse(window.atob(account))))
      } catch (error) {
        setFetchingAccount(false)
      }
    } else {
      fetchAccount()
    }
  }, [])

  return fetchingAccount ? (
    <Main>
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: 60 }} />} />
    </Main>
  ) : (
    <Video video={chessVideo}>
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
            }?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env
              .REDIRECT + process.env.REDIRECT_URI}&scope=${JSON.parse(
              process.env.SCOPES
            ).join('%20')}&response_type=code&state=${window.location.href}`}
            shape='round'
            size='large'
            style={{ padding: '0 20px' }}
            type='primary'
          >
            <Space align='center'>
              Continue with Lichess
              <img src={lichessLogo} style={{ width: 18 }} />
            </Space>
          </Button>
        </Space>
      </Main>
    </Video>
  )
}

export default Login
