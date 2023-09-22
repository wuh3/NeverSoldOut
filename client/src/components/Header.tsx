import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import { Button, Typography } from '@mui/material';

type HeaderProps = {
  query: string
}

const Header = () => {
  const nav = useNavigate();

  // search goes here
  const renderSearchQuery = (query: HeaderProps) => {
    let q = query.query
    console.log(q)
    let path = '/query';
        nav(path,{state:{
            query: q
        }});
  };

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                justifyContent: "space-between",
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              OFFERRAIN
          </Typography>
          <Box sx={{flexGrow: 1}}>
              <Button variant="contained" onClick={() => nav("/discount")}>Show Discounts</Button>
          </Box>
          <Box>
            <SearchBar  onSearch={renderSearchQuery}></SearchBar>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;