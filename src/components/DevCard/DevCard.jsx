import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogDelete from "../dialogs/DialogDelete/DialogDelete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { deleteOneDeveloper } from "../../redux/actions/index";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 250,
  },
  infoLink: {
    textTransform: "none",
  },
}));

function DevCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpened, setDeleteDialogVisibility] = useState(false);
  const [menuOpened, setMenuVisibility] = useState(false);
  const { info, onDelete } = props;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuVisibility(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogVisibility(true);
    setMenuVisibility(false);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuVisibility(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogVisibility(false);
  };

  const handleDeleteDeveloper = () => {
    props.deleteOneDeveloper(info._id);
    setDeleteDialogVisibility(false);
    onDelete();
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/api/developers/${info._id}`}>
          <CardMedia
            className={classes.media}
            image={info.avatar}
            title={info.name}
          />
        </Link>
        <CardContent></CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="column">
          <Typography variant="body2" color="textSecondary" component="p">
            Name: {info.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone: {info.phone}
          </Typography>
        </Grid>

        <div>
          <IconButton
            aria-label="account of current developer"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={menuOpened}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDeleteClick} open={menuOpened}>
              Delete
            </MenuItem>
            <Link
              className={classes.infoLink}
              to={`/api/developers/${info._id}`}
            >
              <MenuItem open={menuOpened}>Info</MenuItem>
            </Link>
          </Menu>
          <DialogDelete
            open={deleteDialogOpened}
            onClose={handleDeleteDialogClose}
            onDelete={handleDeleteDeveloper}
          />
        </div>
      </CardActions>
    </Card>
  );
}
const mapDispatchToProps = { deleteOneDeveloper };

export default connect(null, mapDispatchToProps)(DevCard);
