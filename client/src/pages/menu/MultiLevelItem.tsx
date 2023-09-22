import { Collapse, ListItemIcon, ListItemText, List, ListItemButton } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { CollapseIcon, HoldIcon } from "../../common/Logos";
import { MenuItemModel } from "../../common/Types";

const MultiLevelItem = (props: { itemData: MenuItemModel }) => {
    
    const [show, setShow] = useState(false);

    const nav = useNavigate();

    const hasChild = (props.itemData.children ? true : false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (hasChild) {
            setShow((prevShow) => !prevShow);
        } else {
            nav("/product", {
                state: {
                    categoryName: props.itemData.title
                }
            });
        }
    };

    return (
        <>
        <ListItemButton onClick={handleClick} style={{width: 300}}>
            {props.itemData.isPrimary ? <ListItemIcon>{props.itemData.logo}</ListItemIcon> : <ListItemIcon />}
            <ListItemText primary={props.itemData.title} />
            {hasChild && (show ? <HoldIcon /> : <CollapseIcon />)}
        </ListItemButton>
        <Collapse in={show} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.itemData.children?.map((child, key) => (
                    <MultiLevelItem key={key} itemData={child} />
                ))}
            </List>
        </Collapse>
        </>
    );
};

export { MultiLevelItem };