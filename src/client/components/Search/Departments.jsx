import React, { Component } from "react";
import fuse from '../../fuse/fuse.js';
import { action } from "mobx";
import { observer } from "mobx-react";
import { getNormalTime } from '../../stores/store.js';
import './Navbar.css';

export default class Departments extends React.Component {
  constructor(props) {
    super(props);
  }

  getDepartments() {
    return this.props.store.index.map(c => {

    });
  }


  render() {
    return (
      <div className="search-departments">
        {this.getDepartments()}
      </div>
    )
  }
}
