import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import photo1 from '../../img/10760550.png';
import photo2 from '../../img/3a6d7e80e3419f232fc1b436baae98f8.jpg';
import photo3 from '../../img/sun-icon-clipart-md.png';
import photo4 from '../../img/cloudy-weather-color-icon-clouds-heavy-clouds-overcast-weather-forecast-isolated-illustration-vector.jpg';
import photo6 from '../../img/images (2).png';
import photo7 from '../../img/images.png';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import moment from 'moment';
import 'moment/dist/locale/ar';
import { useRef } from 'react';




export default function CardMain({ city, setCity, setTimer,setName }) {
  const intervalRef = useRef(null);

  const [timing, setTiming] = useState({});
  const [sunrise, setSunrise] = useState([
    "القاهرة", "الإسكندرية", "المنصورة", "الجيزة", "أسوان",
    "الأقصر", "طنطا", "شرم الشيخ", "السويس", "مرسى مطروح",
    "دمياط", "المنيا", "سوهاج", "أسيوط", "الإسماعيلية", "الفيوم", "قنا", "الدقهلية"
  ]);
  
  async function getDate(city) {
    try {
      let response = await axios.get(`https://api.aladhan.com/v1/timingsByCity/30-12-2024?country=EG&city=${city}`);
      setTiming(response.data.data.timings);      
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (event) => {
    setCity(event.target.value);
  };


  function setTimeUP() {
    moment.locale("ar"); 

    let momentNow = moment()
    
    const nextPrayer = prayerTimes
      .map(prayer => ({
        label: prayer.label,
        time: moment(prayer.time, 'HH:mm'),
        diffInSeconds: moment(prayer.time, 'HH:mm').diff(momentNow, 'seconds')
      }))
      .filter(prayer => prayer.diffInSeconds > 0) 
      .sort((a, b) => a.diffInSeconds - b.diffInSeconds)[0]; 
  
    if (nextPrayer) {
      const diffInSeconds = nextPrayer.diffInSeconds;
  
      const hoursLeft = Math.floor(diffInSeconds / 3600); 
      const minutesLeft = Math.floor((diffInSeconds % 3600) / 60); 
      const secondsLeft = diffInSeconds % 60; 
  
      setName(`${nextPrayer.label}`)
      setTimer(`s ${secondsLeft}  : ${minutesLeft} m :h ${hoursLeft} `)
    } 
  }
  


  useEffect(() => {
    getDate(city);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimeUP();
    }, 1000);
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [city]);

  const prayerTimes = [
    { label: 'الفجر', time: timing.Fajr, image: photo4 },
    { label: 'الشروق', time: timing.Sunrise, image: photo7 },
    { label: 'الضهر', time: timing.Dhuhr, image: photo3 },
    { label: 'العصر', time: timing.Asr, image: photo2 },
    { label: 'المغرب', time: timing.Maghrib, image: photo1 },
    { label: 'العشاء', time: timing.Isha, image: photo6 },
  ];

 


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    rtl: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
    <>
      <Stack direction="row" useFlexGap padding={2}>
        <Box sx={{ minWidth: 720 }}>
          <FormControl sx={{ width: '20%' }}>
            <InputLabel id="demo-simple-select-label">
              <Typography variant='h6' sx={{ color: "white" }}>اختار المدينه</Typography>
            </InputLabel>
            <Select
              sx={{
                color: 'white', borderColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' }
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="city"
              onChange={handleChange}>
              {sunrise.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
  
      <Stack>
        {Object.keys(timing).length > 0 ? (
          <Slider {...settings}>
            {prayerTimes.map((prayer, index) => (
              <div key={index} style={{ padding: '0 16px', display: 'flex' }}>
                <Card sx={{ maxWidth: 545, width: '100%' }}>
                  <CardMedia sx={{ height: 340, objectFit: 'contain' }} image={prayer.image} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "#3C3633" ,textAlign:"right"}}>
                      {prayer.label}
                    </Typography>
                    <Typography  sx={{ color: 'text.secondary',textAlign:"right" }}>
                      {prayer.time}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography variant="h5" sx={{ color: 'white' }}>جارٍ التحميل...</Typography>
        )}
      </Stack>
    </>
  );
}  