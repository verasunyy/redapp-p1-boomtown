
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { Mutation } from "react-apollo";
import client from "../../apollo";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PowerIcon from '@material-ui/icons/SettingsPowerRounded'
import FingerPrintIcon from '@material-ui/icons/Fingerprint';
import { withStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from "../../images/boomtown.svg"

class MenuBar extends Component {

    state = {
        anchorEl: null
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }


    render() {

        const { location, classes } = this.props


        const { anchorEl } = this.state;
        return (


            <div>
                <Mutation
                    mutation={LOGOUT_MUTATION}
                    onCompleted={() => client.resetStore()}
                >
                    {(logout, { data }) => (
                        < div >
                            <Link component={RouterLink} to="/items">
                                <Logo />
                            </Link>

                            <Link component={RouterLink} to="/share">
                                {location.pathname !== "/share" &&
                                    <Button>
                                        <AddCircleIcon color="action" fontSize="large" />
                                        SHARE SOMETHING
                                    </Button>
                                }
                            </Link>
                            <IconButton
                                aria-label="More"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <Link component={RouterLink} to="/profile">

                                    <MenuItem onClick={this.handleClose}><FingerPrintIcon color="action" fontSize="large" />Your Porfile</MenuItem>
                                </Link>
                                <Link component={RouterLink} to="/welcome">

                                    <MenuItem onClick={logout}><PowerIcon color="action" fontSize="large" />Sign Out</MenuItem>
                                </Link>
                            </Menu>
                        </div >
                    )}
                </Mutation>
            </div>

        );
    }
}

export default withRouter(MenuBar)