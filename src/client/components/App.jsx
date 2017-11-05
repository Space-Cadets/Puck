import React, { Component } from "react";
import { observer } from "mobx-react";
import Navbar from './Navbar/Navbar.jsx';
import Schedule from './Schedule/Schedule.jsx';

@oberver
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
	      <div id="app">
					<Navbar />
					<Schedule classes={this.props.classes} />
	      </div>
		);
	}
}
