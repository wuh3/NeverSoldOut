import { useLocation, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios, { AxiosError } from 'axios';
import AddStatus from "./AddStatus";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StatusModel } from "../../common/Types";
import ClearIcon from '@mui/icons-material/Clear';
import Header from "../../components/Header";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Status = () => {
    const location = useLocation();
    const nav = useNavigate();
    const productName = location.state.productName;
    const marketName = location.state.marketName;
    const isAdmin = location.state.isAdmin;

    const [status,setStatus] = useState<[] | StatusModel[]>([]);

    const getAllStatus = async () => {
        try {
            let params = {
                            "productName": productName,
                            "marketName": marketName
                         }
            await axios.get("http://35.208.73.9:8080/status",{params: params})
            .then((res) => {
                setStatus(res.data);
            }).catch((error) => {
                console.log(error);
                console.log(marketName, productName);
            });
                
        } catch (error: unknown) {
          const err = error as AxiosError;
          console.log(err.response?.data);
        }
    };

    useEffect(()=> {
        getAllStatus();
    },[]); 

    const addStatus = (s: {"isInStock": boolean}) => {
        let productnm = status[0].productName
        let mktnm = status[0].marketName
        const newStatus = {"productnm": productnm,
                            "mktnm": mktnm,
                            "isInStock": s.isInStock}
        console.log(JSON.stringify(newStatus))

        axios.post('http://35.208.73.9:8080/postStatus',newStatus).
        then(response=> {
            getAllStatus();
            console.log(response)
        })
        .catch(error=>{
            console.log(error);
        })
    };

    const deleteStatus = async (statusId: string) => {
        console.log(statusId);
        try {
            await axios.delete(`http://35.208.73.9:8080/admin/deleteStatus?statusId=${statusId}`).then((res) => {
              getAllStatus();
            }).catch((error) => {
                console.log(error);
            });
                
        } catch (error: unknown) {
          const err = error as AxiosError;
          console.log(err.response?.data);
        }
    };

    const onClickLike = async (statusId: string, isLike: boolean) => {
        console.log(statusId, isLike);
        try {
            await axios.put("http://35.208.73.9:8080/updateLikes", {
                "statusId": statusId,
                "sentiment": isLike
            }).then((res) => {
                getAllStatus();
            }).catch((error) => {
                console.log(error);
            })
                
            } catch (error: unknown) {
                const err = error as AxiosError;
                console.log(err.response?.data);
        }
    };

    return (
        <>
        <Header />
        <Button style={{marginTop: 10, marginLeft: 10}} variant="outlined" onClick={() => nav(-1)}><ArrowBackIcon></ArrowBackIcon></Button>
        <AddStatus onAdd={addStatus}></AddStatus>
        <Container sx={{
            width: "100%",
            height: 60,
            display: "flex",
            flexWrap: "wrap", 
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28
        }} >
            <h1>Status List</h1>
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
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">DateOfPost</TableCell>
                    <TableCell align="center">#of likes</TableCell>
                    <TableCell align="center">#of dislikes</TableCell>
                    <TableCell align="center">{isAdmin ? "Delete": "Like | Dislike"}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {status.map((s: StatusModel) => (
                <TableRow
                key={s.statusId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center">{s.productName}</TableCell>
                <TableCell align="center">{s.marketName}</TableCell>
                <TableCell align="center">{s.isInStock ? "In stock" : "Out of stock"}</TableCell>
                <TableCell align="center">{s.timeStamp}</TableCell>
                <TableCell align="center">{s.numOfLikes}</TableCell>
                <TableCell align="center">{s.numOfDislikes}</TableCell>
                {isAdmin ? <TableCell align="center"><Button onClick={() => deleteStatus(s.statusId)}><ClearIcon></ClearIcon></Button></TableCell>: 
                <TableCell align="center"><Button onClick={() => onClickLike(s.statusId, true)}><ThumbUpIcon /></Button> <Button onClick={() => onClickLike(s.statusId, false)}><ThumbDownIcon /></Button> </TableCell>}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Container>
    </>
    )
}

export default Status;