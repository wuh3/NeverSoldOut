import { ListItemText, ListItemButton } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { MarketModel } from "../../common/Types";

const SingleMarket = (props: { market: MarketModel }) => {
    const navigate = useNavigate();

    const onClickMarket = (marketId: string, marketName: string) => {
        const path = '/retail';
        console.log(marketName)
        navigate(path, { state:{
            marketId: marketId,
            marketName: marketName
        }
        });
    };

    return (
        <>
        <ListItemButton onClick={() => onClickMarket(props.market.marketId, props.market.name)} style={{width: 800}}>
            <ListItemText primary={props.market.name} />
            {props.market.location}
        </ListItemButton>
        </>
    );
};

export { SingleMarket };