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
    <Stack spacing={{ xs: 1, sm: 2 }} direction={{ xs: "column", sm: "row" }} useFlexGap sx={{justifyContent: "space-around"}}
            style={{color:"white"}}>
            <Box >
              <Typography  >
              {date}{month}
              </Typography>
            <Typography variant='h3' component="h2">
            {city === 'القاهرة' ? 'القاهرة' : city}
              </Typography>
            </Box>
            <Box>
            <Typography  >
            متبقي من الوقت {Name}
              </Typography>
            <Typography  >
            {timer}
              </Typography>
            </Box>

        </Stack>
      <Divider style={{"borderColor":"#ffff"}}></Divider>
      <CardMain city={city} setTimer={setTimer} setName={setName} setCity={setCity} date={date} setDate={setDate} setMonth={setMonth}  />
    
  
  
  </>
}
