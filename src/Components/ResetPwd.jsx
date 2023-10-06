import React, { useState } from 'react'
import { Grid, Button, TextField, Typography, Paper } from '@mui/material'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup"
import { useFormik } from 'formik' 
import { BASE_URL } from '../Services/APIServices.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const resetSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required')
        .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!+@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`),
    password2: yup.string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Password does not match")
    }); 

const ResetPwd = () => {
    const navigate = useNavigate(); 
    const {id , token} = useParams();
    
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
    const {values, 
        handleChange, 
        handleSubmit,
        handleBlur,
        errors,
        touched } = useFormik({
        initialValues: {
            password: "",
            password2: ""
        },
        validationSchema: resetSchema,
        onSubmit: (data) => {
            handleResetPwd(data)
        }
    
    }) 

    const handleResetPwd = async (data) => {
        handleOpen(); 
        const {password} = data;
        try{
        const response = await axios.post(`${BASE_URL}/auth/user/reset-pwd/${id}/${token}`, {password });
        //console.log(response) 
        if(response.status === 200) {
            handleClose();
            toast.success(`Password Reset ${response?.data?.message}`, toastOptions)

           setTimeout(()=> {
            navigate('/login' ,{ replace: true })
           },3000)
           
        }
        else if(response.status === 400) {
            handleClose();
            toast.error(`Error occured, ${response?.data?.message}`, toastOptions)

        }

        }
        catch(error){
            console.log(error, error.message);
            handleClose();
            toast.error(`Error occured`, toastOptions)
           }
        }

    
  return (
    <>
    <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
    <Typography variant='h6' sx={{color: 'white'}} fontFamily={'serif'} m={1}>
        Reset Password: </Typography>
    <Grid container justifyContent={'center'} alignItems={'center'} 
    padding={'2rem'}>
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4} component={Paper} p={2}>
        <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
             <TextField label = "New Password" variant="outlined" fullWidth 
                placeholder='Enter Password' 
                sx={{paddingBlock: '0.5rem'}}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password" 
                name="password"
                required></TextField>
                {touched.password && errors.password ? 
                <div className="error-div">
                {errors.password} 
                </div>  : ""}

             <TextField label = "Confirm Password" variant="outlined" fullWidth 
                placeholder='Confirm Password'
                sx={{paddingBlock: '0.5rem'}}
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password" 
                name="password2"
                required></TextField>
                
                  {touched.password2 && errors.password2 ? 
                <div className="error-div">
                {errors.password2} 
                </div>  : ""}            
                
                 <Button type='submit' variant='contained' 
                 color='success' 
                 size='medium' sx={{m: 1 }} >
                    Confirm
                 </Button>
          </form>
         
        </Grid>
    </Grid>
     <ToastContainer />
    </>
  )
}

export default ResetPwd;