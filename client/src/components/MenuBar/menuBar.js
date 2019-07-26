
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <Link component={RouterLink} to="/share">
                {/* {this.props.match.params.path !== "share" && */}
                <Button>
                    <Fab size="small" color="secondary" aria-label="add" >
                        <AddIcon />
                    </Fab>
                    SHARE SOMETHING
            </Button>


                {/* } */}
            </Link>

            <IconButton
                aria-label="More"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link component={RouterLink} to="/profile">
                    <MenuItem onClick={handleClose}>Your Porfile</MenuItem>
                </Link>
                <Link component={RouterLink} to="/welcome">
                    <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                </Link>
            </Menu>
        </div >
    );
}  