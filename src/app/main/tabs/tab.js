import React, {Component} from 'react';
import Tabs, { Tab } from 'react-awesome-tabs';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss'
import {
    Button,
    Card,
    CardContent,
    OutlinedInput,
    Icon,
    TextField,
    Typography,
    CardActions,
    Divider,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    LinearProgress
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/styles';




const useStyles = makeStyles(theme => ({
    header    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position     : 'absolute',
        top          : -64,
        left         : 0,
        opacity      : .04,
        fontSize     : 512,
        width        : 512,
        height       : 512,
        pointerEvents: 'none'
    }
}));

const TabContent = (props)=> {
    const classes = useStyles(props);
    const theme = useTheme();
    return(
        <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" >
                                                <Card elevation={1} className="flex flex-col h-256">
                                                    <div
                                                        className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                                                        style={{
                                                            background: '#22ff05',
                                                            color     : 'black'
                                                        }}
                                                    >
                                                        <Typography className="font-medium truncate" color="inherit">Q317</Typography>

                                                    </div>
                                                    <CardContent className="flex flex-col flex-auto items-center justify-center">
                                                        <Typography className="text-center text-16 font-400">q317</Typography>
                                                        <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">1</Typography>
                                                    </CardContent>
                                                    <Divider/>
                                                    <CardActions className="justify-center">
                                                       
                                                             <Typography className="font-medium truncate" color="inherit">Call waiting</Typography>
                                                        <div className="flex items-center justify-center opacity-75">
                                                            <Icon className="text-20 mr-8" color="inherit">access_time</Icon>
                                                            <div className="text-16 whitespace-no-wrap">3 min</div>
                                                        </div>
                                                      
                                                    </CardActions>
                                                    <LinearProgress
                                                        className="w-full"
                                                        variant="determinate"
                                                        value= '100'
                                                        color="secondary"
                                                    />
                                                </Card>
                                            </div>
    )
}


export class Simple extends Component {
    tabs = [];
    categories = [];

    
	handleTabSwitch(active) {
		this.setState({ activeTab: active });
	}

	handleTabPositionChange(a, b) {
		let c = this.tabs[a];
		this.tabs[a] = this.tabs[b];
		this.tabs[b] = c;

		if(this.state.activeTab === a) {
			this.setState({ activeTab: b });
		}else if(this.state.activeTab === b) {
			this.setState({ activeTab: a });
		}

		this.forceUpdate()
	}

	handleTabClose(index) {
		this.tabs.splice(index, 1);

		if(this.state.activeTab >= this.tabs.length) {
			this.setState({ activeTab: this.tabs.length - 1 });
		}

		this.forceUpdate();
	}

	handleTabAdd() {
      
		this.tabs.push({
			title: 'New Tab',
			content: <TabContent/>
        });
        console.log()

		this.setState({
			activeTab: this.tabs.length - 1
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0
		};

        this.categories = [{
            value : 'blah',
            key : 1,
            label : '1'
        
        },{
            value : 'blah2',
            key : 2,
            label : '2'
        
        },
        {
            value : 'blah3',
            key : 3,
            label : '3'
        
        }];
		this.tabs = [
			{
				title: 'Tab1',
				content: 'foo'
			},
			{
				title: 'Tab2',
				content: 'bar'
			},
			{

				title: 'Tab3',
				content: 'baz'
			}
		];
	}

	render() {
		return (
			<Tabs
				active={ this.state.activeTab }
				onTabSwitch={ this.handleTabSwitch.bind(this) }
				onTabPositionChange={ this.handleTabPositionChange.bind(this) }
				onTabClose={ this.handleTabClose.bind(this) }
				onTabAdd={ this.handleTabAdd.bind(this) }
				draggable={ true }
				showAdd={ true }
			>
				{
					this.tabs.map((value, index) => {
						return (
							<Tab 
								key={ index } 
								title={ value.title }
								showClose={ true }
							>
								{ value.content }
							</Tab>
						);
					})
				}
			</Tabs>
		);
	}
}



