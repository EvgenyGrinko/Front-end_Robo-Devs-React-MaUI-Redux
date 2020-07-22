import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  search: {
    width: "100%",
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(2, 0, 2, 1),
    borderRadius: "0.5rem",
  },
  inputInput: {
    padding: theme.spacing(1, 2, 1, 2),
    color: theme.palette.primary.contrastText,
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [searchedWord, setSearchedWord] = useState("");

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search…"
        fullWidth={true}
        className={classes.inputInput}
        value={searchedWord}
        onChange={(event) => {
          setSearchedWord(event.target.value);
          props.onSearch(event.target.value);
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default SearchBar;
