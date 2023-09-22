import { Card, CardContent, Typography } from "@mui/material";
import { DiscountModel } from "../../common/Types";

const Discount = (props: {discount: DiscountModel}) => {
    return (
        <>
        <Card sx={{ width: 300, margin: 1, backgroundColor: "#f8f7fa"}}>
        <CardContent>
            <Typography variant="h5" component="div">
            {props.discount.productName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.discount.marketName}
            </Typography>
            <Typography>
                <h4>Old Price:</h4> <span style={{fontSize: 18, color: "grey", textDecoration: 'line-through'}}><i>{props.discount.oldPrice}</i></span> 
                <h3>New Price:</h3> <span style={{fontSize: 30}}>{props.discount.newPrice}</span>
            </Typography>
        </CardContent>
        </Card>
        </>
    )
}

export { Discount };