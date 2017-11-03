import React, { Component } from "react";
import { observer } from "mobx-react";
import Navbar from './Navbar/Navbar.jsx'

let id = localStorage.id;

@oberver
export default class App extends React.Component {
	render() {
		return (
	      <div>
					<Navbar/>
	        <h1 className="title">Hello world!</h1>
	        <p className="subtitle">
	          My first website with <strong>Bulma</strong>!
	        </p>
	      </div>
		);
	}
	componentDidMount() {
	}
}
