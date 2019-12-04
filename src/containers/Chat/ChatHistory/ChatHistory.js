import React, { Component } from 'react';

import { connect } from 'react-redux';
import MessageType from '../SendMessage/MessageType';

class ChatHistory extends Component {

    render() {        
        const style = {
            backgroundColor: '#eaeaea',
            padding: 15,
            height: '420px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column'
        };
        

        const msgs = this.props.messages.map((message, i) =>
            this.renderMessages(message, i)
        );

        window.setInterval(function() {
            var elem = document.getElementById('chat_history');
            elem.scrollTop = elem.scrollHeight;
          }, 500);
  
                
        return (
            <div id="chat_history" style={style} autofocus>
                {msgs}
            </div>
        )
    }

    renderMessages(message, i) {
        const style = {
            display: 'block',
            margin: '5px 0'
        };

        const isMe = this.props.thisUser.name === message.user.name;
        const isWelcome = message.type === MessageType.USER_JOINED_ACK;
        const invalidInput = message.searchResults.length === 0;

        const floatDirection = isMe ? 'right' : 'left'
        const nameColor = isMe ? 'green' : 'red';
        const margin = isMe ? ' 0 0 0 40px' : '0 40px 0 0 ';

        const textStyle = {
            float: floatDirection,
            backgroundColor: '#fff',
            padding: '6px 10px',
            borderRadius: '15px',
            margin: margin,
            textAlign: 'left'
        }

        const nameStyle = {
            color: nameColor,
            float: floatDirection
        }

        const {searchResults} = message;

        const resultCard = 
        <span>
            {isWelcome || invalidInput ? <span>{message.data}</span>
            : <span>
                {searchResults.map((searchResult,index) => (
                    <span key={index}>
                        <span>Search Type: {searchResult.searchType}</span>
                        <br></br>
                        <span>Time Consuming:  {searchResult.timeConsuming}</span>
                        <br></br>
                        <span>Result:{searchResult.result}</span>
                        <br></br>
                    </span>
                ))}
            </span>
            }
        </span>

        
        return (
            <div key={i} style={style}>
                <span style={textStyle}>
                    <span style={nameStyle}>{message.user.name}</span>
                    <br />
                    {isMe ? message.data : resultCard}  
                </span>
            </div>
        );
    }
}


// Whatever is returned is going to show up as props inside UserList
function mapStateToProps(state) {
    return {
        messages: state.messages,
        thisUser: state.thisUser
    }
}

// Promote component to container
export default connect(mapStateToProps)(ChatHistory);



