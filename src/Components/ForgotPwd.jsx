import React, { useState } from 'react'
import { Grid, Button, TextField, Paper, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Services/APIServices.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ForgotPwd = () => {
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [modalMsg, setmodalMsg] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false)} 
   
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable : true,
        theme: 'dark'
    }
   
    const handleForgotPwd = async (e) => {
        e.preventDefault();
        handleOpen(); 
        try{
        const response = await axios.post(`${BASE_URL}/auth/user/forgotpwd`, {email : email});
        //console.log(response) 
        if(response.status === 200) {
            handleClose(); 
            toast.success(`Success: ${response?.data?.message}`, toastOptions)
            setTimeout(()=> {
             navigate('/login' ,{ replace: true })
            },3000)
        }
        else if(response.status === 404) {
            handleClose(); 
            toast.error(`Error occured, ${response?.data?.message}`, toastOptions)
        }

        }
        catch(error){
            console.log(error, error.message);
            handleClose(); 
            toast.error(`Error occured  ${error?.response?.data?.message}`, toastOptions)
           }
    }

  return (
    <>
  <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
    <Typography variant='h6' sx={{color: 'white'}} fontFamily={'serif'} 
    m={1}>Forgot Password: </Typography>
    <Grid container justifyContent={'center'} alignItems={'center'} 
    padding={'2rem'}>
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4} 
        component={Paper}>
        <form onSubmit={handleForgotPwd} style={{marginTop: '1rem', padding: '1rem'}} >
             <TextField label = "email" variant="outlined" fullWidth 
                sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                name="email"
                required></TextField>
                              
                 <Button type='submit' variant='contained' 
                 color='primary' 
                 size='medium' sx={{m: 1 }} >
                    Send Reset link
                 </Button>
          </form>
         
        </Grid>
    </Grid>
    <ToastContainer />
    </>
  )
}

export default ForgotPwd