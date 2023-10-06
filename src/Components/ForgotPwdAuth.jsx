import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../Services/APIServices.js';
import ModalInfo from './ModalInfo';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ForgotPwdAuth = () => {  
    const [searchparam] = useSearchParams();
    const [msg, setMsg] = useState("");
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
    
    const verifyUser = async(id,token) => {
        //console.log(id,token);
        //console.log("Verifying authorization");
        handleOpen(); 
        try{
         const response = await axios.post(`${BASE_URL}/auth/user/forgotpwd/authorize/${id}/${token}`);
         //console.log(response);
         handleClose();
         if(response.status === 200){
          // console.log(response, response.data);
            let resetID = response.data.id;
            let token = response.data.token;
            navigate(`/reset-pwd/${resetID}/${token}`,{ replace: true });
         }
        }
        catch(err){
            console.log("error authorizing", err);
            handleClose();
           // console.log(err.response.data) 
            setmodalMsg("Password Reset link invalid")
            setMsg("Password Reset link invalid")
            toast.error("Password Reset link is invalid", toastOptions)
        }
        
    }   
    useEffect(()=> {
       const id = searchparam.get("id")
      const token  = searchparam.get("token") 
      if(id && token) {
        verifyUser(id,token);
      }
       else {
        toast.error("Password Reset link is invalid", toastOptions)

       }
    },[searchparam])

    return(
        <>
        <ModalInfo open={open} handleClose={handleClose} modalMsg={modalMsg} />
        <div className="text-white mx-auto my-5">
        <h6>Verifying user authorization. Please wait .. </h6> 
        {msg && <h6 className="text-danger">{msg}</h6>}
        </div>
        <ToastContainer />
        </>

    )
}
export default ForgotPwdAuth;