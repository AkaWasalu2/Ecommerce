import React,{useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";

 
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
        padding:4%;

    }
    .row1 .row2 .row3{
        width:100%;
        height:100%
        backgorund:pink;
        margin-bottom:20%;
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
        margin-bottom:10%;
    }
    span{
        color:#fff;
        font-size:1.6rem;
        Link{
            color:#fff;
        }
    }
    
    `;

const Register = ()=>{
    const [inputValue,setValue] = useState({name:"",email:"",password:""});
    const navigate = useNavigate();
    const {name,email,password} = inputValue;

    const handleChange = (e) =>{
        const {name,value} = e.target;
        // console.log("handleChange e.target-> ",name," - ",value);
        setValue({
            ...inputValue,
            [name]:value
        })
    }

    const handleSuccess = (msg)=>{
        toast.success(msg,{
            position:toast.POSITION.BOTTOM_RIGHT,
        });
    }
    const handleError = (msg)=>{
        toast.error(msg,{
            position:toast.POSITION.BOTTOM_LEFT,
        })
    }

    const handleClick = async (e)=>{
        e.preventDefault();
        try{
            const resp = await axios.post("http://localhost:3001/signup",{
                    name:inputValue.name,
                    email:inputValue.email,
                    password:inputValue.password,
            });
            const {message,success} = resp;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/');
                },1000);
            }else{
                handleError(message)
            }
            setValue({
                ...inputValue,
                email:"",name:"",password:""
            })
        }catch(e){
            console.warn(e)
        }
    }

    return(
        <Wrapper>
        <div className="container">
         <form onSubmit={handleClick}>
         <div className="row1">
             <div className="col1"><p>Name:</p></div>
             <div className="col2"><input type="text" name="name" value={name} onChange={handleChange} /></div>
         </div>
         <div className="row2">
             <div className="col1"><p>Email:</p></div>
             <div className="col2"><input type="email" name="email" value={email} onChange={handleChange}/></div>
         </div>
         <div className="row3">
             <div className="col1"><p>Password:</p></div>
             <div className="col2"><input type="password" name="password" value={password} onChange={handleChange} /></div>
         </div>
         <div className="submit"><button type="Submit">Register</button></div>
         <span>Already have an account ? <Link to={"/login"}>Login</Link></span>
         </form>
         </div>
         <ToastContainer/>
        </Wrapper>
    );
};

export default Register;