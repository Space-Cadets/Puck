import React, { Component } from "react";
import './Navbar.css';

export default class Navbar extends React.Component {
	render() {
		return (
      <nav id="navbar" className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src="/static/img/mods.png" className="is-hidden-mobile"></img>
					<img src="/static/img/modsm.png" className="is-hidden-desktop"></img>
        </div>
				<div className="navbar-item">
					<input id="search" placeholder="search for classes"></input>
				</div>
        <div className="navbar-menu">
					<div className="navbar-item navbar-start menuitem">
						<p>Hello</p>
					</div>
					<div className="navbar-item navbar-send menuitem">
						<p>Instructors</p>
					</div>
        </div>
      </nav>
		);
	}
}
