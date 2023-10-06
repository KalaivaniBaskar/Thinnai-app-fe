import axios from 'axios';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import {BASE_URL} from '../Services/APIServices.js'
import { Fragment, useEffect, useState } from 'react';
import { toastOptions } from '../utils.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import orderlogo from '../assets/logo2.png';
const MyOrders = () => {
    const [allOrders, setAllOrders] = useState([]); 
     const [open, setOpen] = useState(false)
     const [modalMsg, setmodalMsg] = useState("")
     const handleOpen = () => setOpen(true);
     const handleClose = () => { setOpen(false)} 
     
     const getAllOrders = async() => {
        try {
          setmodalMsg("Getting your orders..")
           handleOpen();
          const token = localStorage.getItem('tokenAuth')
          const email = localStorage.getItem('email')
          const config = { headers : {"x-auth-token" : token}}
          const {data} = await axios.post(`${BASE_URL}/api/payment/get-orders`,
           {email : email}, config)
          //console.log(data)
          setAllOrders([...data.allOrders])
          handleClose();

        } catch (error) {
          console.log(error, error.message);
          handleClose();
          toast.error(`Error occured`, toastOptions)
         }
      }
    
    useEffect( () => {
      getAllOrders();
    }, [])

  return (
    <>
    <ModalInfo open={open} modalMsg={modalMsg} handleClose={handleClose}/>

    <Grid container justifyContent={'center'} alignItems={'center'}
     my={'1rem'} p={2} gap={2} sx={{overflow: 'auto', width: '100dvw',
     height: '90dvh'}} >
         { 
          allOrders.length && 
          allOrders.map(el => 
            <Grid item xs={12} sm={10} md={5} lg={5} xl={4} key={`wrap-${el.order_ID}`} component={Paper} 
            justifyContent={'start'} className='order-card'>
         
            <div className='logo-wrap'> 
              <Avatar alt="order" src={orderlogo} 
              sx={{ mr: 1, width: 100, height: 100 }} />
              </div>
            
            <div className='grid-container-od' key={'heading'}>
                  
                    <Typography  sx={{textDecoration: 'underline'}}  variant='body2'fontWeight={550} fontFamily={'serif'} >PRODUCT ID</Typography>
                    <Typography  sx={{textDecoration: 'underline'}} variant='body2'fontWeight={550} fontFamily={'serif'} >NAME</Typography>
                    <Typography  sx={{textDecoration: 'underline'}} variant='body2'fontWeight={550} fontFamily={'serif'} >QTY</Typography>
                    <Typography  sx={{textDecoration: 'underline'}} variant='body2'fontWeight={550} fontFamily={'serif'} >PRICE</Typography>
                   
                { el.order_items.map( (p,idx) => 
                    <Fragment key={idx}>
                    <Typography variant='body2' key={p.product_ID} >{p.product_ID}</Typography>
                    <Typography variant='body2' key={p.product_name}>{p.product_name}</Typography>
                    <Typography variant='body2' key={p.qty}>{p.qty}</Typography>
                    {
                        p.product_discount === 0 ? 
                        <Typography variant='body2' key={`price-${idx}`} >{p.product_price * p.qty }</Typography>
                        : 
                        <Typography variant='body2' key={`discP-${idx}`} >{(p.product_price - (p.product_price * p.product_discount /100))* p.qty}</Typography>
                    }
                    </Fragment> 
                   )}
                </div>
                <p className='prod-title'> {`ORDER ID : ${el.order_ID}`}</p>
             <p>Phone: {el.phone}</p> 
             <p>Address: {el.address }</p> 
             <p className='prod-price'> Amount : <span>&#x20B9; {el.amount}</span></p>
             <p>Payment ID: {el.payment_ID}</p>
             <p> {el.order_Status}</p>
             <p>Placed on: {el.order_created.substring(0,10) }</p> 
             <p>ETA Date: {el.order_ETA }</p> 
          </Grid>
        
            )
         }
        
     </Grid>

      <ToastContainer />
      </>
  )
}

export default MyOrders