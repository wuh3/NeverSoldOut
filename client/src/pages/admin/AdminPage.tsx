import React, { useEffect, useState } from "react";
import { RetailModel } from "../../common/Types";
import axios, {AxiosError} from "axios";
import { Button, Container } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { MarketModel } from "../../common/Types";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import Header from "../../components/Header";

const AdminPage = () => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        justify: "center",
        alignItems: "center",
    };

    const [retails, setRetails] = useState<[] | RetailModel[]>([]);
    const [mapping, setMapping] = useState<{[index: string]: string}>({});
    const [price, setPrice] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [open, setOpen] = useState(false);

    const nav = useNavigate();

    const getMarketMapping = (markets: MarketModel[]): {[index: string]: string} => {
        let mapping: {[index: string]: string} = {};
      
        for (let i = 0; i < (markets as MarketModel[]).length; i++) {
          mapping[markets[i].marketId] = markets[i].name;
        }
        
        return mapping;
    }

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

    const getAllRetails = async () => {
        try {
            await axios.get<RetailModel[]>("http://35.208.73.9:8080/admin/retails").then((res) => {
                setRetails(res.data);
            });
                
            } catch (error: unknown) {
                const err = error as AxiosError;
                console.log(err.response?.data);
        }
    }

    const onClickBtn = (productName: string, marketName: string) => {
        nav("/status", {
            state: {
                productName: productName,
                marketName: marketName,
                isAdmin: true
            }
        });
    };

    const onClickSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(id);
        console.log(price);

        try {
            await axios.put<RetailModel[]>("http://35.208.73.9:8080/admin/updatePrice", {
                "retailId": id,
                "price": price
            }).then((res) => {
                getAllRetails();
            }).catch((error) => {
                console.log(error);
            })
                
            } catch (error: unknown) {
                const err = error as AxiosError;
                console.log(err.response?.data);
        }

        setOpen(false);

    };

    const onClickEdit = (retailId: string) => {
        setOpen(true);
        setId(retailId);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrice(e.currentTarget.value);
    }

    useEffect(() => {
        getAllRetails();
        getMarketData();
    }, []);

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
                <h1>Admin Page</h1>
            </Container>
            <Container sx={{
                height: 1000,
                width: "100%",
                marginTop: 10,
                display: "flex",
                justify: "center",
                alignItems: "center"
            }}>

            <Modal
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <TextField id="outlined-basic" label="Price" value={price} onChange={handleChange}/>
                <Button onClick={onClickSubmit} sx={{marginLeft: 5}}>Submit</Button>
                </Box>
            </Modal>

            <TableContainer sx={{
                height: 1000,
                width: "100%",
                alignSelf: "center"
            }} component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Market Name</TableCell>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {retails.map((retail: RetailModel) => (
                    <TableRow
                    key={retail.retailId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{mapping[retail.marketId]}</TableCell>
                    <TableCell align="center">{retail.productName}</TableCell>
                    <TableCell align="center">{retail.price}</TableCell>
                    <TableCell align="center"><Button onClick={() => onClickBtn(retail.productName, mapping[retail.marketId])} >Go to Status</Button></TableCell>
                    <TableCell align="center"><Button sx={{border: 1}} onClick={() => onClickEdit(retail.retailId)}>Edit</Button></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Container>
        </>
    );

}

export { AdminPage };