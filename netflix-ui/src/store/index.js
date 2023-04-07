import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import {TMBD_BASE_URL,API_KEY} from "../utils/constants"
import axios from "axios"

const initialState={
    movies:[],
    genresLoaded:false,
    genres:[],
};


export const getGeneres= createAsyncThunk("netflix/genres",async()=>{
    const {data:{genres}} =await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
});

const createArrayfromRawData=(array,moviesarray,genres)=>{

    array.forEach((movie)=>{
        const movieGenres=[];
        movie.genre_ids.forEach((genre)=>{
            const name=genres.find(({id})=>id===genre);
            if(name) movieGenres.push(name.name);
        });
        if(movie.backdrop_path){
            moviesarray.push({
                id:movie.id,
                name:movie?.original_name?movie.original_name:movie.original_title,
                image:movie.backdrop_path,
                genres:movieGenres.slice(0,3),
            });
        }
    })
}
 
const getRawData= async (api,genres,paging)=>{
    const moviesArray=[];
    for(let i=1;moviesArray.length<60 && i<10;i++){
       const {data:{results}}= await axios.get(`${api}${paging ? `&page=${i}` :""}`);
    createArrayfromRawData(results,moviesArray,genres);
}
return moviesArray;
};

export const fetchMovies= createAsyncThunk("netflix/trending",async({type},thunkApi)=>{
  const{
    netflix:{genres}
}=thunkApi.getState();
 
return getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true);
});


export const fetchDatabygenre= createAsyncThunk("netflix/moviesbygenres",async({genre,type},thunkApi)=>{
    const{
      netflix:{genres}
  }=thunkApi.getState();
    
  return getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres)
});

export const getUserLikedMovies =createAsyncThunk("netflix/getliked",async (email)=>{
    const {data:{movies}}=await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
})
export const removeFromLikedMovies =createAsyncThunk("netflix/deleteLiked",async ({email,moviedId})=>{
    const {data:{movies}}=await axios.put(`http://localhost:5000/api/user/delete`,{
        email,
        moviedId,
    });
    return movies;
})

const NetflixSlice =createSlice({
    name:"Netflix",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGeneres.fulfilled,(state,action)=>{
            state.genres=action.payload;
            state.genresLoaded=true;
        });
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
        });
        builder.addCase(fetchDatabygenre.fulfilled,(state,action)=>{
            state.movies=action.payload;
        });
        builder.addCase(getUserLikedMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
        });
        builder.addCase(removeFromLikedMovies.fulfilled,(state,action)=>{
            state.movies=action.payload;
        });
    },
});

export const store = configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    },
})