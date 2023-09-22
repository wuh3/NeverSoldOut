import { useLocation } from "react-router-dom"
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from "../Header";

const SearchResult = () => {
    const location = useLocation()
    const nav = useNavigate();
    const [sresults,setSresults] = useState([])

    useEffect(()=> {
        axios.get(`http://35.208.73.9:8080/query?query=${location.state.query}`).then((response)=>{
            setSresults(response.data);
        })
        console.log(sresults)
    },[]); 

    return (
        <>
        <Header />
        <Button style={{marginTop: 10, marginLeft: 10}} variant="outlined" onClick={() => nav(-1)}><ArrowBackIcon></ArrowBackIcon></Button>
        <Container sx={{
            width: "100%",
            height: 60,
            display: "flex",
            flexWrap: "wrap", 
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28
        }} >
            <h1>Results for {location.state.query}</h1>
        </Container>
        <Container sx={{
            height: 650,
            width: 1000,
            marginTop: 10,
            display: "flex",
            justify: "center",
            alignItems: "center"
        }}>

        <TableContainer sx={{
            height: 650,
            width: 1000,
            alignSelf: "center"
        }} component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Market</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {sresults.map((s) => (
                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center">{s.productName}</TableCell>
                <TableCell align="center">{s.marketName}</TableCell>
                <TableCell align="center">{s.location}</TableCell>
                <TableCell align="center">{s.price}</TableCell>
                <TableCell align="center">{s.status ? "In stock" : "Out of stock" }</TableCell>
                <TableCell align="center">{s.statusTimeStamp}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Container>
        </>
    )
}

export default SearchResult