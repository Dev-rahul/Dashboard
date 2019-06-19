import React, {  useEffect,useState, useRef } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from '../../../store/reducers';
function Timer (props) {
    let timeInseconds = props.timeInSecond;
    const [timeToShow, setTimeT0Show] = useState('00:00:00');
    useEffect(() => {
        let interval = setInterval( _ =>{
            let sec_num = parseInt( timeInseconds);
            ++timeInseconds; // don't forget the second param
            let hours   = Math.floor(sec_num / 3600);
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            let seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            setTimeT0Show(hours+':'+minutes+':'+seconds);
         
        }, 1000 );
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    },[props.timeInSecond]);
    
   

        return (
            <span >{timeToShow}</span>
        )
}
export default withReducer('Timer', reducer)(Timer);