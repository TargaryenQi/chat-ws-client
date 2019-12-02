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

        return (
            <div style={style}>
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
        const isWelcome = message.type === MessageType.WELCOME;
        const notSimpleBot = message.user.name !== 'Simple Bot';

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

        const bruteForceResult = searchResults ? searchResults[0] : null;

        const luceneResult = searchResults ? searchResults[1] : null;

        const handleToggle = e => {
            const resultSpan = e.target.nextSibling;
            if (resultSpan.style.display === "none") {
                resultSpan.style.display = "block";
                e.target.innerHTML = "Click to hide"
              } else {
                resultSpan.style.display = "none";
                e.target.innerHTML ="Click to show"
            }
        }

        const resultCard = 
        
        <span>
            {isWelcome || notSimpleBot ? <span>{message.data}</span>
            : 
            <span>
            <span>
                Search Type: {bruteForceResult && bruteForceResult.searchType}
            </span>
            <br />
            <span>
                Time Consuming: { bruteForceResult && bruteForceResult.timeConsuming} MS
            </span>
            <br />
            <span>
                Result Number: { bruteForceResult && bruteForceResult.resultNumber}
            </span>
            <br />
            <span>
                Results:
                {(bruteForceResult && bruteForceResult.resultNumber) && <button onClick={e => handleToggle(e)}>Click To hide</button>}
                <span>
                    { bruteForceResult && (bruteForceResult.results? bruteForceResult.results : "No search results")}
                </span> 
            </span>

            <br />
             {/* Lucene search result. */}
            <span>
                Search Type: {luceneResult && luceneResult.searchType}
            </span>
            <br />
            <span>
                Time Consuming: { luceneResult && luceneResult.timeConsuming} MS
            </span>
            <br />
            <span>
                Result Number: { luceneResult && luceneResult.resultNumber}
            </span>
            <br />
            <span>
                Results:
                {(luceneResult && luceneResult.resultNumber) && <button onClick={e => handleToggle(e)} >Click To hide</button>}
                <span style={{display:"block"}}>
                    { luceneResult && (luceneResult.results? luceneResult.results : "No search results")}
                </span> 
            </span>
        </span>}
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



