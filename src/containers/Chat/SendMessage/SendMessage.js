import React, { useState } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Singleton from '../../../socket';
import MessageType from './MessageType';

import { connect } from 'react-redux';

const styles = {
    position: 'absolute',
    bottom: 0,
    width: '100%'
};
const fieldStyle = {
    width: '70%'
};
const btnStyles = {
    marginLeft: 25
};

const SendMessage = ({messages,thisUser}) => {


    const [inputValue,setInputValue] = useState('');

        const sendMessage = () => {
            const socket = Singleton.getInstance();
            let messageDto = JSON.stringify({ user: thisUser, data: inputValue, type: MessageType.TEXT_MESSAGE });
            socket.send(messageDto);
            setInputValue('');
        }

        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
        

        return (
        <div>{thisUser&&<div style={styles}>
                
        <TextField
            hintText="Write message here.."
            fullWidth={true}
            style={fieldStyle}
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            onKeyPress={(e)=>handleKeyPress(e)}
            autoFocus
        />
        <RaisedButton style={btnStyles} onClick={()=>sendMessage()} > Send </RaisedButton>
    </div>}
    </div>
            
        );
}


// Whatever is returned is going to show up as props inside UserList
const  mapStateToProps = state => ( {
    
        messages: state.messages,
        thisUser: state.thisUser
})

// Promote component to container
export default connect(mapStateToProps)(SendMessage);



