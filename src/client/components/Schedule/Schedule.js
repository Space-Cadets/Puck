import React, { Component } from "react";
import './Schedule.css'

export default class Schedule extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {

    };
  }*/
	render() {
		return (
      <nav id="navbar" className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src="/static/img/mods.png"></img>
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