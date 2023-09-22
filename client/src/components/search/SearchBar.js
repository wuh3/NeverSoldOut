import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState('')

  const onClk = (e) => {
    e.preventDefault()
    if(!query) {
      alert("Search for something!")
      return
    }

    onSearch({query})

    setQuery('')
  }

  return (
    <form>
      <TextField id="search-bar" value={query} onChange={(e)=>setQuery(e.target.value)} className="text"  variant="outlined" style={{ backgroundColor: "white" }} placeholder="Search by product name.." size="small"/>
      <IconButton type="submit" aria-label="search" onClick={onClk}>
        <SearchIcon style={{ fill: "white" }} />
      </IconButton>
    </form>
  )
};

  export default SearchBar;

