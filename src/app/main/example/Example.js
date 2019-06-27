import React, { useEffect, useState, useRef } from 'react'
import { FusePageSimple } from '@fuse'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../../store/actions'
import reducer from '../../store/reducers'
import withReducer from 'app/store/withReducer'
import Tabs, { Tab } from 'react-awesome-tabs'
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Dashboard from '../Dashboard/dashboard'
import DraggableGrid from '../DragableGrid/draggableGrid'
import ExtensionTable from '../Table/table'
import DataTable from '../Table/table1'
import Settings from '../SettingsComponent/settings';
import Websocket from '../websocket'

import {
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  Fab,
  IconButton,
  Icon,
  LinearProgress,
  MenuItem,
  Menu,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

const useForceUpdate = () => useState()[1]

const styles = theme => ({
  layoutRoot: {}
})

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 99
  }
})
function renderTabContent (
  tab,
  extensonList,
  props,
  anchorEl,
  setAnchorEl,
  dashboardItems,
  setDashboardItems,
  settings
) {
  // console.log(tab);
  function handleClick (event) {
    // console.log(event.currentTarget);
    console.log(event);
    setAnchorEl(event.currentTarget)
  }

  function handleClose () {
    setAnchorEl(null)
  }
  const handleChange = name => event => {
    setDashboardItems({ ...dashboardItems, [name]: event.target.checked })
  }
  

  console.log(tab)
  if (tab.name === 'Dashboard') {
    return (
      <div>
        {' '}
        <div style={{ float: 'right' , paddingRight: "10px"}}>
          <Fab
            aria-owns='dashboard-menu'
            aria-haspopup='true'
            color='secondary'
            size='small'
            onClick={handleClick}
          >
            <Icon>settings</Icon>
          </Fab>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dashboardItems.agents}
                    onChange={handleChange('agents')}
                    value={dashboardItems.agents}
                  />
                }
                label='Agents'
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dashboardItems.queues}
                    onChange={handleChange('queues')}
                    value={dashboardItems.queues}
                  />
                }
                label='Queues'
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dashboardItems.agentDistribution}
                    onChange={handleChange('agentDistribution')}
                    value={dashboardItems.agentDistribution}
                  />
                }
                label='Agent Distribution'
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dashboardItems.callsAndAgents}
                    onChange={handleChange('callsAndAgents')}
                    value={dashboardItems.callsAndAgents}
                  />
                }
                label='Calls And Agents'
              />
            </MenuItem>

            {/*
<MenuItem onClick={handleClose}><FormControlLabel
control={
<Checkbox checked={columnFilter.status} onChange={handleChange('status')} value="status" />
}
label="Status"
/></MenuItem> */}
          </Menu>
        </div>
        <Dashboard
          agentData={props.agentList}
          queueData={props.queueList}
          dashboardItems={dashboardItems}
          closeButton={handleChange}
          settings={settings}
        />
      </div>
    )
  } else if (tab.name === 'One Hour Summary') {
    return <DataTable extensionList={extensonList} />
  } else if (tab.name === 'settings') {
    return <Settings/>
  }
}

