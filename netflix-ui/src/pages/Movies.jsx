import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getGeneres } from '../store';
import { fetchMovies } from '../store';
import { FirebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged} from "firebase/auth"
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';


function Movies() {

  const [isScrolled,setIsScrolled]=useState(false);
  const navigate=useNavigate();

  window.onscroll=()=>{
    setIsScrolled(window.pageYOffset === 0 ? false: true);
    return ()=>(window.onscroll=null);
  }
  
  const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
  const genres=useSelector((state)=>state.netflix.genres);
  const movies=useSelector((state)=>state.netflix.movies);
  const dispatch=useDispatch();

  useEffect(()=>{
     dispatch(getGeneres())
  },[]);

  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type:"movie"}))
  },[genresLoaded]);

  onAuthStateChanged(FirebaseAuth,(currentUser)=>{
    // if(currentUser) navigate("/");
  });


  return (
    <Container>
       <div className="navbar">
        <NavBar isScrolled={isScrolled}/>
       </div>
       <div className="data">
       <SelectGenre genres={genres} type="movie"/>
        {
            movies.length?<Slider movies={movies}/>: <NotAvailable/>
        }
       </div>
    </Container>
  )
}

const Container = styled.div`
.data{
    margin-top:8rem;
    .not-avail{
        text-align:center;
        color:white;
        margin-top: 4rem;


    }
}`;

export default Movies