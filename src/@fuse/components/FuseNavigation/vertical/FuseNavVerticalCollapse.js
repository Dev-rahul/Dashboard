import React, {useEffect, useState} from 'react';
import {Collapse, Icon, IconButton, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseUtils} from '@fuse';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';
import FuseNavVerticalGroup from './FuseNavVerticalGroup';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavBadge from './../FuseNavBadge';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import { importNamespaceSpecifier } from '@babel/types';


const useStyles = makeStyles(theme => ({
    root: {
        padding : 0,
        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)'
        }
    },
    item: {
        height      : 40,
        width       : 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingRight: 12,
        color       : "#000",
        '&.square'  : {
            width       : '100%',
            borderRadius: '0'
        }
    },
    activeClass: {
        background: '#157fcc'
    },
    icon: {
        display: "contents",
        color: "#000"
    }
}));

function needsToBeOpened(location, item)
{
    return location && isUrlInChildren(item, location.pathname)
}

function isUrlInChildren(parent, url)
{
    if ( !parent.children )
    {
        return false;
    }

    for ( let i = 0; i < parent.children.length; i++ )
    {
        if ( parent.children[i].children )
        {
            if ( isUrlInChildren(parent.children[i], url) )
            {
                return true;
            }
        }

        if ( parent.children[i].url === url || url.includes(parent.children[i].url) )
        {
            return true;
        }
    }

    return false;
}

function FuseNavVerticalCollapse(props)
{
    const userRole = useSelector(({auth}) => auth.user.role);
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const [open, setOpen] = useState(() => needsToBeOpened(props.location, props.item));
    const {item, nestedLevel, active} = props;
    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';
    let activeClass = '';
    if(item.active) {
        activeClass = 'activeClass';
    }
    useEffect(() => {
        if ( needsToBeOpened(props.location, props.item) )
        {
            setOpen(true);
        }
    }, [props.location, props.item]);

    function handleClick()
    {
        setOpen(!open);
    }
    function OncolapseItemClickHandler(item) {
        dispatch(Actions.navbarCloseMobile(item.id))
        let updateItem = {...item};
        updateItem.active = true;
        dispatch(Actions.resetNavigation());
        dispatch(Actions.updateNavigationItem(updateItem.id, updateItem));
        if(updateItem.id === 'Dashboard') {
            updateItem.children.map(childItem => {
                childItem.active = false;
                dispatch(Actions.updateNavigationItem(childItem.id, childItem));
            })
        }
    }
    

    if ( !FuseUtils.hasPermission(item.auth, userRole) )
    {
        return null;
    }
    let collapsableComponent = (
        <div className={clsx(classes.item, classes.icon, listItemPadding, 'list-item', active)}
                >
                {item.icon && (
                    <Icon color="primary"  className="text-16 flex-shrink-0 mr-16">{item.icon}</Icon>
                )}
                <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
                {item.badge && (
                    <FuseNavBadge className="mr-4" badge={item.badge}/>
                )}
                </div>
    )
    if(item.id === 'Dashboard') {
        collapsableComponent =(
            <div className={clsx(classes.item, classes.icon, listItemPadding, 'list-item', active)}
                onClick={ev => OncolapseItemClickHandler(item)} >
                {item.icon && (
                    <Icon color="primary"  className="text-16 flex-shrink-0 mr-16">{item.icon}</Icon>
                )}
                <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
                {item.badge && (
                    <FuseNavBadge className="mr-4" badge={item.badge}/>
                )}
                </div>
        )
    }
    let collapseIconComponent = (
        <IconButton disableRipple className="w-16 h-16 p-0"  onClick={handleClick}>
        <Icon className="text-16 arrow-icon" color="primary">
            {open ? 'expand_less' : 'expand_more'}
        </Icon>
    </IconButton>
    );
    if(item.id=== 'logout') {
        collapseIconComponent = null;
    }
    return (
        <ul className={clsx(classes.root, open && "open")}>

            <ListItem
                button
                className={classes[activeClass]}
                
            >
                {collapsableComponent}
                {collapseIconComponent}
            </ListItem>

            {item.children && (
                <Collapse in={open} className="collapse-children">
                    {
                        item.children.map((item) => (

                            <React.Fragment key={item.id}>

                                {item.type === 'group' && (
                                    <FuseNavVerticalGroup item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                                {item.type === 'collapse' && (
                                    <NavVerticalCollapse item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                                {item.type === 'item' && (
                                    <FuseNavVerticalItem item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                                {item.type === 'link' && (
                                    <FuseNavVerticalLink item={item} nestedLevel={nestedLevel + 1} active={active}/>
                                )}

                            </React.Fragment>
                        ))
                    }
                </Collapse>
            )}
        </ul>
    );
}

FuseNavVerticalCollapse.propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            icon    : PropTypes.string,
            children: PropTypes.array
        })
};
FuseNavVerticalCollapse.defaultProps = {};

const NavVerticalCollapse = withRouter(React.memo(FuseNavVerticalCollapse));

export default NavVerticalCollapse;
