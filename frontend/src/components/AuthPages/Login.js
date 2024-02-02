import React,{useState} from "react";
import styled from "styled-components";
import {toast,ToastContainer} from "react-toastify"
import axios from "axios";
import {useNavigate } from "react-router-dom";

const Wrapper = styled.section`
    .container{
        display:grid;
        grid-template-columns: repeat(1,1fr);
        grid-auto-rows: minmax(100px, auto);
        gap:0.3 rem;
        width:40rem;
        height:60rem;
        margin: 5rem auto;
        background:#8490ff;
        border-radius:1rem;
        padding:5%;

    }
    .row1 .row2 .row3{
        width:100%;
        height:100%
        backgorund:pink;

    }

    div.col1 > p{
        font-size: 2.4rem;
        color: #fff;
    }
    div.col2 > input{
        border-radius:10px;
    }
    .row1{
        .col1{
            grid-row:1;
            grid-column:1;
        }
        .col2{
            grid-row:1;
            grid-column:2;
        }
    }
    .row2{
        .col1{
            grid-row:2;
            grid-column:1;
        }
        .col2{
            grid-row:2;
            grid-column:2;
        }
    }
    }
    .row3{
        .col1{
            grid-row:3;
            grid-column:1;
        }
        .col2{
            grid-row:3;
            grid-column:2;
        }
    }
    }
    .submit{
        align-content:center;
    }
    `;

export default function Login(){
    const [inputValue,setValue] = useState({email:"",password:""});
    const {email,password} = inputValue;
    const navigate = useNavigate();

    const handleError = (err) =>{
        toast.error(err, {
        position: toast.POSITION.BOTTOM_LEFT,
        });
    }
    const handleSuccess = (msg) =>
    {
    toast.success(msg, {
        position: toast.POSITION.BOTTOM_LEFT,
    });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const resp = await axios.post('http://localhost:3001/login',{
                email:inputValue.email,
                password:inputValue.password,
            });
            const {message,success} = resp.data;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/products");
                  }, 5000);
            }else{
                handleError(message);
            }
        }catch(e){
            console.log(e);
        }
        setValue({
            email:"",
            password:"",
        })
    }
    
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setValue({
            ...inputValue,
            [name]:value,
        })
    }

    return(
        <Wrapper>
        <form onSubmit={handleSubmit}>
        <div className="container">
         <div className="row2">
             <div className="col1"><p>Email:</p></div>
             <div className="col2"><input type={"email"} name={"email"} value={email} onChange={handleChange}/></div>
         </div>
         <div className="row3">
             <div className="col1"><p>Password:</p></div>
             <div className="col2"><input type={"password"} name={"password"} value={password} onChange={handleChange} /></div>
         </div>
         <div className="submit"><button type="Submit">Login</button></div>
         </div>
        </form>
        <ToastContainer/>
        </Wrapper>
    );
};