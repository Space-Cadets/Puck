import React, { Component } from "react";
import { observer } from "mobx-react";
import Navbar from './Navbar/Navbar.jsx';
import Schedule from './Schedule/Schedule.jsx';

let id = localStorage.id;

@oberver
export default class App extends React.Component {
	render() {
		return (
	      <div id="app">
					<Navbar />
					<Schedule />
	      </div>
		);
	}
}
