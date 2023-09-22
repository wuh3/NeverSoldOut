import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { ProductItem } from "./ProductItem";
import { ProductModel } from "../../common/Types";
import { Grid, List } from "@mui/material";
import { Container } from "@mui/system";
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

type TProduct = ProductModel[];

const ProductPage = () => {

    const nav = useNavigate();
    const productName = useLocation().state.productName;
    
    const [products, setProducts] = useState<[] | TProduct>([]);

    const getProductData = async () => {
        try {
            const { data } = await axios.get<TProduct>(`http://35.208.73.9:8080/products?name=${productName}`);
    
            return data;
                
        } catch (error: unknown) {
            const err = error as AxiosError;
            console.log(err.response?.data);
        }
    }

    useEffect(() => {
        getProductData().then((product) => {setProducts(product??[]);});
        console.log("product page did mount");
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
            <h1>Product List</h1>
        </Container>
        <Container sx={{
            height: "75%",
            width: "100%",
            marginTop: 10,
            border: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Grid container spacing={2} sx={{
                height: 350,
                overflow: "auto",
                width: 1,
                flexGrow: 1
            }} >
                {products.map((product) => (
                    <ProductItem key={(product as ProductModel).productId} productId={(product as ProductModel).productId} productName={(product as ProductModel).name} />
                ))}
            </Grid>
        </Container>
        </>
    );
    
}

export { ProductPage };