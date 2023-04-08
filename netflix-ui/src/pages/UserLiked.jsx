import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getGeneres, getUserLikedMovies } from '../store';
import { fetchMovies } from '../store';
import { FirebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged} from "firebase/auth"
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';
import Card from '../components/Card';

function UserLiked() {

    const [isScrolled,setIsScrolled]=useState(false);
    const navigate=useNavigate();
    const[email,setEmail]=useState(undefined);

  
    window.onscroll=()=>{
      setIsScrolled(window.pageYOffset === 0 ? false: true);
      return ()=>(window.onscroll=null);
    }
    
    const movies=useSelector((state)=>state.netflix.movies);
    const dispatch=useDispatch();
  
    useEffect(()=>{
      if(email){

        dispatch(getUserLikedMovies(email));
        
      }
    },[email]);


  
    onAuthStateChanged(FirebaseAuth,(currentUser)=>{
        if(currentUser) 
        {
          // dispatch(getUserLikedMovies(email));
          setEmail(currentUser.email);
        }
        else navigate("/login");
    });            

    

  return (
   <Container>
    <NavBar isScrolled={isScrolled} />
    <div className='content flex column'>
      <h1>My list</h1>
      <div className='grid flex' >
       {
        movies?.map((movie,index)=>{
            return <Card movieData={movie} index={index} key={movie.id} isliked={true}/>
        })

      }
      {
      (movies===undefined || movies?.length <1) && (<NotAvailable/>)
      }
      </div>
    </div>
   </Container>
  )
}

const Container=styled.div`
.content{
    margin:2.3rem;
    margin-top:8rem;
    gap:3rem;
    h1{
        margin-left:3rem
    }
    .grid{
        flex-wrap:wrap;
        gap:1rem;
    }
}`;

export default UserLiked