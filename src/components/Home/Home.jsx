import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import CardMain from './../Card/Card';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/dist/locale/ar';


export default function Home() {
  moment.locale("ar"); 
    let [city ,setCity]=useState('القاهرة')
    
    let [date , setDate] = useState(moment().format('LL')  );    
    let [ month,setMonth]=useState()
    let [timer, setTimer] = useState()
    let [Name, setName] = useState()
    
  return <>
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{justifyContent: "space-around"}}
            style={{color:"white"}}>
            <Box >
              <Typography variant='h6' component="h2">
              {date}{month}
              </Typography>
            <Typography variant='h4' component="h2">
            {city === 'القاهرة' ? 'القاهرة' : city}
              </Typography>
            </Box>
            <Box>
            <Typography variant='h6' component="h2">
            متبقي من الوقت {Name}
              </Typography>
            <Typography variant='h4' component="h2">
            {timer}
              </Typography>
            </Box>

        </Stack>
      <Divider style={{"borderColor":"#85A98F"}}></Divider>
      <CardMain city={city} setTimer={setTimer} setName={setName} setCity={setCity} date={date} setDate={setDate} setMonth={setMonth}  />
    
  
  
  </>
}
