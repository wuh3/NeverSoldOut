import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { DiscountModel } from "../../common/Types";
import { Box } from "@mui/system";
import { Discount } from "./Discount";
import Header from "../../components/Header";

const DiscountPage = () => {
    const [discounts, setDiscounts] = useState<DiscountModel[]>([{
        productName: "p",
        marketName: "m",
        oldPrice: 20,
        newPrice: 15
    }]);

    const getDiscountData = async () => {
        try {
            await axios.get<DiscountModel[]>("http://35.208.73.9:8080/procedure").then((res) => {
                setDiscounts(res.data);
            });
                
        } catch (error: unknown) {
          const err = error as AxiosError;
          console.log(err.response?.data);
        }
    }
    
    useEffect(() => {
        getDiscountData();
    }, [])

    return (
        <>
        <Header />
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
        }}>
            {discounts.map((discount: DiscountModel) => (
                <Discount key={discount.productName} discount={discount}></Discount>      
            ))}
        </Box>
        </>
    )
}

export { DiscountPage };