import React, {Component} from 'react';
import Example from './Example'
class DefaultExample extends Component {
    connection = null;
    constructor(props) {
        super(props);
        this.state = {
            agentList: [],
            queueList: [],
            connected: 'false',
        }
    }
    componentDidMount() {

        this.connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
        const sendData = JSON.stringify({
                    request: "fetch_agent_events"
                });
            
                const queue_sendData = JSON.stringify({
                    request: "fetch_queue_events"
                });
                
        this.connection.onopen = () => {
                 //  console.log("123456677")
                 this.setState({connected: true});
                this.connection.send('panel_type:dashboard');
                this.connection.send(queue_sendData);
                this.connection.send(sendData);
                setInterval( _ =>{
                    if(this.connection !== null && this.state.connected) {
                      this.connection.send('ping');
                    }
                 
      }, 5000 )
               }
               this.connection.onmessage = evt => { 
                        // add the new message to state
                        if(evt.data !== 'pong') {
                            const responaeData = JSON.parse(evt.data);
                            if(responaeData.action === 'create_agent') {
                              //  console.log("agentResponse", responaeData.response);
                                this.setState({agentList: responaeData.response});
                            }
                            if(responaeData.action === 'update_agent') {
                           //     console.log("updateResponse", responaeData.response);

                                let tempAgentList = [...this.state.agentList];
                                 //console.log('tempQueList',tempQueList)
                                
                                
                                    responaeData.response.map(currAgent => {
                                       let index = 0;
                                       tempAgentList.map(agent => {
                                           if(agent.extension === currAgent.extension) {
                                             //  queue.current_calls = currQueue.current_calls;
                                             tempAgentList.splice(index, 1, currAgent);
                                           }
                                           index = index+ 1;
                                        })
                                    })
                                this.setState({agentList: tempAgentList});
                            }
                            if(responaeData.action === 'create_queue') {
                              //  console.log("QueueResponse", responaeData.response);
                                this.setState({queueList: responaeData.response});
                            }
                            if(responaeData.action === 'update_queue') {
                              //  console.log("UpdateQueueResponse", responaeData.response);
                                 let tempQueList = [...this.state.queueList];
                               //  console.log('tempQueList',tempQueList)
                                
                                
                                    responaeData.response.map(currQueue => {
                                       let index = 0;
                                        tempQueList.map(queue => {
                                           if(queue.extension === currQueue.extension) {
                                             //  queue.current_calls = currQueue.current_calls;
                                             tempQueList.splice(index, 1, currQueue);
                                           }
                                           index = index+ 1;
                                        })
                                    })
                                 
                                
                                this.setState({queueList: tempQueList });
                              //  console.log('filteredItems',this.state.queueList);
                            }
                        }
                        
                      };

                   


                    this.connection.onclose = () => {
                            this.connection = null;
                            this.setState({connected: false});
                        //    let connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
                    }

    }
    render() {
        return <Example agentList={this.state.agentList} queueList={this.state.queueList}/>
    }
}
export default DefaultExample;