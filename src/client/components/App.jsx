import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Navbar from './Navbar/Navbar.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Footer from './Footer/Footer.jsx';
import Schedule from './Schedule/Schedule.jsx';

@observer
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
	      <div id="app">
					<div id="bump"></div>
					<Navbar store={this.props.store}/>
					<Dashboard />
					<Router>
						<Route exact
									 path="/"
									 render={()=>(<Schedule fake={null} store={this.props.store}/>)} />
					</Router>
					<Footer />
	      </div>
		);
	}
}
