import React from 'react'
import background from "../assets/login.jpg"
import styled from "styled-components"

function BackGroundImage() {
  return (
    <Container>
        <img src={background} alt="background"/>
    </Container>
  )
}

const Container=styled.div`
      height:100vh
      width:100vh
      img{
        height:100vh;
        width:100vh;
      }
`;

export default BackGroundImage;