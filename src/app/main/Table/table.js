import React, {useEffect,useState, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import withReducer from 'app/store/withReducer';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import axios from'axios';
import { useCookies } from 'react-cookie';
import ReactDataGrid from 'react-data-grid';

const useForceUpdate = () => useState()[1];


const styles = theme => ({
    layoutRoot: {}
});
const columns = [
    { key: 'firstname', name: 'First Name' },
    { key: 'lastname', name: 'Last Name' },
    { key: 'extension', name: 'Extension' } ];
  
 // const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

function ExtensionTable (props) {
    console.log('table.js',props);
    const rows = props.extensionList;
    return (<ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={3}
        minHeight={150} />);
}
export default withReducer('ExtensionTable', reducer)(ExtensionTable);