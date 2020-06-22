import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  bottom: 0;
  left: 0;
  opacity: 1;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -10;
`

const Wrapper = styled.div`
  background-color: rgba(102, 102, 102, 0.3);
  height: 100vh;
  width: 100vw;
`

const Video = ({ children, video }) => (
  <Wrapper>
    <Background>
      <video
        autoPlay
        loop
        muted
        style={{ height: '100vh', objectFit: 'cover', width: '100vw' }}
      >
        <source src={video} type='video/mp4' />
      </video>
    </Background>
    {children}
  </Wrapper>
)

export default Video
