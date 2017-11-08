import React, { Component } from 'react';
import { autorun } from 'mobx';
import Timetable from './Timetable.jsx';
import Meta from './Meta.jsx';

//The schedule component will display a student's schedule by day (m-f),
//It will also show the times that are on a student's schedule with metadata.
export default class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.colors = ['#7FDBFF', '#e6e74c',  '#01FF70', '#FF7373', '#00d1b2', '#00d1b2'];

    //map colors
    autorun(() => this.props.store.userClasses.forEach((c, i) => {
      c.color = this.colors[i];
      return c;
    }));

    this.classes = this.props.store.userClasses;
  }

	render() {
		return (
      <div id="schedule-screen" className="columns is-mobile">
        <Meta store={this.props.store} />
        <Timetable fake={this.props.fake} store={this.props.store} />
      </div>
    );
  }
}
