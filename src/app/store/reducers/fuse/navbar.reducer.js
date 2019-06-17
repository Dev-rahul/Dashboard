import * as Actions from '../../actions/fuse/index';

const initialState = {
    foldedOpen: false,
    mobileOpen: false,
    tabs: [],
    activeTab: 0
};

const navbar = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.TOGGLE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: !state.foldedOpen
            }
        }
        case Actions.OPEN_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: true
            }
        }
        case Actions.CLOSE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: false
            }
        }
        case Actions.TOGGLE_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: !state.mobileOpen
            }
        }
        case Actions.OPEN_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: true
            }
        }
        case Actions.CLOSE_MOBILE_NAVBAR:
        {
            let tabList = [...state.tabs];
            let index = 0;
            let activeTab = state.activeTab;
            if(state.tabs.length> 0) {
                index= state.tabs.length;
            }
            let find = false;
            tabList.map(tabs => {
                if(tabs.name === action.tabName) {
                    activeTab = tabs.index;
                    find = true;
                }
            })
            if(!find) {
                tabList.push({name: action.tabName, index: index});
                activeTab = index;
            } else {
              //  activeTab = 
            }
            
            console.log(tabList);
            return {
                ...state,
                mobileOpen: true,
                tabs: tabList,
                activeTab: activeTab
            }
        }
        case Actions.CHANGE_ACTIVE_TAB: {
            return  {
                ...state,
                activeTab: action.activeTab
            }
        }
        case Actions.ON_TAB_CLOSE: {
            let tabList = [...state.tabs];
            let activeTab = state.activeTab;
            tabList.splice(action.index, 1);

		    if(activeTab >= tabList.length) {
                activeTab = tabList.length - 1;
		    }

            return {
                ...state,
                tabs: tabList,
                activeTab: activeTab
            }
        }

        case Actions.ON_TAB_POSITION_CHANGE: {
            let tabs = [...state.tabs];
            let a = tabs[action.tab1];
            tabs[action.tab1] = tabs[action.tab2];
            tabs[action.tab2] =  a;
            let activeTab = 0;
            if(state.activeTab === action.tab1) {
                activeTab =  action.tab2;
            } else if(state.activeTab === action.tab2) {
                activeTab =  action.tab1;
            }
            
            return {
                ...state,
                tabs: tabs,
                activeTab: activeTab
            }
        }
        default:
        {
            return state;
        }
    }
};

export default navbar;