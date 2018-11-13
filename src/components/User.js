import React, { Component } from 'react';


class User extends Component {

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
			this.props.setUser(user);
		});
	}
	
	
	

   render() {
   	return (
        <div>
  		<input type="button" onClick={ this.signIn } value="Sign-In"/>
    	<input type="button" onClick={ this.signOut } value="Sign-Out"/>
		<h1> {this.props.user } </h1>
      	</div>
     );
   }
}


export default User;
