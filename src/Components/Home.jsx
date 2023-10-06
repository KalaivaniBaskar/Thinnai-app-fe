import axios from 'axios';
import { Box, Button, IconButton, Paper } from '@mui/material';
import {BASE_URL} from '../Services/APIServices.js'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastOptions, USER_ROLES } from '../utils.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { allProducts } from '../Redux/Reducers/productsReducer.js';
import { addItem, removeItem } from '../Redux/Reducers/cartReducer.js';
import { useCTX } from '../Context.js';
function Home() {
    const {user} = useCTX();
  const productsAll = useSelector( state => state.products.productsAll ) 
   const navigate = useNavigate();
   const [open, setOpen] = useState(false)
    const [modalMsg, setmodalMsg] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false)} 
    const dispatch = useDispatch();
   
    
    const addItemHandler = (item) => { 
      if( !user.email) {
          toast.error("Login to buy", toastOptions)
      }
      else {
      const itemToAdd = {
          product_ID : item.product_ID,
          product_name : item.title,
          product_price: item.price,
          product_stock: item.stock,
          product_discount: item.discount,
          product_pic : item.prod_pic_URL,
          qty : 1
      }
      dispatch(addItem(itemToAdd))
    }
    }
  
    const removeItemHandler = (item) => {
      if( !user.email) {
        toast.error("Login to buy", toastOptions)
    }
    else {
      const itemToRem = {
        product_ID : item.product_ID,
        product_name : item.title,
        product_price: item.price,
        product_stock: item.stock,
        product_discount: item.discount,
        product_pic : item.prod_pic_URL,
        qty : 1
    }
      dispatch(removeItem(itemToRem))
  }
    }

    const getAllProducts = async() => {
        try {
          setmodalMsg("Fetching items..")
           handleOpen();
          const {data} = await axios.post(`${BASE_URL}/products/all`, {} )
          //console.log(data)
          dispatch(allProducts(data.allProducts))
          handleClose();

        } catch (error) {
          console.log(error, error.message);
          handleClose();
          toast.error(`Error occured`, toastOptions)
         }
        }
    
    useEffect( () => {
      getAllProducts(); 
    // console.log("home")
    }, [])

    return (
      <>
      <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
  
      <div className='page-wrap'>
      <div className='card-wrap'> 
         {
          productsAll.length && 
          productsAll.map(el => 
            <Box className='prod-card' key={el.product_ID} component={Paper}>
            <img src={el.prod_pic_URL} alt={el.title} />
            <p className='prod-title'>{el.title}</p>
            <p> {`${el.category}`}</p>
            <p> {`Qty: ${el.weight}`}</p>
            { el.discount > 0 && <p className='prod-price'> {`Discount: ${el.discount}%`}</p>  }
            <p className='prod-price'> MRP : <span>&#x20B9; {el.price}</span></p>
             
            {/* <Button variant='contained' onClick={() => handlePayment(el)}>BUY NOW</Button> */}
            
             <Box justifyContent={'center'} alignItems={'center'} gap={2} pb={'2rem'}> 
             { el.stock > 0 ?
            <Button variant='contained' key={`add-${el.product_ID}`} color="success" sx={{m:1}} disabled={false} onClick={() => addItemHandler(el)} >Add To Cart</Button>
            :
            <Button variant='contained' disabled >SOLD OUT</Button> 
             }
            <Button variant='contained' key={`remove-${el.product_ID}`} color="error" disabled={false} onClick={() => removeItemHandler(el)} > Remove </Button>
          </Box>
            {
              localStorage.getItem('role') === USER_ROLES.Admin && 
              <Box>
              <IconButton sx={{margin : '0.5rem'}}
               onClick={() => navigate(`/edit-product/${el.product_ID}`)}>
                <EditIcon fontSize='medium'></EditIcon>
              </IconButton>
              <IconButton sx={{margin : '0.5rem'}}
               onClick={() => navigate(`/delete-product/${el.product_ID}`)}>
                <DeleteIcon fontSize='medium' />
              </IconButton>
              </Box>
            }
          </Box>
        
            )
         }
        
      </div>
      </div>

      <ToastContainer />
      </>
    );
  }

  export default Home;
  