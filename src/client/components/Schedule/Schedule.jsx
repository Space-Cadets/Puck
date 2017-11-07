import React, { Component } from 'react';
import Timetable from './Timetable.jsx';
import Meta from './Meta.jsx';

//The schedule component will display a student's schedule by day (m-f),
//It will also show the times that are on a student's schedule with metadata.
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.colors = ["#7FDBFF", "#e6e74c",  "#01FF70", "#FF7373", "#00d1b2", "#00d1b2"];

    //map colors
    this.classes = this.props.classes.map((c, i) => {
      c.color = this.colors[i];
      return c;
    });
  }

	render() {
		return (
      <div id="schedule-screen" className="columns is-mobile">
        <Meta classes={this.classes} />
        <Timetable classes={this.classes} />
      </div>
    );
  }
}
