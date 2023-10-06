import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Typography, TextField, Grid, Button, Paper } from '@mui/material';
import {BASE_URL} from '../Services/APIServices.js'
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions, USER_ROLES } from '../utils.js';

const EditProduct = () => { 
    const {product_ID} = useParams();
    const [product, setProduct] = useState({ title: "", category: "", 
    price: 0, stock: 0, weight: "", discount: 0, prod_pic_URL: "",
    prod_pic_URL_ID: ""}); 
    const [open, setOpen] = useState(false)
     const [modalMsg, setmodalMsg] = useState("")
     const handleOpen = () => setOpen(true);
     const handleClose = () => { setOpen(false)} 
     const navigate = useNavigate();
    
     const handleEditProduct = async(e) => {
        e.preventDefault();
        setmodalMsg("Updating Product..")
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
        const response = await axios.post(`${BASE_URL}/products/edit-product`,      product, config);
        //console.log(response) 
        if(response.status === 200) {
            handleClose(); 
            toast.success(`Success: ${response?.data?.message}`, toastOptions)
            setProduct({ title: "", category: "", 
            price: 0, stock: 0, weight: "", discount: 0, prod_pic_URL: "",
            prod_pic_URL_ID: ""})
            setTimeout(()=> {
                navigate('/' ,{ replace: true })
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
     }
    const getProduct = async(product_ID) => {
            try {
              setmodalMsg("Fetching details")
               handleOpen();
              const {data} = await axios.post(`${BASE_URL}/products/all`, 
              {product_ID:product_ID} )
              //console.log(data)
              setProduct(data.allProducts[0])
              handleClose();
            } catch (error) {
              console.log(error, error.message);
              handleClose();
              toast.error(`Error occured`, toastOptions)
             }
      }

    useEffect( () => {
        const token = localStorage.getItem('tokenAuth')
        const role = localStorage.getItem('role')
        const email = localStorage.getItem('email')
            if(!token){
                navigate('/login')
            }
           if(role !== USER_ROLES.Admin ) {
            toast.error(`Unauthorized`, toastOptions)
            setTimeout(()=> {
             navigate('/' ,{ replace: true })
            },3000)
           }
            else if(product_ID){
                getProduct(product_ID);
            }
       }, [product_ID])
  return (
    <>
      <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
      <Typography variant='h6' 
      sx={{color: 'white', textTransform: 'uppercase'}} 
      fontFamily={'serif'} 
      m={1}>   Edit Product  </Typography>

      <Grid container 
      justifyContent={'center'} 
      alignItems={'center'} 
      padding={'2rem'}>

          <Grid item xs={12} sm={10} md={6} lg={5} xl={4} 
          component={Paper} p={1}>
         
          <form onSubmit={handleEditProduct}
           style={{marginTop: '1rem', padding: '1rem'}} >
              
               <TextField  variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  value={product.product_ID}
                  type="text" 
                  name="product_ID"
                  readOnly></TextField>

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
               <TextField label = "Product_Pic_URL_ID" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter prod_pic_URL_ID'
                  value={product.prod_pic_URL_ID}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="text" 
                  name="prod_pic_URL_ID"
                  required></TextField>

               <TextField label = "weight" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter weight'
                  value={product.weight}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="text" 
                  name="weight"
                  required></TextField>

               <TextField label = "Price" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter price'
                  value={product.price}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="number" 
                  name="price"
                  required></TextField>

               <TextField label = "discount" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter discount'
                  value={product.discount}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="number" 
                  name="discount"
                  required></TextField>

               <TextField label = "Stock" variant="outlined" fullWidth 
                  sx={{ m: 1, bgcolor: 'white' }} 
                  placeholder='Enter stock quantity'
                  value={product.stock}
                  onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                  type="number" 
                  name="stock"
                  required></TextField>
                                
                   <Button type='submit' variant='contained' 
                   color='primary' 
                   size='medium' sx={{m: 1 }} >
                      Update 
                   </Button>
            </form>
           
          </Grid>
      </Grid>
    <ToastContainer />
      </>
  )
}

export default EditProduct