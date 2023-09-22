import { useEffect, useState } from "react";
import { RightArrowIcon } from "../../common/Logos";
import { MultiLevelItem } from "./MultiLevelItem";
import { MenuItemModel, MenuModel } from "../../common/Types";

const MultiLevelMenu = (props: {menuProps: MenuModel}) => {

    useEffect(() => {
        console.log("Menu did mount");
        extractMenuData();
    }, [props]);

    const [menuItemData, setMenuItemData] = useState<[] | MenuItemModel[]>([]);

    const extract = (primary: string, secondary: string[]): MenuItemModel => {

        let primaryItem: MenuItemModel = {
            logo: <RightArrowIcon />,
            title: primary,
            isPrimary: true
        };

        if (secondary.length > 0) {
            primaryItem.children = [];
            for (const name in secondary) {
                let secondaryItem: MenuItemModel = {
                    logo: <RightArrowIcon />,
                    title: secondary[name],
                    isPrimary: false
                };
    
                primaryItem.children?.push(secondaryItem);
            }
        }

        return primaryItem;
    };

    const extractMenuData = () => {
        let menuItemData: MenuItemModel[] = [];

        for (const primary in props.menuProps) {
            let secondary = props.menuProps[primary];
            menuItemData.push(extract(primary, secondary));
        }
        setMenuItemData(menuItemData);
    };

    return (
        <>
            {menuItemData.map((item, key) => <MultiLevelItem key={key} itemData={item} />)}
        </>
    );
};

export { MultiLevelMenu };