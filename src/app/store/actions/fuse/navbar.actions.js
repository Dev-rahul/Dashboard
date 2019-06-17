export const OPEN_FOLDED_NAVBAR = '[NAVBAR] OPEN FOLDED';
export const CLOSE_FOLDED_NAVBAR = '[NAVBAR] CLOSE FOLDED';
export const TOGGLE_FOLDED_NAVBAR = '[NAVBAR] TOGGLE FOLDED';
export const TOGGLE_MOBILE_NAVBAR = '[NAVBAR] TOGGLE MOBILE';
export const OPEN_MOBILE_NAVBAR = '[NAVBAR] OPEN MOBILE';
export const CLOSE_MOBILE_NAVBAR = '[NAVBAR] CLOSE MOBILE';
export const GET_TAB_LIST = '[NAVBAR] GET TABS';
export const CHANGE_ACTIVE_TAB = '[NAVBAR] CHANGE ACTIVE TAB';
export const ON_TAB_CLOSE = '[NAVBAR] TAB CLOSE';
export const ON_TAB_POSITION_CHANGE = '[NAVBAR] TAB POSITION CHANGE';

export function navbarToggleFolded()
{
    return {
        type: TOGGLE_FOLDED_NAVBAR
    }
}

export function navbarOpenFolded()
{
    return {
        type: OPEN_FOLDED_NAVBAR
    }
}

export function navbarCloseFolded()
{
    return {
        type: CLOSE_FOLDED_NAVBAR
    }
}

export function navbarToggleMobile()
{
    return {
        type: TOGGLE_MOBILE_NAVBAR
    }
}

export function navbarOpenMobile()
{
    return {
        type: OPEN_MOBILE_NAVBAR
    }
}

export function navbarCloseMobile(tabName)
{
    return {
        type: CLOSE_MOBILE_NAVBAR,
        tabName: tabName
    }
}

export function handleTabChange(activeTab)
{
    return {
        type: CHANGE_ACTIVE_TAB,
        activeTab: activeTab
    }
}
export function handleTabClose(index)
{
    return {
        type: ON_TAB_CLOSE,
        index: index
    }
}

export function handleTabPositionChange(a, b) {
    return {
        type: ON_TAB_POSITION_CHANGE,
        tab1: a,
        tab2: b
    }
}

