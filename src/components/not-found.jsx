import React from 'react'
import styled from 'styled-components'
import { MehTwoTone } from '@ant-design/icons'
import { Space, Typography } from 'antd'

const Main = styled.div`
  align-items: center;
  background-color: #111111;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const NotFound = () => (
  <Main>
    <Space align='center' direction='vertical' size='middle'>
      <MehTwoTone style={{ fontSize: '10em' }} />
      <Typography.Title level={3} style={{ color: '#4091f7' }}>
        404 Page not found
      </Typography.Title>
    </Space>
  </Main>
)

export default NotFound