function Example (props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [dashboardItems, setDashboardItems] = React.useState({
    agents: true,
    queues: true,
    agentDistribution: true,
    callsAndAgents: true
  })
  const [extensonList, setExtensonList] = useState([])
  const [cookies, setCookie] = useCookies(['core_cookie'])

  // cookies.set("core-cookies", true, {"core_cookie":"50635548-f598-46b7-a393-98c6ffc947e2",
  // "path" :' /',
  // "domain":'10.226.14.186',
  // "Expires":"Tue, 19 Jan 2038 03:14:07 GMT"});
  const dispatch = useDispatch()
  const forceUpdate = useForceUpdate()
  const pageLayout = useRef(null)
  const tabList = useSelector(({ fuse }) => fuse.navbar.tabs)
  const settings = useSelector(
    ({ fuse }) => fuse.settings.current.layout.config.navbar.folded
  )
  console.log('settings', settings)
  const activeTab = useSelector(({ fuse }) => fuse.navbar.activeTab)
  const navItems = useSelector(({ fuse }) => fuse.navigation)
  function handleTabSwitch (active) {
    let currentItem

    // console.log("activeTab", active);
    navItems[0].children.map(item => {
      if (item.id === tabList[active].name) {
        currentItem = item
      } else {
        if (item.children !== undefined) {
          item.children.map(childItem => {
            if (childItem.id === tabList[active].name) {
              currentItem = childItem
            }
          })
        }
      }
    })

    dispatch(Actions.handleTabChange(active))

    currentItem.active = true
    console.log(' currentItem', currentItem)
    dispatch(Actions.resetNavigation())
    // dispatch(Actions.resetNavigation());
    dispatch(Actions.updateNavigationItem(currentItem.id, currentItem))
    if (currentItem.id === 'Dashboard') {
      navItems[0].children[0].children.map(childItem => {
        childItem.active = false
        dispatch(Actions.updateNavigationItem(childItem.id, childItem))
      })
    }
  }
  function handleTabClose (index) {
    dispatch(Actions.handleTabClose(index))
    forceUpdate()
    console.log("index", index);
    
    dispatch(Actions.resetNavigation())

    // dispatch(Actions.updateNavigationItem(currentItem.id, currentItem));

    let currentActiveTab = activeTab
    if (activeTab >= tabList.length) {
      currentActiveTab = tabList.length - 1;
    } else if(currentActiveTab === index && index=== tabList.length - 1) {
        currentActiveTab = index -1;
    }
    else if (index === 0 && currentActiveTab === index) {
      currentActiveTab = currentActiveTab + 1
    }
    else if(index === tabList.length -1) {
        currentActiveTab = activeTab +1;  
    }
    else if (activeTab !== index) {
      currentActiveTab = activeTab + 1
    }
    let currentItem
    // console.log(" Tab in close", tabList, activeTab, index);
    // if (index === 0 && activeTab === 0) {
    //   if (tabList.length > 1) {
    //     navItems[0].children.map(item => {
    //       if (item.id === tabList[currentActiveTab].name) {
    //         currentItem = item
    //       } else {
    //         if (item.children !== undefined) {
    //           item.children.map(childItem => {
    //             if (childItem.id === tabList[currentActiveTab].name) {
    //               currentItem = childItem
    //             }
    //           })
    //         }
    //       }
    //     })
    //     currentItem.active = true
    //     console.log('Active Tab in close', activeTab, currentItem)

    //     dispatch(Actions.updateNavigationItem(currentItem.id, currentItem))
    //     if (currentItem.id === 'Dashboard') {
    //       currentItem.children.map(childItem => {
    //         childItem.active = false
    //         dispatch(Actions.updateNavigationItem(childItem.id, childItem))
    //       })
    //     }
    //   }
    // } else {
      if (tabList.length > 1) {
        navItems[0].children.map(item => {
          if (item.id === tabList[currentActiveTab - 1].name) {
            currentItem = item
          } else {
            if (item.children !== undefined) {
              item.children.map(childItem => {
                if (childItem.id === tabList[currentActiveTab - 1].name) {
                  currentItem = childItem
                }
              })
            }
          }
        })
        currentItem.active = true
        console.log('Active Tab in close', activeTab, currentItem)

        dispatch(Actions.updateNavigationItem(currentItem.id, currentItem))
        if (currentItem.id === 'Dashboard') {
          currentItem.children.map(childItem => {
            childItem.active = false
            dispatch(Actions.updateNavigationItem(childItem.id, childItem))
          })
        }
      }
    //}
  }

  function handleTabPositionChange (a, b) {
    dispatch(Actions.handleTabPositionChange(a, b))

    forceUpdate()
  }

  let tabComponent = null
  if (tabList.length > 0) {
    tabComponent = (
      <Tabs
        active={activeTab}
        color='blue'
        onTabSwitch={handleTabSwitch}
        onTabClose={handleTabClose}
        onTabPositionChange={handleTabPositionChange}
        draggable
      >
        {tabList.map((value, index) => {
          return (
            <Tab key={value.index} title={value.name} showClose>
              {renderTabContent(
                value,
                extensonList,
                props,
                anchorEl,
                setAnchorEl,
                dashboardItems,
                setDashboardItems,
                settings
              )}
            </Tab>
          )
        })}
      </Tabs>
    )
  }

  // useEffect(() => {
  // dispatch(Actions.getContacts(props.match.params));
  // dispatch(Actions.getUserData());
  // }, [dispatch, props.match.params]);

  useEffect(() => {
    const data = {
      function: 'extensions.auth',
      pin: '0104',
      extension: '104',
      sil_tenant_url: '/iit909',
      'Access-Control-Allow-Credentials': 'omit'
    }
    axios({
      method: 'post',
      url: 'http://10.226.14.70:7778/6/api',
      data
    }).then(data => {
      console.log(data.data.core_cookie)

      setCookie('core_cookie', data.data.core_cookie)
      const formttedData = {
        function: 'extensions.list',
        limit: 200,
        page: 1,
        start: 0
      }
      console.log(cookies['core_cookie'])
      axios
        .post('http://10.226.14.70:7778/6/api', formttedData, {
          Cookie: 'core_cookie=3dbc57e9-e0f8-45e4-aa6f-8dda45391b92'
        })
        .then(response => {
          console.log('data second', response)
          setExtensonList(response.data.items)
        })
    })

    // const cookie1 = {"core_cookie":"50635548-f598-46b7-a393-98c6ffc947e2",
    // "path" :' /',
    // "domain":'10.226.14.186',
    // "Expires":"Tue, 19 Jan 2038 03:14:07 GMT"};

    // axios.post('http://10.226.14.70:7778/6/api', {

    // Cookie: cookie1

    // },formtteddata, {withCredentials: true})
    // .then(function (response) {
    // console.log(response);
    // })
    // .catch(function (error) {
    // console.log(error);
    // });
  }, [])

  return <FusePageSimple content={tabComponent} />
}

// export default withStyles(styles, {withTheme: true})(Example);
export default withReducer('Example', reducer)(Example)
