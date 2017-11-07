import React, { Component } from "react";
import fuse from '../../fuse/fuse.js';
import './Navbar.css';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			results: [],
		}
		this.search = this.search.bind(this);
	}

	//render the results of a search query
	getResults(input) {
		return (
			<span>
			</span>
		)
	}

	search(e) {
		console.log(e.target.value);
		this.setState({
			input: e.target.value,
		});
		fuse.search(this.state.input).then(v => {
			this.setState({results: v});
			console.log(v);
		}, err => console.log(err));
	}

	render() {
		return (
      <nav id="navbar" className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
					<a id="navbar-logo" className="icon" href="/">
	          <img src="/static/img/mods.png" className="is-hidden-mobile"></img>
						<img id="small-logo" src="/static/img/modsm.png" className="is-hidden-desktop"></img>
					</a>
					<div id="navbar-search" className="containter">
						<input onKeyDown={this.search} placeholder="search classes / teachers"></input>
						<div id="search">
							{this.getResults(this.state.input)}
						</div>
					</div>
					<div className="navbar-burger" id="navbar-burger">
						<div className="navbar-item menuitem">
							<p className="navbar-item">menu</p>
						</div>
					</div>
        </div>
        <div className="navbar-menu" aria-label="main navigation">
					<div id="navbar-rand" className="navbar-item navbar-start">
							<i className="fa fa-map" aria-hidden="true"></i>
					</div>
					<div className="navbar-item navbar-end menuitem">
						<p>{this.props.name || '@ahermida'}</p>
					</div>
        </div>
      </nav>
		);
	}
}
