import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = (props: {productId: string, productName: string}) => {
    const nav = useNavigate();

    useEffect(() => {
        console.log(props.productId);
    }, []);

    const onClickBtn = () => {
        nav("/retail", { state: {
            productId: props.productId,
            isFromProduct: true
        }})
    };

    return (
        <Grid item sx={{
            flexGrow: 1,
        }} xs={"auto"}>
            <Button sx={{
                fontSize: 15
            }} onClick={onClickBtn}>
                {props.productName}
            </Button>
        </Grid>
        
    )
}

export { ProductItem };