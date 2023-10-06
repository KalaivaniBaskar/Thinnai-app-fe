import React, { useState, useEffect } from 'react'
import { Grid, Button, TextField, Paper, Typography } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Services/APIServices.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions, USER_ROLES } from '../utils.js';
const AddProduct = () => {

    const [product, setProduct] = useState({title: "", category: "", 
    price: 0, stock: 0, weight: "", discount: 0, prod_pic_URL: ""
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [modalMsg, setmodalMsg] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false)} 
   
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setmodalMsg("Adding Product..")
        handleOpen(); 
        //console.log(product)
        if( product.price <= 0 || product.stock <= 0 ){
            toast.error(`Value must be > 0`, toastOptions)
            handleClose(); 
        }
        else {
        try{
            const token = localStorage.getItem('tokenAuth')
            const config = { headers : {"x-auth-token" : token}}
        const response = await axios.post(`${BASE_URL}/products/add-product`, product, config);
        //console.log(response) 
        if(response.status === 200) {
            handleClose(); 
            toast.success(`Success: ${response?.data?.message}`, toastOptions)
            setProduct({title: "", category: "", 
            price: 0, stock: 0, weight: 0, discount: 0, prod_pic_URL: ""
            })
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
    }
    useEffect( () => {
        const token = localStorage.getItem('tokenAuth')
        const role = localStorage.getItem('role')
            if(!token){
                navigate('/login')
            }
        if(role !== USER_ROLES.Admin ) {
            toast.error(`Unauthorized`, toastOptions)
            setTimeout(()=> {
             navigate('/' ,{ replace: true })
            },3000)
        }

    }, [])
  return (
    
    <>
    <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
      <Typography variant='h6' 
      sx={{color: 'white', textTransform: 'uppercase'}} 
      fontFamily={'serif'} 
      m={1}>   Add Product  </Typography>

      <Grid container 
      justifyContent={'center'} 
      alignItems={'center'} 
      padding={'2rem'}>

          <Grid item xs={12} sm={10} md={6} lg={5} xl={4} 
          component={Paper} p={1}>
         
          <form onSubmit={handleAddProduct}
           style={{marginTop: '1rem', padding: '1rem'}} >
              
               <TextField label = "Title" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter title'
                  value={product.title}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="text" 
                  name="title"
                  required></TextField>

               <TextField label = "category" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter category'
                  value={product.category}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="text" 
                  name="category"
                  required></TextField>

               <TextField label = "Product_Pic_URL" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter prod_pic_URL'
                  value={product.prod_pic_URL}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="text" 
                  name="prod_pic_URL"
                  required></TextField>

               <TextField label = "Price" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter price'
                  value={product.price}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="number" 
                  name="price"
                  required></TextField>

               <TextField label = "Stock" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter stock quantity'
                  value={product.stock}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="number" 
                  name="stock"
                  required></TextField>
               <TextField label = "weight" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter weight'
                  value={product.weight}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="text" 
                  name="weight"
                  required></TextField>

               <TextField label = "discount" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter discount percent'
                  value={product.discount}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="number" 
                  name="discount"
                  required></TextField>
                                
                   <Button type='submit' variant='contained' 
                   color='primary' 
                   size='medium' sx={{m: 1 }} >
                      Add Product
                   </Button>
            </form>
           
          </Grid>
      </Grid>
      <ToastContainer />
      </>
  )
}

export default AddProduct