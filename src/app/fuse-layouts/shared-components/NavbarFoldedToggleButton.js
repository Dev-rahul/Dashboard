import React from 'react';
import {Icon, IconButton} from '@material-ui/core';
import _ from '@lodash';
import * as Actions from 'app/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';

function NavbarFoldedToggleButton(props)
{
    const dispatch = useDispatch();
    const settings = useSelector(({fuse}) => fuse.settings.current);

    return (
        <div style={{width: "100%", background:"#157fcc", paddingTop: "10px", paddingRight: "10px", paddingBottom: "10px"}}>
        <IconButton
            className={clsx(props.className, "w-20 h-20")} 
            style={{float: 'right', background:"#add2ed", width: "20px", height: "20px"}}
            onClick={() => {
                dispatch(Actions.setDefaultSettings(_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)));
            }}
            color="inherit"
        >
            {props.children}
        </IconButton>
        </div>
    );
}

NavbarFoldedToggleButton.defaultProps = {
    children: <Icon style={{color:"#157fcc"}}>menu</Icon>
};

export default NavbarFoldedToggleButton;
