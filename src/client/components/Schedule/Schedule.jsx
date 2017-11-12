import React, { Component } from 'react';
import { autorun } from 'mobx';
import Timetable from './Timetable.jsx';
import Meta from './Meta.jsx';

//The schedule component will display a student's schedule by day (m-f),
//It will also show the times that are on a student's schedule with metadata.
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		return (
      <div id="schedule-screen" className="columns is-mobile">
        <Meta store={this.props.store} />
        <Timetable store={this.props.store} />
      </div>
    );
  }
}
