interface MenuModel {
    [index: string]: string[];
};

interface MenuProps {
    data: MenuModel;
};

interface MenuItemModel {
    logo: JSX.Element;
    title: string;
    children?: MenuItemModel[];
    isPrimary: boolean;
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
};

interface MarketModel {
    marketId: string;
    name: string;
    location: string;
}

interface ProductModel {
    productId: string;
    categoryId: string;
    name: string;
}

interface RetailModel {
    retailId: string;
    marketId: string;
    productId: string;
    productName: string;
    price: number;
}

interface LocationState {
    marketId?: string;
    productId?: string;
    isFromProduct: boolean;
}

interface StatusModel {
    statusId: string,
    productName: string,
    marketName: string,
    numOfLikes: number,
    numOfDislikes: number,
    timeStamp: string,
    isInStock: boolean
}

interface DiscountModel {
    productName: string,
    marketName: string,
    oldPrice: number,
    newPrice: number
}

export { MenuModel, MenuProps, MenuItemModel, TabPanelProps, ProductModel, RetailModel, LocationState, MarketModel, StatusModel, DiscountModel };