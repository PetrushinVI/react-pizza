import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {sortBy, order, search, category, currentPage} = params;
    const {data} = await axios.get<Pizza[]>(`https://66dcb6ac47d749b72acc4e61.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}&search=${search}`);

    return data;
},
);