import React, { Component } from "react";
import './Day.css'

//The day component manages classes passed in [one class day]
export default class Day extends React.Component {
  constructor(props) {
    super(props);

    //get height of entire schedule -- used to calculate position %
    this.height = this.props.end - this.props.start;

    this.state = {
        classes: []
    };

    //set day based on earliest time to latest time, times will be percentages of that.

  }


  //gets dom el's for schedule any given day
  getClasses(classes = []) {
      return classes.map(c => {
        let styles = this.getPercentage(c, this.props.start, this.height);
        styles.backgroundColor = c.color;
        return (
          <div className="day-class" key={c.crn} style={styles}>
            <div className="class-section">{c.department}:{c.class}-{c.section}</div>
            <div className="class-instructor">Instructor: {c.instructors.join(" ")}</div>
          </div>
        );
      });
  }

  //gets a class's percentage from the top and height percentage
  getPercentage(c, start, height) {
    return {
      height: `${((c.end - c.start) * 100 / height)}%`,
      top: `${((c.start - start) * 100 / height)}%`,
    }
  }

	render() {
    return (
      <div className="day" style={{height: "65vh"}}>
        {this.getClasses(this.props.classes)}
      </div>
    );
	}
}
