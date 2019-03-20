import React from 'react';
import Message from './Message';
import Formulaire from './Formulaire';
import base from '../base';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends React.Component {

	state = {
  	messages: {}
  }

componentWillMount() {
	this.ref = base.syncState('/',{
		context:this,
		state: 'messages'
	});
}

componentDidUpdate() {
	//scroll en bas
	this.messages.scrollTop = this.messages.scrollHeight;
}

  addMessage = (message) => {
  	//  MAJ state
  	const messages = {...this.state.messages};
  	//  On ajoute le message avec une clé timestamp
  	const timestamp = Date.now();
  	messages[`message-${timestamp}`] = message;
	 //Suppression si plus de 10 messages
	 Object.keys(messages).slice(0, -10).map(key => messages[key] = null); 
	
	  //mise a jour du State
  	this.setState({ messages });
  }

isUser = (pseudo) => {
	return pseudo === this.props.params.pseudo
}


	render() {
		const messages = Object
			.keys(this.state.messages)
			.map(key => <Message key={key} details={this.state.messages[key]} 
			isUser={this.isUser}/>)
		return (
			<div className="box">
				<div className="containerMessage">
					<div className="messages" 
					ref={input => this.messages = input}
					>
					<ReactCSSTransitionGroup
					component="div"
					className="message"
					transitionName="message"
					transitionEnterTimeout={200}
					transitionLeaveTimeout={200}
					>
						{messages}
					</ReactCSSTransitionGroup>
					</div>
					<Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length={140} />
				</div>
			</div>
		)
	}
}

export default App;