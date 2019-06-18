import React, {useEffect,useState, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import withReducer from 'app/store/withReducer';
import Tabs, { Tab } from 'react-awesome-tabs';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import axios from'axios';
import { useCookies } from 'react-cookie';
import Dashboard from '../Dashboard/dashboard';
import ExtensionTable from '../Table/table';
import DataTable from "../Table/table1";







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
function renderTabContent(tab, extensonList){
    console.log(tab);
    if(tab.name === 'dashboard') {
        return(<Dashboard/>)
    }
    else if(tab.name === 'CQC') {
        return (<DataTable extensionList={extensonList}/>);
    } else if(tab.name === 'settings') {
        return (<h3> This is settings Component {JSON.stringify(extensonList)} </h3>);
    }
    
}

function Example (props) {
    const [extensonList, setExtensonList] = useState([]);
    const [cookies, setCookie] = useCookies(['core_cookie']);
    
    // cookies.set("core-cookies", true, {"core_cookie":"50635548-f598-46b7-a393-98c6ffc947e2", 
    //                             "path" :' /', 
    //                             "domain":'10.226.14.186', 
    //                             "Expires":"Tue, 19 Jan 2038 03:14:07 GMT"});
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
								{renderTabContent(value, extensonList)}
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

    useEffect(() => {
     const data = {
           
                    "function" : "extensions.auth",
                "pin" : "0100",
                "extension" : "100",
                "sil_tenant_url" : "/iit909",
                'Access-Control-Allow-Credentials': 'omit'
            }
        axios({
            method: 'post',
            url: 'http://10.226.14.70:7778/6/api',
            data
        }).then(
            (data) => {
                console.log(data.data.core_cookie);

                setCookie('core_cookie', data.data.core_cookie);
                const formttedData = {
                     
                    "function": "extensions.list",
                    "limit": 200,
                    "page": 1,
                    "start": 0
                }
                console.log(cookies['core_cookie']);
                axios.post('http://10.226.14.70:7778/6/api',formttedData, {Cookie: 'core_cookie=3dbc57e9-e0f8-45e4-aa6f-8dda45391b92'})
                .then(response => {
                    console.log("data second", response)
                    setExtensonList(response.data.items)
                })
            }
        )  

        // const cookie1 = {"core_cookie":"50635548-f598-46b7-a393-98c6ffc947e2", 
        // "path" :' /', 
        // "domain":'10.226.14.186', 
        // "Expires":"Tue, 19 Jan 2038 03:14:07 GMT"};

       
    //     axios.post('http://10.226.14.70:7778/6/api',  {
            
    //             Cookie: cookie1

    //     },formtteddata,  {withCredentials: true})
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    },[]); 

        return (
            <FusePageSimple           
                content={tabComponent}      
            />
        )
     
}

// export default withStyles(styles, {withTheme: true})(Example);
export default withReducer('Example', reducer)(Example);