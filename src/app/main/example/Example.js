import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
//import FullWidthTabs  from "../../fuse-layouts/tabs/tabs";
import {Simple} from '../tabs/tab';

const styles = theme => ({
    layoutRoot: {}
});

class Example extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                /* contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                } */
                content={

                        <Simple/>
                    
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Example);