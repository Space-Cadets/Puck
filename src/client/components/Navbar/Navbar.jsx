import React, { Component } from "react";
import './Navbar.css';

export default class Navbar extends React.Component {
	render() {
		return (
      <nav id="navbar" className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
					<a id="navbar-logo" className="icon" href="/">
	          <img src="/static/img/mods.png" className="is-hidden-mobile"></img>
						<img id="small-logo" src="/static/img/modsm.png" className="is-hidden-desktop"></img>
					</a>
					<div id="navbar-search" className="containter">
						<input placeholder="search classes / teachers"></input>
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
