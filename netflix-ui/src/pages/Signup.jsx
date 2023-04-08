import React, { useState } from 'react'
import styled from 'styled-components'
import styles from "styled-components"
import BackGroundImage from '../components/BackGroundImage'
import Header from '../components/Header'
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { FirebaseAuth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'


function Signup() {

  const[showPassword,setshowpassword]=useState(false);
  const[formValues,setFormValues]=useState({email:"",password:"",});

  const navigate=useNavigate();

  const handleSignIn=async()=>{

    try{
      const {email,password} = formValues;
      if(password.length<6){
        alert("Minimum password must be at least 6 characters")
      }
      await createUserWithEmailAndPassword(FirebaseAuth,email,password);
      
    }
    catch(err){
      console.log(err)
    }
  }
  
  onAuthStateChanged(FirebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
        <BackGroundImage/>
        <div className="content">
        <Header  login/>
        <div className="body flex column a-center j-center">
            <div className="text flex column">
                <h1> Unlimited Movies, TV shows and more</h1>
                <h4> Watch anywhere.  Cancel anytime.</h4>
                <h6>
                    Ready to watch? Enter your email to create or restart memebership
                </h6>
            </div>
            <div className="form">
                <input type="email" placeholder='Email Address' name="email" value={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value}
                  )} />
                {
                  showPassword && 
                  ( 
                  <input type="password" placeholder='Password' name="password"  value={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value}
                    )} />
                  )
                }
               {!showPassword && <button onClick={()=>setshowpassword(true)} >Get Started</button> }
                
            </div>
            <button onClick={handleSignIn}>Sign up</button>
        </div>
        </div>

    </Container>
  )
}

const Container =styled.div`
      position:relative;
      .content{
        position:absolute;
        top:0;
        left:0;
        background-color:rgba(0,0,0,0.5);
        height:100vh;
        width:100vw;
        display:grid;
        grid-template-rows:15vh 85vh;
        .body{
          gap:1rem;
          .text{
            gap:1rem;
            text-align:center;
            font-size: 2rem;
            h1{
              padding:0 25rem;
            }
          }
          .form{
            display:grid;
            grid-template-columns:${({showPassword})=> showPassword?"1fr 1fr":"2fr 1fr"};
            width:60%;
            input{
              color:black;
              border:none;
              padding:1.5rem;
              font-size:1.2rem;
              border:1px solid black;
              &:focus{
                outline:none;
              }
            }
            button{
              padding:0.5rem 1rem;
              background-color:#e50914;
              border:none;
              cursor:pointer;
              color:white;
              font-weight:bolder;
              font-size:1.05rem;
            }
          }
          button {
            padding:0.5rem 1rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            border-radius:0.2rem;
            font-weight:bolder;
            font-size:1.05rem;
          }

        }
      }
`;
export default Signup