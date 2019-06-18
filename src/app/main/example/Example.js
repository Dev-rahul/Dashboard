import React, {useEffect,useState, useRef} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import withReducer from 'app/store/withReducer';
import Tabs, { Tab } from 'react-awesome-tabs';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import Websocket from 'react-websocket';


const useForceUpdate = () => useState()[1];


const styles = theme => ({
    layoutRoot: {}
});

const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});
function renderTabContent(tab){
    console.log(tab);
    if(tab.name === 'dashboard') {
        return(<h1>This is dashboard component</h1>)
    }
    else if(tab.name === 'CQC') {
        return (<h2>This is child coc component </h2>);
    } else if(tab.name === 'settings') {
        return (<h3> This is settings Component </h3>);
    }
    
}

function Example (props) {
    const dispatch = useDispatch();
    const forceUpdate = useForceUpdate();
    const pageLayout = useRef(null);
    const tabList = useSelector(({fuse}) => fuse.navbar.tabs);
    const activeTab = useSelector(({fuse}) => fuse.navbar.activeTab);
    function handleTabSwitch(active) {
        console.log("activeTab", active);
        dispatch(Actions.handleTabChange(active))
    }
    function handleTabClose(index) {
        dispatch(Actions.handleTabClose(index));
        forceUpdate();
    }

    function handleTabPositionChange(a, b) {
        dispatch(Actions.handleTabPositionChange(a, b));
        forceUpdate();
    }
    
    let tabComponent = null;
    if(tabList.length> 0) {
        tabComponent = (
            <Tabs
            active={ activeTab }
            onTabSwitch={ handleTabSwitch }
            onTabClose={ handleTabClose }
            onTabPositionChange={ handleTabPositionChange }
            draggable={ true }
        >
            {
					tabList.map((value, index) => {
						return (
							<Tab 
								key={ value.index } 
								title={ value.name }
								showClose={ true }
							>
								{renderTabContent(value)}
							</Tab>
						);
					})
				}
        </Tabs>
        )
    }

    useEffect(() => {
        console.log('component mounted');
    })
    // useEffect(() => {
    //     dispatch(Actions.getContacts(props.match.params));
    //     dispatch(Actions.getUserData());
    // }, [dispatch, props.match.params]);

    // useEffect(() => {
    //     dispatch(Actions.getContacts(props.match.params));
    // }, [dispatch, props.match.params]);

        return (
            <FusePageSimple           
                content={tabComponent}      
            />
        )
    
}

// export default withStyles(styles, {withTheme: true})(Example);
export default withReducer('Example', reducer)(Example);