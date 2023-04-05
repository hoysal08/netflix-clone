import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import {TMBD_BASE_URL,API_KEY} from "../utils/constants"
import axios from "axios"

const initialState={
    movies:[],
    genresLoaded:false,
    genres:[],
};


export const getGeneres= createAsyncThunk("netflix/genres",async()=>{
    const {data} =await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    console.log(data);
});

const NetflixSlice =createSlice({
    name:"Netflix",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGeneres.fulfilled,(state,action)=>{
            state.genres=action.payload;
            state.genresLoaded=true;
        })
    },
});

export const store = configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    },
})