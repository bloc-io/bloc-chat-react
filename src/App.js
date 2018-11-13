import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList  from './components/RoomList';
import User from './components/User';
import MessageList from '.components/MessageList';



  var config = {
    apiKey: "AIzaSyDVWXfO-dxsV_bA7OGXKZDG0gbmJW9jYHs",
    authDomain: "bloc-messages.firebaseapp.com",
    databaseURL: "https://bloc-messages.firebaseio.com",
    projectId: "bloc-messages",
    storageBucket: "bloc-messages.appspot.com",
    messagingSenderId: "400169077004"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
      this.state = {
      	activeRoom: [
      		{ name: ''}, 
      		{ key: ''}
      	],
      	isActive: true,
      	user: null
      };
      this.activeRoom = this.activeRoom.bind(this);
      this.setUser= this.setUser.bind(this);
      
      }

  setActiveRoom(room){
  	console.log(room);
    this.setState({activeRoom: room});
  }
  
  setUser(user) {
  	this.setState({ user: user });
  
  }
  
  signIn() {
		const provider = firebase.auth.GoogleAuthProvider(); 
		this.props.firebase.auth().signInWithPopup(provider).then((result)=> {
			const user = result.user; 
			this.props.setUser(user);
		});
	}
  
  signOut() {
  	this.props.firebase.auth().signOut().then(() => {
    this.props.setUser(null);
  	});
  }
 
	render() {
    	return (
			<div className="App">

			<h1 className="App-title">Bloc Chat</h1>
			<main>
				<aside className="Room-List">
					<RoomList 
					firebase={firebase}
					setActiveRoom={this.setActiveRoom.bind(this)}
					activeRoom={this.state.activeRoom}
					/>
				</aside>
				<MessageList
					firebase={firebase}
					isActive={this.state.isActive}
					activeRoom={this.state.activeRoom}
					setActiveRoom={this.setActiveRoom.bind(this)}
				/>
			</main>
			
			<User 
				setUser={this.setUser.bind(this)} 
				firebase={firebase} 
				user={this.state.user} 
			/>
			</div>
    );
  }

}
export default App;
