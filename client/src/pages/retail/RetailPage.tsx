import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RetailModel, LocationState, MarketModel } from '../../common/Types';
import { Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header';

const getMarketMapping = (markets: MarketModel[]): {[index: string]: string} => {
    let mapping: {[index: string]: string} = {};
  
    for (const element of markets) {
      mapping[element.marketId] = element.name;
    }
    
    return mapping;
}

const RetailPage = () => {

    const [mapping, setMapping] = useState<{[index: string]: string}>({});

    const nav = useNavigate();

    const getMarketData = async () => {
        try {
            await axios.get<MarketModel[]>("http://35.208.73.9:8080/markets").then((res) => {
              setMapping(getMarketMapping(res.data));
            });
                
        } catch (error: unknown) {
          const err = error as AxiosError;
          console.log(err.response?.data);
        }
    }

    useEffect(() => {
        getMarketData();
    }, []);

    const state = useLocation().state as LocationState;

    const [retails, setRetails] = useState<[] | RetailModel[]>([]);

    const getRetailByMarketID = async () => {
        try {
            await axios.get<RetailModel[]>(`http://35.208.73.9:8080/retails/marketId?marketId=${state.marketId}`).then((res) => {
                // console.log(res.data);
                setRetails(res.data);
            });
                
            } catch (error: unknown) {
                const err = error as AxiosError;
                console.log(err.response?.data);
        }
    }

    const getRetailByProductID = async () => {
        try {
            await axios.get<RetailModel[]>(`http://35.208.73.9:8080/retails/productId?productId=${state.productId}`).then((res) => {
                setRetails(res.data);
            });
                
            } catch (error: unknown) {
                const err = error as AxiosError;
                console.log(err.response?.data);
        }
    }

    const onClickBtn = (productName: string, marketName: string) => {
        console.log(marketName)
        nav("/status", {
            state: {
                productName: productName,
                marketName: marketName,
                isAdmin: false
            }
        });
    };

    useEffect(() => {
        if (state.isFromProduct) {
            getRetailByProductID();
        } else {
            getRetailByMarketID();
        }
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
                <h1>Retail List</h1>
            </Container>
            <Container sx={{
                height: 650,
                width: 850,
                marginTop: 10,
                display: "flex",
                justify: "center",
                alignItems: "center"
            }}>

            <TableContainer sx={{
                height: 650,
                width: 850,
                alignSelf: "center"
            }} component={Paper}>
            <Table sx={{ minWidth: 850 }} aria-label="simple table">
                <TableHead>
                {state.isFromProduct ?
                    <TableRow>
                        <TableCell align="center">Market</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                    :
                    <TableRow>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                }
                </TableHead>
                <TableBody>
                {state.isFromProduct ? retails.map((retail: RetailModel) => (
                    <TableRow
                    key={retail.retailId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{mapping[retail.marketId]}</TableCell>
                    <TableCell align="center">{retail.price}</TableCell>
                    <TableCell align="center"><Button onClick={() => onClickBtn(retail.productName, mapping[retail.marketId])} >Go to Status</Button></TableCell>
                    </TableRow>
                )):
                retails.map((retail: RetailModel) => (
                    <TableRow
                    key={retail.retailId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{retail.productName}</TableCell>
                    <TableCell align="center">{retail.price}</TableCell>
                    <TableCell align="center"><Button onClick={() => onClickBtn(retail.productName, mapping[retail.marketId])} >Go to Status</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Container>
        </>
    )
}

export { RetailPage };