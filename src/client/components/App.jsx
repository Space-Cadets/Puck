import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Navbar from './Navbar/Navbar.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Footer from './Footer/Footer.jsx';
import Schedule from './Schedule/Schedule.jsx';
import Index from './Search/Index.jsx';

@observer
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
	      <div id="app">
					<div id="bump"></div>
					<Navbar store={this.props.store}/>
					<Dashboard />

					<Route exact
								 path="/"
								 render={()=>(<Schedule store={this.props.store}/>)} />
				  <Route path="/index/:crn?"
		  		 			 render={(props)=>(<Index { ...props } store={this.props.store}/>)} />

					<Footer />
	      </div>
			</Router>
		);
	}
}
