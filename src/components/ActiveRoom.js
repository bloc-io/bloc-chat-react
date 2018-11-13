import React, { Component } from 'react';


class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state= {
			rooms: []
		};

		this.roomsRef = this.props.firebase.database().ref('rooms');
		}

		componentDidMount() {
			this.roomsRef.on('child_added', snapshot => {
       			const room = snapshot.val();
       			room.key = snapshot.key;
       			this.setState({ rooms: this.state.rooms.concat( room ) })
		});
		}

		createRoom(newRoomName) {
			if (!this.state.newRoomName){ return }
			this.roomsRef.push({
				name: this.state.newRoomName
			});
			this.setState({ newRoomName:" " });
		}

		handleChange(e){
			e.preventDefault();
			this.setState({ newRoomName: e.target.value })
		}


   render() {
   	return (
        <div>
        	<ul>
        		{this.state.rooms.map(( room, index ) =>{
        			return (
        				<li key={ index }> { room.name } </li>
        			)
        		})}
        	</ul>
					<form onSubmit={ (e) => this.createRoom(e)}>
						<legend>Create a New Room</legend>
						<input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e)}/>
						<input type="submit" value="Submit" />
					</form>
      	</div>
     );
   }
}


export default RoomList;
