import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Container } from '@mui/material';
import Home from './components/Home/Home';


function App() {

  return (<>
  <Box style={{height:"100vh"}}>
    <Container>

<Home/>

    </Container>
  </Box>
 
  </>
    
  )
}

export default App
