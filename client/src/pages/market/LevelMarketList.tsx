import { MarketModel } from '../../common/Types';
import {SingleMarket} from './SingleMarket'

const LevelMarketList = (props: { markets: MarketModel[] }) => {

    return (
        <>
            {props.markets.map((market: MarketModel) => (
                <SingleMarket key={market.marketId} market={market} />
            ))}
        </>
    );
};

export { LevelMarketList };