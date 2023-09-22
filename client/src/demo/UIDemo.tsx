import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import axios, { AxiosError } from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { MultiLevelMenu } from "../pages/menu/MultiLevelMenu";
import { AdvancedQuery } from '../pages/advancedQuery/advancedQuery';

import { MarketModel, MenuModel, TabPanelProps } from '../common/Types';

import { LevelMarketList } from '../pages/market/LevelMarketList'

import Header from '../components/Header';

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ui-tabpanel-${index}`}
      aria-labelledby={`ui-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `ui-tab-${index}`,
    'aria-controls': `ui-tabpanel-${index}`,
  };
}

const UIDemo = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [markets, setMarkets] = useState<[] | MarketModel[]>([]);
  const [category,setCategory] = useState<{} | MenuModel>({});

  const getMarketData = async () => {
    try {
        await axios.get<MarketModel[]>("http://35.208.73.9:8080/markets").then((res) => {
          setMarkets(res.data);
        });
            
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  }

  const getCategoryData = async () => {
    try {
        await axios.get<MenuModel>("http://35.208.73.9:8080/categories").then((res) => {
          setCategory(res.data);
        })
            
        } catch (error: unknown) {
        const err = error as AxiosError;
        console.log(err.response?.data);
    }
  }

  useEffect(() => {
    getMarketData();
    getCategoryData();
  },[]);

  useEffect(() => {
    console.log(category);
    console.log(markets);
  }, [category, markets])

  return (
    <>
    <Header />
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Find items by category" {...a11yProps(0)} />
          <Tab label="Find items by market name" {...a11yProps(1)} />
          <Tab label="Advanced query" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MultiLevelMenu menuProps={category}></MultiLevelMenu>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LevelMarketList markets={markets}></LevelMarketList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdvancedQuery></AdvancedQuery>
      </TabPanel>
    </Box>
    </>
  );
}

export { UIDemo };