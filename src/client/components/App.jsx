import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import Navbar from './Navbar/Navbar.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Schedule from './Schedule/Schedule.jsx';

@oberver
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
	      <div id="app">
					<div id="bump"></div>
					<Navbar />
					<Dashboard />
					<Router>
						<Route exact path="/"
									 render={()=>(<Schedule classes={this.props.classes}/>)}
									 />
					</Router>
	      </div>
		);
	}
}
