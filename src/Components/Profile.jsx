import React from 'react'
import ProfilePic from './ProfilePic'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useCTX } from '../Context';
import { Grid, Paper, Box, Avatar } from '@mui/material';
const Profile = () => {
  const navigate = useNavigate();
  const {user, setUser} = useCTX();

  useEffect( () => {
    const token = localStorage.getItem('tokenAuth')
    const email = localStorage.getItem('email')
        if(!token || !email){
            navigate('/login')
        }
}, [])
  return (
    <Grid container justifyContent={'center'} alignItems={'center'} 
    padding={'2rem'}>
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4} component={Paper} p={2}>
        <Box component={Paper} p={2} 
        sx={{ display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
            <Avatar sx={{ width: 100, height: 100 , bgcolor: '#0E0E0E' }}  
                   alt={user?.username} src= {user?.pic_URL ? user.pic_URL :  "na"}
                    />
            <h3>{user.username}</h3>
            <p className='.word-p'>{user.email}</p>
        </Box>
      <ProfilePic />
      </Grid>
     </Grid>
  )
}

export default Profile