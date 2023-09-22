import { Button } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextField from "@mui/icons-material/Search";

const AdvancedQuery = () => {
    const [d, setD] = useState([])
    const [productName, setProductName] = useState('')

    const onClickBtn1 = async (s) => {
        try {
            await axios.get("http://35.208.73.9:8080/complex1?query=s").then((res) => {
                setD(JSON.stringify(res.data))
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onClickBtn2 = async () => {
        try {
            await axios.get("http://35.208.73.9:8080/complex2").then((res) => {
                setD(JSON.stringify(res.data))
                console.log(res.data)
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onClickBtn3 = async () => {
        try {
            await axios.get("http://35.208.73.9:8080/complex3").then((res) => {
                setD(JSON.stringify(res.data))
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <input value={productName} placeholder="Enter product name.." onChange={(e)=>setProductName(e.target.value)}></input>
        <Button onClick={() => onClickBtn1({productName})} >Advanced Query 1</Button>
        <Button onClick={() => onClickBtn2()} >Advanced Query 2</Button>
        <Button onClick={() => onClickBtn3()} >Advanced Query 3</Button>
        <p>{d}</p>
        </>
    );
};

export { AdvancedQuery };