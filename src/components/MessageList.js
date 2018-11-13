import React, { Component } from 'react';


class MessageList extends Component {
	constructor(props) {
		super(props);
		this.state= {
			messages: [
				{username: " "},
				{content: " "}, 
				{sentAt: " "}, 
				{roomId: " "}
			], 
			
		};

		this.messagesRef = this.props.firebase.database().ref('messages');
		}

		componentDidMount() {
			this.messagesRef.on('child_added', snapshot => {
				const message = snapshot.val();
		 		message.key = snapshot.key;
       	this.setState({ messages: this.state.messages.concat( message ) })
       });
		}



		handleChange(e){
			e.preventDefault();
			this.setState({ newRoomName: e.target.value })
		}



   render() {
   	return (
        <div className="messages">
        	<ul>
        		{this.state.messages.filter(messages => message.roomID === this.props.activeRoom.key)
        		.map((message, index) =>
        		<div key={index}>
        		<strong>{message.username}</strong>
        		{message.content}
        		{message.sentAt}
        		</div>
        		)}
        		
        	</ul>

      	</div>
     );
   }
}


export default RoomList;
